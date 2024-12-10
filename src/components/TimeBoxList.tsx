import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Task {
  id: string;
  task_name: string;
  task_date: string;
  start_time: string;
  end_time: string;
}

export const TimeBoxList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("task_date", format(new Date(), "yyyy-MM-dd"))
      .order("start_time", { ascending: true });

    if (error) {
      console.error("Error fetching tasks:", error);
      return;
    }

    setTasks(data || []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Task deleted successfully",
      });

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg">
        <p className="text-gray-500">No tasks scheduled for today.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded-lg border border-[#6EC4A8] space-y-2"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{task.task_name}</h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#9C8ADE] hover:text-[#9C8ADE]/90"
                onClick={() => {
                  // TODO: Implement edit functionality
                  toast({
                    title: "Coming Soon",
                    description: "Edit functionality will be available soon",
                  });
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
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
          <div className="text-sm text-gray-500">
            <p>{format(new Date(task.task_date), "MMM d, yyyy")}</p>
            <p>
              {task.start_time} - {task.end_time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};