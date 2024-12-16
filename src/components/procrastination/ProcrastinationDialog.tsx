import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";

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

      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error("No authenticated user found");
      }

      // Call the analyze-text Edge Function using supabase.functions.invoke
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

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {aiFeedback && (
            <Card className="p-4 space-y-4 bg-muted/50">
              <div>
                <h3 className="text-lg font-semibold mb-2">Procrastination Analysis</h3>
                <p className="text-sm text-muted-foreground">{aiFeedback.analysis}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Recommended Steps</h4>
                <ol className="list-decimal pl-4 space-y-1">
                  {aiFeedback.steps.map((step, index) => (
                    <li key={index} className="text-sm">{step}</li>
                  ))}
                </ol>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Motivation</h4>
                <p className="text-sm italic text-muted-foreground">{aiFeedback.motivation}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={handleMarkAsDone} 
                  disabled={isUpdating}
                  className="flex-1"
                >
                  {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Mark as Done
                </Button>
                <Button 
                  onClick={handleSaveForLater} 
                  variant="outline"
                  disabled={isUpdating}
                  className="flex-1"
                >
                  {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save for Later
                </Button>
              </div>
            </Card>
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