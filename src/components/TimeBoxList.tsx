import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format, isToday, isTomorrow, isAfter } from "date-fns";
import { TaskGroup } from "./TaskGroup";
import { Task } from "./TaskItem";
import { Card } from "./ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const TimeBoxList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sectionsCollapsed, setSectionsCollapsed] = useState({
    today: false,
    upcoming: false
  });
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
      upcoming: tasks.filter(task => {
        const taskDate = new Date(task.task_date);
        return isAfter(taskDate, new Date()) && !isToday(taskDate);
      })
    };
  };

  const toggleSection = (section: 'today' | 'upcoming') => {
    setSectionsCollapsed(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const groupedTasks = groupTasksByDate(tasks);

  if (tasks.length === 0) {
    return (
      <Card className="p-6 text-center bg-white/50 backdrop-blur-sm">
        <p className="text-gray-500">No tasks scheduled.</p>
      </Card>
    );
  }

  const renderSection = (title: string, tasks: Task[], section: 'today' | 'upcoming') => {
    if (tasks.length === 0) return null;
    
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleSection(section)}
            className="text-gray-500 hover:text-gray-700"
          >
            {sectionsCollapsed[section] ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronUp className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className={cn(
          "space-y-4 transition-all duration-300",
          sectionsCollapsed[section] ? "hidden" : "block"
        )}>
          <TaskGroup
            title=""
            tasks={tasks}
            onTaskStatusChange={handleTaskStatus}
            onTaskDelete={handleDelete}
          />
        </div>
      </div>
    );
  };

  return (
    <Card className="p-6 space-y-8 bg-white/50 backdrop-blur-sm">
      {renderSection("Today's Tasks", groupedTasks.today, 'today')}
      {renderSection("Upcoming Tasks", groupedTasks.upcoming, 'upcoming')}
    </Card>
  );
};