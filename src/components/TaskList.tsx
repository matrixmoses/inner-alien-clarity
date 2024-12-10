import React from "react";
import { Check, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Task {
  id: string;
  activity: string;
  start_time: string;
  end_time: string;
  is_completed: boolean | null;
}

export const TaskList = ({ tasks, onTaskUpdate }: { 
  tasks: Task[], 
  onTaskUpdate: () => void 
}) => {
  const { toast } = useToast();

  const handleTaskStatus = async (taskId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ is_completed: completed })
        .eq('id', taskId);

      if (error) throw error;

      onTaskUpdate();
      
      toast({
        title: completed ? "Task completed!" : "Task marked as missed",
        description: completed ? "Great job!" : "Keep trying!",
        variant: completed ? "default" : "destructive",
      });
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Could not update task status",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      onTaskUpdate();
      
      toast({
        title: "Task deleted",
        description: "Task has been removed from your schedule",
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error",
        description: "Could not delete task",
        variant: "destructive",
      });
    }
  };

  if (!tasks.length) {
    return (
      <div className="text-center p-8 bg-[#6EC4A8]/10 rounded-lg mt-6">
        <p className="text-gray-600">No tasks scheduled yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className="bg-[#6EC4A8]/10 p-4 rounded-lg flex items-center justify-between"
        >
          <div>
            <h3 className="font-medium text-foreground">{task.activity}</h3>
            <p className="text-sm text-gray-600">
              {task.start_time} - {task.end_time}
            </p>
          </div>
          <div className="flex gap-2">
            {task.is_completed === null && (
              <>
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                  onClick={() => handleTaskStatus(task.id, true)}
                >
                  <Check className="h-4 w-4 mr-1" /> Complete
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleTaskStatus(task.id, false)}
                >
                  <X className="h-4 w-4 mr-1" /> Missed
                </Button>
              </>
            )}
            {task.is_completed !== null && (
              <div className={`text-sm font-medium ${task.is_completed ? 'text-green-500' : 'text-red-500'}`}>
                {task.is_completed ? 'Completed' : 'Missed'}
              </div>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-500 hover:text-red-500"
              onClick={() => handleDeleteTask(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};