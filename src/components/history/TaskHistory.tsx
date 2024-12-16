import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CheckSquare, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface TaskHistoryProps {
  searchQuery: string;
  selectedDate?: Date;
}

export const TaskHistory = ({ searchQuery, selectedDate }: TaskHistoryProps) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        let query = supabase
          .from("tasks")
          .select("*")
          .eq("user_id", user.id)
          .eq("completed", true)
          .order("task_date", { ascending: false });

        if (selectedDate) {
          const dateStr = format(selectedDate, "yyyy-MM-dd");
          query = query.eq("task_date", dateStr);
        }

        const { data, error } = await query;

        if (error) throw error;
        setTasks(data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast({
          title: "Error",
          description: "Could not load completed tasks",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [selectedDate, toast]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setTasks(tasks.filter(task => task.id !== id));
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Could not delete task",
        variant: "destructive",
      });
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.task_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.task_description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const groupedTasks = filteredTasks.reduce((groups, task) => {
    const date = task.task_date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
    return groups;
  }, {} as Record<string, any[]>);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <CheckSquare className="h-6 w-6 text-[#9C8ADE]" />
        <h2 className="text-2xl font-semibold">Completed Tasks</h2>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {Object.entries(groupedTasks).map(([date, dayTasks]) => (
            <div key={date} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                {format(new Date(date), "MMMM d, yyyy")}
              </h3>
              {dayTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-[#6EC4A8]/10 p-4 rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{task.task_name}</h4>
                      {task.task_description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {task.task_description}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        {task.start_time} - {task.end_time}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(task.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};