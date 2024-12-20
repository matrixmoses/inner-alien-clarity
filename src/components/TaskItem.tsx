import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
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
  const [showProcrastinationDialog, setShowProcrastinationDialog] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
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
    <Card className="bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200 w-full max-w-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-base truncate">{task.task_name}</h3>
            <span className="text-sm text-gray-500">
              {format(new Date(task.task_date), "MMM d, yyyy")}
            </span>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
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
        </div>

        <div className="text-sm text-gray-600">
          {task.start_time} - {task.end_time}
        </div>
      </div>

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

      <ProcrastinationDialog
        isOpen={showProcrastinationDialog}
        onClose={() => setShowProcrastinationDialog(false)}
        task={task}
      />
    </Card>
  );
};