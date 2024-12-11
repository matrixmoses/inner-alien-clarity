import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Trash2, Clock } from "lucide-react";
import { format, isToday, isTomorrow } from "date-fns";

interface Task {
  id: string;
  task_name: string;
  task_date: string;
  start_time: string;
  end_time: string;
  completed: boolean;
}

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

      const { error } = await supabase
        .from("tasks")
        .update({ 
          completed: status === 'completed',
          is_completed: status === 'completed'
        })
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
      future: tasks.filter(task => {
        const taskDate = new Date(task.task_date);
        return !isToday(taskDate) && !isTomorrow(taskDate);
      })
    };
  };

  const TaskGroup = ({ title, tasks }: { title: string; tasks: Task[] }) => {
    if (tasks.length === 0) return null;

    return (
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-lg border border-[#6EC4A8] space-y-2"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${
                        task.completed
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "hover:bg-green-100"
                      }`}
                      onClick={() => handleTaskStatus(task.id, 'completed')}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-red-100"
                      onClick={() => handleTaskStatus(task.id, 'missed')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-medium">{task.task_name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {task.start_time} - {task.end_time}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
      <TaskGroup title="Today's Tasks" tasks={groupedTasks.today} />
      <TaskGroup title="Tomorrow's Tasks" tasks={groupedTasks.tomorrow} />
      <TaskGroup title="Upcoming Tasks" tasks={groupedTasks.future} />
    </div>
  );
};