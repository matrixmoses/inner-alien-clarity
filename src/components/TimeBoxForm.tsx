import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export const TimeBoxForm = () => {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName || !date || !startTime || !endTime) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Create the task first
      const { error: taskError } = await supabase
        .from("tasks")
        .insert({
          user_id: user.id,
          task_name: taskName,
          task_date: format(date, "yyyy-MM-dd"),
          start_time: startTime,
          end_time: endTime,
          activity: taskName,
          category: "timebox",
          completed: false,
          is_completed: false,
          description: taskName,
          is_editing: false,
          subject: "other"
        });

      if (taskError) throw taskError;

      toast({
        title: "Success",
        description: "Task added successfully",
      });

      // Reset form
      setTaskName("");
      setStartTime("");
      setEndTime("");
    } catch (error: any) {
      console.error("Error adding task:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add task",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#F4F5F9] p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <div>
        <label htmlFor="taskName" className="block text-sm font-medium mb-1">
          Task Name
        </label>
        <Input
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="bg-white border-[#6EC4A8]"
          placeholder="Enter task name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="rounded-md border border-[#6EC4A8] bg-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium mb-1">
            Start Time
          </label>
          <Input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="bg-white border-[#6EC4A8]"
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium mb-1">
            End Time
          </label>
          <Input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="bg-white border-[#6EC4A8]"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#9C8ADE] hover:bg-[#9C8ADE]/90"
      >
        Add Task
      </Button>
    </form>
  );
};