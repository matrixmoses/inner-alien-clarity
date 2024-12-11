import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sun, Moon, Search, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface JournalEntry {
  id: string;
  type: "morning" | "evening";
  content: string;
  date: string;
  created_at: string;
  user_id: string;
}

type DatabaseEntry = {
  id: string;
  type: string;
  content: string;
  date: string;
  created_at: string;
  user_id: string;
}

export const JournalHistory = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("journal_entries")
          .select("*")
          .eq("user_id", user.id)
          .order("date", { ascending: false });

        if (error) throw error;

        // Validate and transform the entries
        const validEntries = (data || []).filter((entry: DatabaseEntry): entry is JournalEntry => {
          return (entry.type === "morning" || entry.type === "evening") &&
                 typeof entry.content === "string" &&
                 typeof entry.date === "string" &&
                 typeof entry.id === "string" &&
                 typeof entry.created_at === "string" &&
                 typeof entry.user_id === "string";
        });

        setEntries(validEntries);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

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

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="h-6 w-6 text-[#9C8ADE]" />
        <h2 className="text-2xl font-semibold">Journal Entries</h2>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search entries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {Object.entries(groupedEntries).map(([date, dayEntries]) => (
            <div key={date} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                {format(new Date(date), "MMMM d, yyyy")}
              </h3>
              {dayEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-[#6EC4A8]/10 p-4 rounded-lg space-y-2"
                >
                  <div className="flex items-center gap-2">
                    {entry.type === "morning" ? (
                      <Sun className="h-4 w-4 text-[#9C8ADE]" />
                    ) : (
                      <Moon className="h-4 w-4 text-[#9C8ADE]" />
                    )}
                    <span className="font-medium capitalize">
                      {entry.type} Reflection
                    </span>
                  </div>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};