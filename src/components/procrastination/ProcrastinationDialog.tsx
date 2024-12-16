import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ProcrastinationForm } from "./ProcrastinationForm";
import { ProcrastinationAnalysis } from "./ProcrastinationAnalysis";
import { ActionButtons } from "./ActionButtons";

interface ProcrastinationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
}

interface AIFeedback {
  analysis: string;
  steps: string[];
  motivation: string;
}

export const ProcrastinationDialog = ({ isOpen, onClose, task }: ProcrastinationDialogProps) => {
  const [reason, setReason] = useState<string>("");
  const [customReason, setCustomReason] = useState("");
  const [reflection, setReflection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiFeedback, setAiFeedback] = useState<AIFeedback | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!reason) {
      toast({
        title: "Error",
        description: "Please select a reason for missing the task",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log('Starting analysis for task:', task.task_name);

      const { data: analysisData, error: analysisError } = await supabase.functions.invoke('analyze-text', {
        body: {
          reason,
          customReason,
          taskDetails: {
            task_name: task.task_name,
            task_description: task.task_description
          }
        }
      });

      if (analysisError) {
        console.error('Analysis error:', analysisError);
        throw new Error(`Analysis failed: ${analysisError.message}`);
      }

      console.log('Analysis response:', analysisData);
      setAiFeedback(analysisData);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user found");

      const { error: insertError } = await supabase
        .from('procrastination_entries')
        .insert({
          task_id: task.id,
          user_id: user.id,
          reason: reason as any,
          custom_reason: customReason,
          reflection,
          ai_feedback: JSON.stringify(analysisData),
        });

      if (insertError) throw insertError;

      toast({
        title: "Analysis Complete",
        description: "We've analyzed your procrastination pattern and provided suggestions.",
      });
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || "Something went wrong. Please try again.");
      toast({
        title: "Error",
        description: error.message || "Failed to analyze procrastination. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsDone = async () => {
    try {
      setIsUpdating(true);
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ completed: true })
        .eq('id', task.id);

      if (updateError) throw updateError;

      const { error: procrastinationError } = await supabase
        .from('procrastination_entries')
        .update({ resolved: true })
        .eq('task_id', task.id);

      if (procrastinationError) throw procrastinationError;

      toast({
        title: "Success",
        description: "Task marked as completed",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveForLater = async () => {
    try {
      setIsUpdating(true);
      const { error: updateError } = await supabase
        .from('procrastination_entries')
        .update({ rescheduled_to: new Date().toISOString() })
        .eq('task_id', task.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Task saved for later review",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to save task for later",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Why did you miss this task?</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <ProcrastinationForm
            reason={reason}
            customReason={customReason}
            reflection={reflection}
            onReasonChange={setReason}
            onCustomReasonChange={setCustomReason}
            onReflectionChange={setReflection}
          />

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {aiFeedback && (
            <>
              <ProcrastinationAnalysis {...aiFeedback} />
              <ActionButtons
                isLoading={isUpdating}
                onMarkAsDone={handleMarkAsDone}
                onSaveForLater={handleSaveForLater}
              />
            </>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};