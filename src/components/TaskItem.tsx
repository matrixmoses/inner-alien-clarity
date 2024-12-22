import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubtaskList } from "./task/SubtaskList";
import { ProcrastinationDialog } from "./procrastination/ProcrastinationDialog";
import { supabase } from "@/integrations/supabase/client";

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

  const handleHashtagsChange = (value: string) => {
    const hashtags = value
      .split(' ')
      .filter(tag => tag.startsWith('#'))
      .map(tag => tag.trim());
    setEditedTask({ ...editedTask, hashtags });
  };

  return (
    <div className="grid grid-cols-[1fr,auto] gap-4 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-1">
        <h3 className="font-medium text-lg text-foreground">{task.task_name}</h3>
        <div className="text-sm text-muted-foreground">
          <p>{format(new Date(task.task_date), "MMM d, yyyy")}</p>
          <p>{task.start_time} - {task.end_time}</p>
        </div>
      </div>

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
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
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
                className="min-h-[100px]"
                placeholder="Add notes..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Hashtags</label>
              <Input
                placeholder="Add hashtags (e.g., #Work #Personal)"
                value={editedTask.hashtags?.join(' ') || ''}
                onChange={(e) => handleHashtagsChange(e.target.value)}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {editedTask.hashtags?.map((tag) => (
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
            <div className="flex flex-col gap-4 pt-4 border-t">
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Delete Task'}
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
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