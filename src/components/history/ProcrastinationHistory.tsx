import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hourglass, Trash2, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  const formatAIFeedback = (feedback: string) => {
    try {
      const parsedFeedback = JSON.parse(feedback);
      return {
        analysis: parsedFeedback.analysis,
        steps: parsedFeedback.steps,
        motivation: parsedFeedback.motivation
      };
    } catch (e) {
      return {
        analysis: feedback,
        steps: [],
        motivation: ''
      };
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Hourglass className="h-6 w-6 text-[#9C8ADE]" />
        <h2 className="text-2xl font-semibold">Procrastination Log</h2>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {filteredEntries.map((entry) => (
          <AccordionItem
            key={entry.id}
            value={entry.id}
            className="bg-[#6EC4A8]/10 p-4 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col items-start">
                  <h3 className="font-medium">{entry.tasks?.task_name}</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(entry.tasks?.task_date), "PPP")}
                  </p>
                </div>
              </AccordionTrigger>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(entry.id);
                }}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <AccordionContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Scheduled Time: {entry.tasks?.start_time} - {entry.tasks?.end_time}
                  </p>
                  <p className="text-sm mt-2">Reason: {entry.reason}</p>
                  {entry.reflection && (
                    <p className="text-sm mt-2">Reflection: {entry.reflection}</p>
                  )}
                </div>

                {entry.ai_feedback && (
                  <div className="mt-4 bg-white/50 rounded p-4 space-y-3">
                    <h4 className="font-medium">AI Analysis</h4>
                    {(() => {
                      const feedback = formatAIFeedback(entry.ai_feedback);
                      return (
                        <div className="space-y-3">
                          <p className="text-sm">{feedback.analysis}</p>
                          {feedback.steps.length > 0 && (
                            <div>
                              <h5 className="font-medium mb-2">Steps to Improve:</h5>
                              <ul className="list-decimal list-inside space-y-1">
                                {feedback.steps.map((step: string, index: number) => (
                                  <li key={index} className="text-sm">{step}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {feedback.motivation && (
                            <div>
                              <h5 className="font-medium mb-2">Motivation:</h5>
                              <p className="text-sm">{feedback.motivation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filteredEntries.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No procrastination entries yet.
        </p>
      )}
    </Card>
  );
};