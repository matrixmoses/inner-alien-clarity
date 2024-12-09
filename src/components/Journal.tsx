import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sun, Moon, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface JournalEntry {
  id: string;
  date: string;
  type: "morning" | "evening";
  content: string;
}

export const Journal = () => {
  const [morningEntry, setMorningEntry] = useState("");
  const [eveningEntry, setEveningEntry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadTodayEntries = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const { data: entries, error } = await supabase
          .from('journal_entries')
          .select('*')
          .eq('date', today);

        if (error) throw error;

        if (entries) {
          const morning = entries.find(entry => entry.type === 'morning');
          const evening = entries.find(entry => entry.type === 'evening');
          if (morning) setMorningEntry(morning.content);
          if (evening) setEveningEntry(evening.content);
        }
      } catch (error) {
        console.error('Error loading entries:', error);
        toast({
          title: "Error loading entries",
          description: "Could not load your journal entries.",
          variant: "destructive"
        });
      }
    };

    loadTodayEntries();
  }, [toast]);

  const handleSave = async (type: "morning" | "evening", content: string) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const date = new Date().toISOString().split('T')[0];
      
      // Check if entry exists for today
      const { data: existingEntries } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('date', date)
        .eq('type', type)
        .single();

      let result;
      if (existingEntries) {
        // Update existing entry
        result = await supabase
          .from('journal_entries')
          .update({ content })
          .eq('id', existingEntries.id);
      } else {
        // Insert new entry
        result = await supabase
          .from('journal_entries')
          .insert([
            { user_id: user.id, type, content, date }
          ]);
      }

      if (result.error) throw result.error;

      toast({ 
        title: "Entry saved!", 
        description: `Your ${type} entry has been saved.`,
        className: "bg-primary text-primary-foreground"
      });
    } catch (error) {
      console.error('Error saving entry:', error);
      toast({
        title: "Error saving entry",
        description: "Could not save your journal entry.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="p-8 bg-secondary shadow-custom transform hover:scale-[1.01] transition-transform duration-200">
        <div className="flex items-center gap-3 mb-4">
          <Sun className="h-6 w-6 text-white" />
          <h2 className="text-2xl font-semibold text-white">Morning Journal</h2>
        </div>
        <p className="text-lg mb-4 italic text-white/90">What good shall I do this day?</p>
        <Textarea
          value={morningEntry}
          onChange={(e) => setMorningEntry(e.target.value)}
          placeholder="Write your morning reflections here..."
          className="min-h-[150px] mb-4 bg-white/90 text-foreground text-lg"
        />
        <Button 
          onClick={() => handleSave("morning", morningEntry)} 
          className="w-full bg-primary hover:bg-primary-hover text-white transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          Save Morning Entry
        </Button>
      </Card>

      <Card className="p-8 bg-secondary shadow-custom transform hover:scale-[1.01] transition-transform duration-200">
        <div className="flex items-center gap-3 mb-4">
          <Moon className="h-6 w-6 text-white" />
          <h2 className="text-2xl font-semibold text-white">Evening Journal</h2>
        </div>
        <p className="text-lg mb-4 italic text-white/90">What good have I done today?</p>
        <Textarea
          value={eveningEntry}
          onChange={(e) => setEveningEntry(e.target.value)}
          placeholder="Write your evening reflections here..."
          className="min-h-[150px] mb-4 bg-white/90 text-foreground text-lg"
        />
        <Button 
          onClick={() => handleSave("evening", eveningEntry)} 
          className="w-full bg-primary hover:bg-primary-hover text-white transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          Save Evening Entry
        </Button>
      </Card>
    </div>
  );
};