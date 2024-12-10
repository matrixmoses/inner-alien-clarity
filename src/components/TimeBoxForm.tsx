import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Clock } from "lucide-react";
import { TaskList } from "./TaskList";

interface TimeBoxTask {
  id: string;
  start_time: string;
  end_time: string;
  activity: string;
  is_completed: boolean | null;
  category?: string;
  description?: string;
  created_at: string;
  user_id: string;
}

export const TimeBoxForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<TimeBoxTask[]>([]);
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [task, setTask] = useState<Omit<TimeBoxTask, 'id' | 'is_completed' | 'created_at' | 'user_id'>>({
    start_time: "",
    end_time: "",
    activity: "",
    category: 'timebox',
    description: ""
  });

  const loadTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('date', selectedDate)
        .order('start_time', { ascending: true });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error loading tasks:', error);
      toast({
        title: "Error",
        description: "Could not load tasks",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadTasks();
  }, [selectedDate]);

  const validateForm = () => {
    if (!task.activity || !task.start_time || !task.end_time) {
      toast({
        title: "Validation Error",
        description: "Please fill out all fields before adding a task.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('tasks')
        .insert([
          {
            user_id: user.id,
            start_time: task.start_time,
            end_time: task.end_time,
            activity: task.activity,
            date: selectedDate,
            category: 'timebox'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your time box has been saved.",
        className: "bg-secondary text-white",
      });

      setTask({
        start_time: "",
        end_time: "",
        activity: "",
        category: 'timebox',
        description: ""
      });

      loadTasks();
    } catch (error) {
      console.error('Error saving time box:', error);
      toast({
        title: "Error",
        description: "Could not save your time box.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            placeholder="Task name"
            value={task.activity}
            onChange={(e) => setTask({ ...task, activity: e.target.value })}
            className="w-full bg-[#6EC4A8]/20 border-none h-12 text-lg"
            required
          />
          
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-[#6EC4A8]/20 border-none h-12"
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Input
                type="time"
                value={task.start_time}
                onChange={(e) => setTask({ ...task, start_time: e.target.value })}
                className="w-full bg-[#6EC4A8]/20 border-none h-12"
                required
              />
              <Clock className="absolute right-3 top-3 text-gray-400" size={20} />
            </div>
            <div className="relative">
              <Input
                type="time"
                value={task.end_time}
                onChange={(e) => setTask({ ...task, end_time: e.target.value })}
                className="w-full bg-[#6EC4A8]/20 border-none h-12"
                required
              />
              <Clock className="absolute right-3 top-3 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#9C8ADE] hover:bg-[#9C8ADE]/80 text-white h-12 text-lg"
          disabled={isLoading}
        >
          Add Task
        </Button>
      </form>

      <TaskList tasks={tasks} onTaskUpdate={loadTasks} />
    </div>
  );
};