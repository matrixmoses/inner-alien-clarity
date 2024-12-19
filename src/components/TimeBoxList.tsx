import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { isToday, isTomorrow, isAfter } from "date-fns";
import { Task } from "./TaskItem";
import { TaskSection } from "./task/TaskSection";

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
        .gte('task_date', new Date().toISOString().split('T')[0])
        .eq("user_id", user.id)
        .eq("completed", false)
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

      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

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
      upcoming: tasks.filter(task => {
        const taskDate = new Date(task.task_date);
        return isAfter(taskDate, new Date()) && !isToday(taskDate) && !isTomorrow(taskDate);
      })
    };
  };

  const groupedTasks = groupTasksByDate(tasks);

  return (
    <div className="space-y-8 bg-[#F4F5F9] p-6">
      <TaskSection
        title="Today"
        tasks={groupedTasks.today}
        onTaskStatusChange={handleTaskStatus}
        onTaskDelete={handleDelete}
      />
      <TaskSection
        title="Tomorrow"
        tasks={groupedTasks.tomorrow}
        onTaskStatusChange={handleTaskStatus}
        onTaskDelete={handleDelete}
      />
      <TaskSection
        title="Upcoming"
        tasks={groupedTasks.upcoming}
        onTaskStatusChange={handleTaskStatus}
        onTaskDelete={handleDelete}
      />
    </div>
  );
};