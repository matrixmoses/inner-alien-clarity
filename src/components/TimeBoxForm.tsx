import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { isValid, startOfDay } from "date-fns";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TimeInputs } from "./TimeInputs";
import { validateTimeRange, formatDateForStorage, isBeforeToday } from "@/utils/dateValidation";

interface TimeBoxFormProps {
  onSuccess?: () => void;
}

export const TimeBoxForm = ({ onSuccess }: TimeBoxFormProps) => {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState<Date>(startOfDay(new Date()));
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!taskName.trim()) {
      setError("Task name is required");
      return;
    }

    if (!isValid(date)) {
      setError("Please select a valid date");
      return;
    }

    if (!startTime || !endTime) {
      setError("Start and end times are required");
      return;
    }

    if (!validateTimeRange(startTime, endTime)) {
      setError("End time must be after start time");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const formattedDate = formatDateForStorage(date);
      console.log('Selected date object:', date);
      console.log('Formatted date for storage:', formattedDate);

      const { error: taskError } = await supabase
        .from("tasks")
        .insert({
          user_id: user.id,
          task_name: taskName,
          task_date: formattedDate,
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

      onSuccess?.();
      setTaskName("");
      setStartTime("");
      setEndTime("");
      setDate(startOfDay(new Date()));
    } catch (error: any) {
      console.error("Error creating task:", error);
      setError(error.message || "Failed to add task");
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
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

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
          onSelect={(newDate) => {
            if (newDate) {
              // Ensure we're working with dates at midnight in the local timezone
              const selectedDate = startOfDay(newDate);
              console.log('Raw selected date:', newDate);
              console.log('Processed selected date:', selectedDate);
              setDate(selectedDate);
            }
          }}
          className="rounded-md border border-[#6EC4A8] bg-white"
          disabled={isBeforeToday}
        />
      </div>

      <TimeInputs
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
      />

      <Button 
        type="submit" 
        className="w-full bg-[#9C8ADE] hover:bg-[#9C8ADE]/90"
      >
        Add Task
      </Button>
    </form>
  );
};