import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProcrastinationDialog } from "./procrastination/ProcrastinationDialog";
import { supabase } from "@/integrations/supabase/client";
import { TaskHeader } from "./task/TaskHeader";
import { TaskDetailsForm } from "./task/TaskDetailsForm";
import { Button } from "./ui/button";
import { Trash2, X } from "lucide-react";

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
    const confirmation = window.confirm("Are you sure you want to delete this task?");
    if (!confirmation) return;

    try {
      setIsDeleting(true);
      
      // First delete all subtasks
      const { error: subtasksError } = await supabase
        .from('subtasks')
        .delete()
        .eq('task_id', task.id);

      if (subtasksError) throw subtasksError;

      // Then delete the task
      await onDelete(task.id);
      setShowDetails(false);
      
      toast({
        title: "Success",
        description: "Task deleted successfully",
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Task Details
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowDetails(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <TaskDetailsForm
            editedTask={editedTask}
            onTaskChange={setEditedTask}
            onSave={async () => {
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
            }}
            onDelete={handleDelete}
            isDeleting={isDeleting}
            onStatusChange={onStatusChange}
          />

          <div className="mt-4 pt-4 border-t">
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Task
            </Button>
          </div>
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