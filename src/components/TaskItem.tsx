import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TaskHeader } from "./task/TaskHeader";
import { TaskTime } from "./task/TaskTime";
import { SubtaskList } from "./task/SubtaskList";
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

interface Subtask {
  id: string;
  title: string;
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
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubtasks();
  }, [task.id]);

  const fetchSubtasks = async () => {
    try {
      const { data, error } = await supabase
        .from('subtasks')
        .select('*')
        .eq('task_id', task.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setSubtasks(data || []);
    } catch (error: any) {
      console.error('Error fetching subtasks:', error);
      toast({
        title: "Error",
        description: "Failed to load subtasks",
        variant: "destructive",
      });
    }
  };

  const handleAddSubtask = async (title: string) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('subtasks')
        .insert({
          task_id: task.id,
          user_id: user.id,
          title,
        })
        .select()
        .single();

      if (error) throw error;

      setSubtasks([...subtasks, data]);
      toast({
        title: "Success",
        description: "Subtask added successfully",
      });
    } catch (error: any) {
      console.error('Error adding subtask:', error);
      toast({
        title: "Error",
        description: "Failed to add subtask",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubtaskToggle = async (subtaskId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('subtasks')
        .update({ completed })
        .eq('id', subtaskId);

      if (error) throw error;

      setSubtasks(subtasks.map(st => 
        st.id === subtaskId ? { ...st, completed } : st
      ));
    } catch (error: any) {
      console.error('Error updating subtask:', error);
      toast({
        title: "Error",
        description: "Failed to update subtask",
        variant: "destructive",
      });
    }
  };

  const handleMissedTask = () => {
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
      <div className="bg-white p-6 rounded-lg border border-[#6EC4A8] space-y-4">
        <TaskHeader
          taskName={task.task_name}
          completed={task.completed}
          onComplete={handleComplete}
          onMissed={handleMissedTask}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />

        <TaskTime startTime={task.start_time} endTime={task.end_time} />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm text-gray-500 w-full justify-between"
        >
          <span>Subtasks ({subtasks.length})</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>

        {isExpanded && (
          <ScrollArea className="max-h-[300px]">
            <SubtaskList
              subtasks={subtasks}
              onSubtaskToggle={handleSubtaskToggle}
              onAddSubtask={handleAddSubtask}
              isLoading={isLoading}
            />
          </ScrollArea>
        )}
      </div>

      <ProcrastinationDialog
        isOpen={showProcrastinationDialog}
        onClose={() => setShowProcrastinationDialog(false)}
        task={task}
      />
    </>
  );
};