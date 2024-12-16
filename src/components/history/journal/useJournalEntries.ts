import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export interface JournalEntry {
  id: string;
  user_id: string;
  content: string;
  type: 'morning' | 'evening';
  date: string;
  created_at: string;
}

export const useJournalEntries = (searchQuery: string, selectedDate?: Date) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        let query = supabase
          .from("journal_entries")
          .select("*")
          .eq("user_id", user.id)
          .order("date", { ascending: false });

        if (selectedDate) {
          const dateStr = format(selectedDate, "yyyy-MM-dd");
          query = query.eq("date", dateStr);
        }

        const { data, error } = await query;

        if (error) throw error;
        
        const typedEntries = (data || []).map(entry => ({
          ...entry,
          type: entry.type as 'morning' | 'evening'
        }));
        
        setEntries(typedEntries);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
        toast({
          title: "Error",
          description: "Could not load journal entries",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, [selectedDate, toast]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("journal_entries")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setEntries(entries.filter(entry => entry.id !== id));
      toast({
        title: "Success",
        description: "Entry deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast({
        title: "Error",
        description: "Could not delete entry",
        variant: "destructive",
      });
    }
  };

  const filteredEntries = entries.filter(entry =>
    entry.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedEntries = filteredEntries.reduce((groups, entry) => {
    const date = entry.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {} as Record<string, JournalEntry[]>);

  return {
    groupedEntries,
    isLoading,
    handleDelete
  };
};