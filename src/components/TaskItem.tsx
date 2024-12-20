import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SubtaskList } from "./task/SubtaskList";
import { TaskHeader } from "./task/TaskHeader";
import { TaskTime } from "./task/TaskTime";
import { ProcrastinationDialog } from "./procrastination/ProcrastinationDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const { toast } = useToast();

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

  const handleMissed = () => {
    setShowProcrastinationDialog(true);
  };

  return (
    <>
      <Card className="p-6 bg-white shadow-custom transform hover:scale-[1.01] transition-all duration-200 w-full max-w-3xl mx-auto mb-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 mr-4">
              <h3 className="font-semibold text-lg line-clamp-1">{task.task_name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span>{format(new Date(task.task_date), "MMM d, yyyy")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(true)}
                className="hover:bg-gray-100"
              >
                Details
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleComplete}
                className="hover:bg-green-100"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMissed}
                className="hover:bg-red-100"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TaskTime startTime={task.start_time} endTime={task.end_time} />
        </div>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <Input
                value={editedTask.task_name}
                onChange={(e) => setEditedTask({ ...editedTask, task_name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Notes</label>
              <Textarea
                value={editedTask.notes || ""}
                onChange={(e) => setEditedTask({ ...editedTask, notes: e.target.value })}
                placeholder="Add notes..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Hashtags</label>
              <Input
                placeholder="Add hashtags (e.g., #Work #Personal)"
                value={editedTask.hashtags?.join(" ") || ""}
                onChange={(e) => {
                  const hashtags = e.target.value
                    .split(" ")
                    .filter(tag => tag.startsWith("#"))
                    .map(tag => tag.trim());
                  setEditedTask({ ...editedTask, hashtags });
                }}
              />
            </div>
            <SubtaskList
              taskId={task.id}
              onStatusChange={onStatusChange}
            />
          </div>
        </DialogContent>
      </Dialog>

      <ProcrastinationDialog
        isOpen={showProcrastinationDialog}
        onClose={() => setShowProcrastinationDialog(false)}
        task={task}
      />
    </>
  );
};