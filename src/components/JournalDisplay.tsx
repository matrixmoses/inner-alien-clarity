import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Sun, Moon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface JournalEntry {
  type: "morning" | "evening";
  content: string;
}

export const JournalDisplay = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const fetchTodayEntries = async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('journal_entries')
        .select('type, content')
        .eq('date', today);

      if (error) {
        console.error('Error fetching journal entries:', error);
        return;
      }

      if (data) {
        // Filter and type assert the data to ensure it matches our interface
        const validEntries = data.filter(
          (entry): entry is JournalEntry => 
            entry.type === 'morning' || entry.type === 'evening'
        );
        setEntries(validEntries);
      }
    };

    fetchTodayEntries();
  }, []);

  const getMorningEntry = () => entries.find(entry => entry.type === 'morning')?.content || '';
  const getEveningEntry = () => entries.find(entry => entry.type === 'evening')?.content || '';

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 bg-secondary shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Sun className="h-6 w-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Morning Journal</h2>
        </div>
        <p className="text-lg mb-4 italic text-white/90">What good shall I do this day?</p>
        <div className="bg-white/90 p-4 rounded-lg min-h-[150px] text-foreground">
          {getMorningEntry() || "No morning entry for today"}
        </div>
      </Card>

      <Card className="p-6 bg-secondary shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Moon className="h-6 w-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Evening Journal</h2>
        </div>
        <p className="text-lg mb-4 italic text-white/90">What good have I done today?</p>
        <div className="bg-white/90 p-4 rounded-lg min-h-[150px] text-foreground">
          {getEveningEntry() || "No evening entry for today"}
        </div>
      </Card>
    </div>
  );
};