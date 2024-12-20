import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubtaskList } from "./task/SubtaskList";
import { ProcrastinationDialog } from "./procrastination/ProcrastinationDialog";

export interface Task {
  id: string;
  task_name: string;
  task_date: string;
  start_time: string;
  end_time: string;
  completed: boolean;
  notes?: string;
  hashtags?: string[];
}

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, status: 'completed' | 'missed') => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TaskItem = ({ task, onStatusChange, onDelete }: TaskItemProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showProcrastinationDialog, setShowProcrastinationDialog] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
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
    }
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 mb-2 shadow-sm">
      {/* Task Info */}
      <div className="flex-1 mr-4">
        <h3 className="font-medium text-lg mb-1">{task.task_name}</h3>
        <div className="text-sm text-gray-600">
          <div>{format(new Date(task.task_date), "MMM d, yyyy")}</div>
          <div>{task.start_time} - {task.end_time}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDetails(true)}
        >
          Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onStatusChange(task.id, 'completed')}
          className="text-green-600 hover:text-green-700"
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowProcrastinationDialog(true)}
          className="text-red-600 hover:text-red-700"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <Input value={task.task_name} readOnly />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Notes</label>
              <Textarea value={task.notes || ""} readOnly />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Hashtags</label>
              <div className="flex flex-wrap gap-2">
                {task.hashtags?.map((tag) => (
                  <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <SubtaskList taskId={task.id} onStatusChange={onStatusChange} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Procrastination Dialog */}
      <ProcrastinationDialog
        isOpen={showProcrastinationDialog}
        onClose={() => setShowProcrastinationDialog(false)}
        task={task}
      />
    </div>
  );
};