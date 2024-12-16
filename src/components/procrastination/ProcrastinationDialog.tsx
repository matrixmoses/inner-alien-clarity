import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface ProcrastinationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
}

export const ProcrastinationDialog = ({ isOpen, onClose, task }: ProcrastinationDialogProps) => {
  const [reason, setReason] = useState<string>("");
  const [customReason, setCustomReason] = useState("");
  const [reflection, setReflection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<any>(null);
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
      console.log('Starting analysis for task:', task.task_name);

      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error("No authenticated user found");
      }

      // Get AI analysis
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
        throw new Error(`Analysis failed: ${analysisError.message}`);
      }

      console.log('Analysis response:', analysisData);
      setAiFeedback(analysisData);

      // Store procrastination entry
      const { error: insertError } = await supabase
        .from('procrastination_entries')
        .insert({
          task_id: task.id,
          user_id: session.user.id,
          reason: reason as any,
          custom_reason: customReason,
          reflection,
          ai_feedback: JSON.stringify(analysisData),
        });

      if (insertError) {
        throw insertError;
      }

      // Update task status
      const { error: updateError } = await supabase
        .from('tasks')
        .update({ completed: false })
        .eq('id', task.id);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Analysis Complete",
        description: "We've analyzed your procrastination pattern and provided suggestions.",
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to analyze procrastination. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatAIFeedback = () => {
    if (!aiFeedback) return "";
    
    return `Analysis:\n${aiFeedback.analysis}\n\nSteps to Improve:\n${aiFeedback.steps.map((step: string, index: number) => `${index + 1}. ${step}`).join('\n')}\n\nMotivation:\n${aiFeedback.motivation}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Why did you miss this task?</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <RadioGroup value={reason} onValueChange={setReason}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="too_difficult" id="too_difficult" />
              <Label htmlFor="too_difficult">Too difficult</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lack_of_motivation" id="lack_of_motivation" />
              <Label htmlFor="lack_of_motivation">Lack of motivation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="forgot" id="forgot" />
              <Label htmlFor="forgot">Forgot</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Other reason</Label>
            </div>
          </RadioGroup>

          {reason === "custom" && (
            <Textarea
              placeholder="Please describe your reason..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
            />
          )}

          <Textarea
            placeholder="Reflect on why this happened..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          />

          {aiFeedback && (
            <Textarea
              value={formatAIFeedback()}
              readOnly
              className="h-[150px] resize-none overflow-y-auto border border-input bg-muted px-3 py-2 text-sm font-mono whitespace-pre-wrap"
            />
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