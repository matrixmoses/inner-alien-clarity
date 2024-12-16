import { Button } from "@/components/ui/button";
import { Check, X, Trash2, Clock } from "lucide-react";
import { useState } from "react";
import { ProcrastinationDialog } from "./procrastination/ProcrastinationDialog";
import { useToast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  task_name: string;
  task_date: string;
  start_time: string;
  end_time: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, status: 'completed' | 'missed') => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TaskItem = ({ task, onStatusChange, onDelete }: TaskItemProps) => {
  const [showProcrastinationDialog, setShowProcrastinationDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleMissedTask = async () => {
    setShowProcrastinationDialog(true);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(task.id);
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleComplete = async () => {
    try {
      await onStatusChange(task.id, 'completed');
      toast({
        title: "Success",
        description: "Task marked as completed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg border border-[#6EC4A8] space-y-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`${
                  task.completed
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "hover:bg-green-100"
                }`}
                onClick={handleComplete}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-red-100"
                onClick={handleMissedTask}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="font-medium">{task.task_name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">
              {task.start_time} - {task.end_time}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <ProcrastinationDialog
        isOpen={showProcrastinationDialog}
        onClose={() => setShowProcrastinationDialog(false)}
        task={task}
      />
    </>
  );
};