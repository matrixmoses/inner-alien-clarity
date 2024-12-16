import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format, isToday, isTomorrow } from "date-fns";
import { TaskGroup } from "./TaskGroup";
import { Task } from "./TaskItem";

export const TimeBoxList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  const fetchTasks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .gte('task_date', format(new Date(), "yyyy-MM-dd"))
        .eq("user_id", user.id)
        .eq("completed", false) // Only fetch incomplete tasks
        .order('task_date', { ascending: true })
        .order('start_time', { ascending: true });

      if (error) throw error;
      setTasks(data || []);
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch tasks",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // First, delete related pomodoro sessions
      const { error: pomodoroError } = await supabase
        .from("pomodoro_sessions")
        .delete()
        .eq("task_id", id);

      if (pomodoroError) throw pomodoroError;

      // Then delete the task
      const { error: taskError } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (taskError) throw taskError;

      toast({
        title: "Success",
        description: "Task deleted successfully",
      });

      fetchTasks();
    } catch (error: any) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  const handleTaskStatus = async (id: string, status: 'completed' | 'missed') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const updates = {
        completed: status === 'completed',
        is_completed: status === 'completed'
      };

      const { error } = await supabase
        .from("tasks")
        .update(updates)
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Task marked as ${status}`,
      });

      // Refresh the task list to remove the completed/missed task
      fetchTasks();
    } catch (error: any) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const groupTasksByDate = (tasks: Task[]) => {
    return {
      today: tasks.filter(task => isToday(new Date(task.task_date))),
      tomorrow: tasks.filter(task => isTomorrow(new Date(task.task_date))),
      future: tasks.filter(task => {
        const taskDate = new Date(task.task_date);
        return !isToday(taskDate) && !isTomorrow(taskDate);
      })
    };
  };

  const groupedTasks = groupTasksByDate(tasks);

  if (tasks.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg">
        <p className="text-gray-500">No tasks scheduled.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8">
      <TaskGroup 
        title="Today's Tasks" 
        tasks={groupedTasks.today}
        onTaskStatusChange={handleTaskStatus}
        onTaskDelete={handleDelete}
      />
      <TaskGroup 
        title="Tomorrow's Tasks" 
        tasks={groupedTasks.tomorrow}
        onTaskStatusChange={handleTaskStatus}
        onTaskDelete={handleDelete}
      />
      <TaskGroup 
        title="Upcoming Tasks" 
        tasks={groupedTasks.future}
        onTaskStatusChange={handleTaskStatus}
        onTaskDelete={handleDelete}
      />
    </div>
  );
};