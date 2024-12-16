import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProcrastinationForm } from "./ProcrastinationForm";
import { ProcrastinationAnalysisDisplay } from "./ProcrastinationAnalysisDisplay";
import { useProcrastinationAnalysis } from "@/hooks/useProcrastinationAnalysis";
import { useTaskActions } from "@/hooks/useTaskActions";

interface ProcrastinationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
}

export const ProcrastinationDialog = ({ isOpen, onClose, task }: ProcrastinationDialogProps) => {
  const [reason, setReason] = useState<string>("");
  const [customReason, setCustomReason] = useState("");
  const [reflection, setReflection] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { isAnalyzing, aiFeedback, analyzeTask } = useProcrastinationAnalysis();
  const { isUpdating, markTaskAsDone, saveTaskForLater } = useTaskActions();

  const handleSubmit = async () => {
    if (!reason) {
      setError("Please select a reason for missing the task");
      return;
    }

    setError(null);
    const result = await analyzeTask(reason, customReason, {
      task_name: task.task_name,
      task_description: task.task_description
    });

    if (result) {
      console.log('Analysis completed successfully');
    }
  };

  const handleMarkAsDone = async () => {
    const success = await markTaskAsDone(task.id);
    if (success) onClose();
  };

  const handleSaveForLater = async () => {
    const success = await saveTaskForLater(task.id);
    if (success) onClose();
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

          <ProcrastinationAnalysisDisplay
            isAnalyzing={isAnalyzing}
            analysis={aiFeedback}
            error={error}
          />

          {aiFeedback && (
            <div className="flex gap-2 pt-2">
              <Button 
                onClick={handleMarkAsDone} 
                disabled={isUpdating}
                className="flex-1"
              >
                Mark as Done
              </Button>
              <Button 
                onClick={handleSaveForLater} 
                variant="outline"
                disabled={isUpdating}
                className="flex-1"
              >
                Save for Later
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isAnalyzing}>
            Analyze
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};