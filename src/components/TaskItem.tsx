import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProcrastinationDialog } from "./procrastination/ProcrastinationDialog";
import { supabase } from "@/integrations/supabase/client";
import { TaskHeader } from "./task/TaskHeader";
import { TaskDetailsForm } from "./task/TaskDetailsForm";

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
  const [editedTask, setEditedTask] = useState(task);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setEditedTask(task);
  }, [task, showDetails]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      
      const { error: subtasksError } = await supabase
        .from('subtasks')
        .delete()
        .eq('task_id', task.id);

      if (subtasksError) throw subtasksError;

      await onDelete(task.id);
      setShowDetails(false);
      
      toast({
        title: "Success",
        description: "Task and all subtasks deleted successfully",
      });
    } catch (error: any) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          task_name: editedTask.task_name,
          notes: editedTask.notes,
          hashtags: editedTask.hashtags
        })
        .eq('id', task.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Task updated successfully",
      });
      setShowDetails(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <TaskHeader
        taskName={task.task_name}
        taskDate={task.task_date}
        startTime={task.start_time}
        endTime={task.end_time}
        onDetails={() => setShowDetails(true)}
        onComplete={() => onStatusChange(task.id, 'completed')}
        onMissed={() => setShowProcrastinationDialog(true)}
      />

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          <TaskDetailsForm
            editedTask={editedTask}
            onTaskChange={setEditedTask}
            onSave={handleSave}
            onDelete={handleDelete}
            isDeleting={isDeleting}
            onStatusChange={onStatusChange}
          />
        </DialogContent>
      </Dialog>

      <ProcrastinationDialog
        isOpen={showProcrastinationDialog}
        onClose={() => setShowProcrastinationDialog(false)}
        task={task}
      />
    </div>
  );
};