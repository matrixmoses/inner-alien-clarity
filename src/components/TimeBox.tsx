import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Trash2, Plus, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Task {
  id: string;
  activity: string;
  start_time: string;
  end_time: string;
  is_completed: boolean;
  is_editing: boolean;
}

export const TimeBox = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newActivity, setNewActivity] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .eq('category', 'timebox')
      .order('start_time', { ascending: true });

    if (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Error fetching tasks",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setTasks(data || []);
  };

  const handleAddTask = async () => {
    if (!newActivity || !newStartTime || !newEndTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('tasks')
      .insert([
        {
          user_id: user.id,
          activity: newActivity,
          start_time: newStartTime,
          end_time: newEndTime,
          category: 'timebox',
        }
      ]);

    if (error) {
      console.error('Error adding task:', error);
      toast({
        title: "Error adding task",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setNewActivity("");
    setNewStartTime("");
    setNewEndTime("");
    fetchTasks();
    toast({
      title: "Task added",
      description: "Your task has been added successfully",
    });
  };

  const handleEditTask = async (taskId: string, updates: Partial<Task>) => {
    const { error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId);

    if (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    fetchTasks();
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully",
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error deleting task",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    fetchTasks();
    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Time Box</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Activity"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
          />
          <Input
            type="time"
            value={newStartTime}
            onChange={(e) => setNewStartTime(e.target.value)}
          />
          <Input
            type="time"
            value={newEndTime}
            onChange={(e) => setNewEndTime(e.target.value)}
          />
          <Button onClick={handleAddTask} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-background rounded-lg border"
            >
              {task.is_editing ? (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    value={task.activity}
                    onChange={(e) => handleEditTask(task.id, { activity: e.target.value })}
                  />
                  <Input
                    type="time"
                    value={task.start_time}
                    onChange={(e) => handleEditTask(task.id, { start_time: e.target.value })}
                  />
                  <Input
                    type="time"
                    value={task.end_time}
                    onChange={(e) => handleEditTask(task.id, { end_time: e.target.value })}
                  />
                </div>
              ) : (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <span>{task.activity}</span>
                  <span>{task.start_time}</span>
                  <span>{task.end_time}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditTask(task.id, { is_editing: !task.is_editing })}
                >
                  {task.is_editing ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Edit2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};