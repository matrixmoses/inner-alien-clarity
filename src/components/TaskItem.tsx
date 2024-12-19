import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X, ChevronDown, ChevronUp, Hash, Clock, Calendar } from "lucide-react";
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
  DialogTrigger,
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
  const [isExpanded, setIsExpanded] = useState(false);
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

  return (
    <>
      <Card className="p-4 bg-white shadow-custom transform hover:scale-[1.01] transition-all duration-200">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{task.task_name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(task.task_date), "MMM d, yyyy")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={showDetails} onOpenChange={setShowDetails}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </DialogTrigger>
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
              <TaskHeader
                taskName={task.task_name}
                completed={task.completed}
                onComplete={handleComplete}
                onMissed={() => setShowProcrastinationDialog(true)}
                onDelete={handleDelete}
                isDeleting={isDeleting}
              />
            </div>
          </div>

          <TaskTime startTime={task.start_time} endTime={task.end_time} />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-gray-500 w-full justify-between mt-2"
          >
            <span>Subtasks</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>

          {isExpanded && (
            <ScrollArea className="max-h-[300px] mt-2">
              <SubtaskList
                taskId={task.id}
                onStatusChange={onStatusChange}
              />
            </ScrollArea>
          )}
        </div>
      </Card>

      <ProcrastinationDialog
        isOpen={showProcrastinationDialog}
        onClose={() => setShowProcrastinationDialog(false)}
        task={task}
      />
    </>
  );
};