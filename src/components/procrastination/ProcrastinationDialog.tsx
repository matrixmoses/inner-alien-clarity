import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Task } from "../TaskItem";
import { ProcrastinationForm } from "./ProcrastinationForm";
import { useTaskActions } from "@/hooks/useTaskActions";
import { useState } from "react";

interface ProcrastinationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export const ProcrastinationDialog = ({
  isOpen,
  onClose,
  task,
}: ProcrastinationDialogProps) => {
  const { markTaskAsDone, saveTaskForLater, isUpdating } = useTaskActions();
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleSaveForLater = async () => {
    const success = await saveTaskForLater(task.id);
    if (success) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Task Procrastination</h2>
          <ProcrastinationForm
            taskId={task.id}
            onSuccess={() => {
              setShowAnalysis(true);
            }}
            onSaveForLater={handleSaveForLater}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};