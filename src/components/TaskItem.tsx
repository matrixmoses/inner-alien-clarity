import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SubtaskList } from "./task/SubtaskList";
import { TaskHeader } from "./task/TaskHeader";
import { TaskTime } from "./task/TaskTime";
import { ProcrastinationDialog } from "./procrastination/ProcrastinationDialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [isExpanded, setIsExpanded] = useState(false);
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
      <Card className="p-6 bg-white shadow-custom transform hover:scale-[1.01] transition-all duration-200">
        <TaskHeader
          taskName={task.task_name}
          completed={task.completed}
          onComplete={handleComplete}
          onMissed={() => setShowProcrastinationDialog(true)}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />

        <TaskTime startTime={task.start_time} endTime={task.end_time} />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm text-gray-500 w-full justify-between mt-4"
        >
          <span>Subtasks</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>

        {isExpanded && (
          <ScrollArea className="max-h-[300px] mt-4">
            <SubtaskList
              taskId={task.id}
              onStatusChange={onStatusChange}
            />
          </ScrollArea>
        )}
      </Card>

      <ProcrastinationDialog
        isOpen={showProcrastinationDialog}
        onClose={() => setShowProcrastinationDialog(false)}
        task={task}
      />
    </>
  );
};