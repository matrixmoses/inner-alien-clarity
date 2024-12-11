import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckSquare, Search, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Task {
  id: string;
  task_name: string;
  task_date: string;
  start_time: string;
  end_time: string;
  subject: string;
}

export const TaskHistory = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", user.id)
          .eq("completed", true)
          .order("task_date", { ascending: false });

        if (error) throw error;
        setTasks(data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.task_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedTasks = filteredTasks.reduce((groups, task) => {
    const date = task.task_date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
    return groups;
  }, {} as Record<string, Task[]>);

  const calculateTimeSpent = (start: string, end: string) => {
    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);
    const diffInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = Math.round(diffInMinutes % 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <CheckSquare className="h-6 w-6 text-[#9C8ADE]" />
        <h2 className="text-2xl font-semibold">Completed Tasks</h2>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
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
                      <p className="text-sm text-gray-500 capitalize">
                        Category: {task.subject || "Other"}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {calculateTimeSpent(task.start_time, task.end_time)}
                    </span>
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