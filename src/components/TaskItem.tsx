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
    <div className="grid grid-cols-[1fr,auto] gap-4 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Task Information */}
      <div className="space-y-1">
        <h3 className="font-medium text-lg text-foreground">{task.task_name}</h3>
        <div className="text-sm text-muted-foreground">
          <p>{format(new Date(task.task_date), "MMM d, yyyy")}</p>
          <p>{task.start_time} - {task.end_time}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 self-center">
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <Input value={task.task_name} readOnly />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Notes</label>
              <Textarea value={task.notes || ""} readOnly className="min-h-[100px]" />
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
            <div>
              <label className="text-sm font-medium mb-1 block">Subtasks</label>
              <SubtaskList taskId={task.id} onStatusChange={onStatusChange} />
            </div>
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