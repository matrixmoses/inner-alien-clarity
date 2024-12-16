import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface JournalHistoryProps {
  searchQuery: string;
  selectedDate?: Date;
}

export const JournalHistory = ({ searchQuery, selectedDate }: JournalHistoryProps) => {
  const [entries, setEntries] = useState<any[]>([]);
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
        setEntries(data || []);
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
  }, {} as Record<string, any[]>);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Sun className="h-6 w-6 text-[#9C8ADE]" />
        <h2 className="text-2xl font-semibold">Journal Entries</h2>
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
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {entry.type === "morning" ? (
                          <Sun className="h-4 w-4 text-[#9C8ADE]" />
                        ) : (
                          <Moon className="h-4 w-4 text-[#9C8ADE]" />
                        )}
                        <span className="font-medium capitalize">
                          {entry.type} Reflection
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap">{entry.content}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};