import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ProcrastinationEntry {
  id: string;
  task_id: string;
  reason: string;
  custom_reason: string | null;
  ai_feedback: string;
  created_at: string;
  task: {
    task_name: string;
  };
}

const Procrastination = () => {
  const [entries, setEntries] = useState<ProcrastinationEntry[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchProcrastinationEntries();
  }, []);

  const fetchProcrastinationEntries = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('procrastination_entries')
        .select(`
          *,
          task:tasks(task_name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching procrastination entries:', error);
    }
  };

  const formatAIFeedback = (feedback: string) => {
    try {
      const parsedFeedback = JSON.parse(feedback);
      return `Analysis:\n${parsedFeedback.analysis}\n\nSteps to Improve:\n${parsedFeedback.steps.map((step: string, index: number) => `${index + 1}. ${step}`).join('\n')}\n\nMotivation:\n${parsedFeedback.motivation}`;
    } catch (e) {
      return feedback;
    }
  };

  const handleViewAnalysis = (feedback: string) => {
    setSelectedAnalysis(formatAIFeedback(feedback));
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Procrastination Insights</h1>
        
        <Card className="p-6">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id} className="p-4 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{entry.task?.task_name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Reason: {entry.custom_reason || entry.reason}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleViewAnalysis(entry.ai_feedback)}
                    >
                      View Analysis
                    </Button>
                  </div>
                </Card>
              ))}
              
              {entries.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No procrastination entries yet.
                </p>
              )}
            </div>
          </ScrollArea>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Analysis Details</DialogTitle>
            </DialogHeader>
            <Textarea
              value={selectedAnalysis || ""}
              readOnly
              className="h-[300px] resize-none overflow-y-auto border border-input bg-muted px-3 py-2 text-sm font-mono whitespace-pre-wrap"
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Procrastination;