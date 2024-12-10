import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Clock, Trash, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

interface Task {
  id: string;
  task_name: string;
  task_description: string;
  start_time: string;
  end_time: string;
  is_completed: boolean;
}

export const TimeBox = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    task_name: "",
    task_description: "",
    start_time: "",
    end_time: "",
  });
  const { toast } = useToast();

  const handleAddTask = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          user_id: user.id,
          task_name: newTask.task_name,
          task_description: newTask.task_description,
          start_time: newTask.start_time,
          end_time: newTask.end_time,
          is_completed: false,
          task_date: new Date().toISOString().split('T')[0]
        }])
        .select();

      if (error) throw error;

      if (data) {
        setTasks([...tasks, data[0] as Task]);
        setNewTask({
          task_name: "",
          task_description: "",
          start_time: "",
          end_time: "",
        });
        toast({
          title: "Task added",
          description: "Your time box has been created successfully.",
        });
      }
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: "Error",
        description: "Could not add the task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ is_completed: true })
        .eq('id', taskId);

      if (error) throw error;

      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, is_completed: true } : task
      ));

      toast({
        title: "Task completed",
        description: "Great job! The task has been marked as complete.",
      });
    } catch (error) {
      console.error('Error completing task:', error);
      toast({
        title: "Error",
        description: "Could not complete the task. Please try again.",
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

      setTasks(tasks.filter(task => task.id !== taskId));
      toast({
        title: "Task deleted",
        description: "The task has been removed successfully.",
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error",
        description: "Could not delete the task. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="p-6 bg-white shadow-custom">
        <h2 className="text-2xl font-semibold mb-6">Time Box</h2>
        
        <div className="space-y-4 mb-8">
          <Input
            placeholder="Task name"
            value={newTask.task_name}
            onChange={(e) => setNewTask({ ...newTask, task_name: e.target.value })}
          />
          <Textarea
            placeholder="Task description"
            value={newTask.task_description}
            onChange={(e) => setNewTask({ ...newTask, task_description: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="time"
              value={newTask.start_time}
              onChange={(e) => setNewTask({ ...newTask, start_time: e.target.value })}
            />
            <Input
              type="time"
              value={newTask.end_time}
              onChange={(e) => setNewTask({ ...newTask, end_time: e.target.value })}
            />
          </div>
          <Button 
            onClick={handleAddTask}
            className="w-full"
            disabled={!newTask.task_name || !newTask.start_time || !newTask.end_time}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="p-4 bg-gray-50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{task.task_name}</h3>
                  <p className="text-sm text-gray-600">{task.task_description}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {task.start_time} - {task.end_time}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCompleteTask(task.id)}
                    disabled={task.is_completed}
                    className={task.is_completed ? "text-green-500" : ""}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};