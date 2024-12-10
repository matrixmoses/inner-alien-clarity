import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface TimeBoxTask {
  start_time: string;
  end_time: string;
  activity: string;
  description?: string;
}

export const TimeBoxForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [task, setTask] = useState<TimeBoxTask>({
    start_time: "",
    end_time: "",
    activity: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            description: task.description,
            category: 'timebox'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your time box has been saved.",
        className: "bg-secondary text-white",
      });

      // Reset form
      setTask({
        start_time: "",
        end_time: "",
        activity: "",
        description: "",
      });
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
    <Card className="p-6 bg-white shadow-lg animate-fade-in">
      <h2 className="text-xl font-semibold mb-6">Schedule Your Time</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <Input
              id="start_time"
              type="time"
              value={task.start_time}
              onChange={(e) => setTask({ ...task, start_time: e.target.value })}
              className="w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <Input
              id="end_time"
              type="time"
              value={task.end_time}
              onChange={(e) => setTask({ ...task, end_time: e.target.value })}
              className="w-full"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="activity" className="block text-sm font-medium text-gray-700">
            Activity
          </label>
          <Input
            id="activity"
            type="text"
            value={task.activity}
            onChange={(e) => setTask({ ...task, activity: e.target.value })}
            placeholder="Enter activity name"
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Enter task description"
            className="w-full min-h-[100px]"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          Save Time Box
        </Button>
      </form>
    </Card>
  );
};