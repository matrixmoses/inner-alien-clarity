import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sun, Moon } from "lucide-react";

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
        .eq('date', today)
        .eq('is_draft', true);

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
      <div className="text-center p-8 bg-[#6EC4A8]/10 rounded-lg">
        <p className="text-lg text-gray-600">
          No pending journal entries for today. Visit the{" "}
          <Link to="/journal" className="text-[#9C8ADE] hover:underline">
            Journal page
          </Link>{" "}
          to add your reflections.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <div key={entry.type} className="bg-[#6EC4A8]/10 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            {entry.type === 'morning' ? (
              <Sun className="h-5 w-5 text-[#9C8ADE]" />
            ) : (
              <Moon className="h-5 w-5 text-[#9C8ADE]" />
            )}
            <h3 className="text-xl font-semibold capitalize">
              {entry.type} Reflection
            </h3>
          </div>
          <p className="text-sm italic text-gray-600 mb-3">
            {entry.type === 'morning' 
              ? "What good shall I do today?" 
              : "What good have I done today?"}
          </p>
          <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
        </div>
      ))}
    </div>
  );
};