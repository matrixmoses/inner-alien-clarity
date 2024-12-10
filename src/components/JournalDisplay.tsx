import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        const validEntries = data.filter(
          (entry): entry is JournalEntry => 
            entry.type === 'morning' || entry.type === 'evening'
        );
        setEntries(validEntries);
      }
    };

    fetchTodayEntries();
  }, []);

  if (entries.length === 0) {
    return (
      <div className="text-xl text-gray-600 italic">
        No journal entries for today. Visit the{" "}
        <Link to="/journal" className="text-primary hover:underline">
          Journal page
        </Link>{" "}
        to add your reflections.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <div key={entry.type} className="bg-white/50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 capitalize">
            {entry.type} Reflection
          </h2>
          <p className="text-gray-700">{entry.content}</p>
        </div>
      ))}
    </div>
  );
};