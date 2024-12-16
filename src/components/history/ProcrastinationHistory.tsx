import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Hourglass, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface ProcrastinationHistoryProps {
  searchQuery: string;
  selectedDate?: Date;
}

export const ProcrastinationHistory = ({ searchQuery, selectedDate }: ProcrastinationHistoryProps) => {
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        let query = supabase
          .from("procrastination_entries")
          .select(`
            *,
            tasks (
              task_name,
              task_description,
              task_date,
              start_time,
              end_time
            )
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (selectedDate) {
          const dateStr = format(selectedDate, "yyyy-MM-dd");
          query = query.eq("tasks.task_date", dateStr);
        }

        const { data, error } = await query;

        if (error) throw error;
        setEntries(data || []);
      } catch (error) {
        console.error("Error fetching procrastination entries:", error);
        toast({
          title: "Error",
          description: "Could not load procrastination entries",
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
        .from("procrastination_entries")
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
    entry.tasks?.task_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.reflection?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Hourglass className="h-6 w-6 text-[#9C8ADE]" />
        <h2 className="text-2xl font-semibold">Procrastination Log</h2>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-[#6EC4A8]/10 p-4 rounded-lg space-y-2"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-medium">{entry.tasks?.task_name}</h3>
                  <p className="text-sm text-gray-500">
                    Original Date: {format(new Date(entry.tasks?.task_date), "PPP")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Scheduled Time: {entry.tasks?.start_time} - {entry.tasks?.end_time}
                  </p>
                  <p className="text-sm">Reason: {entry.reason}</p>
                  {entry.reflection && (
                    <p className="text-sm">Reflection: {entry.reflection}</p>
                  )}
                  {entry.ai_feedback && (
                    <div className="mt-2 p-2 bg-white/50 rounded">
                      <p className="text-sm font-medium">AI Feedback:</p>
                      <pre className="text-sm whitespace-pre-wrap">
                        {JSON.stringify(JSON.parse(entry.ai_feedback), null, 2)}
                      </pre>
                    </div>
                  )}
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
      </ScrollArea>
    </Card>
  );
};