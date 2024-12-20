import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { isValid } from "date-fns";
import { AlertCircle, CalendarIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TimeInputs } from "./TimeInputs";
import { validateTimeRange, formatDateForStorage, isBeforeToday } from "@/utils/dateValidation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface TimeBoxFormProps {
  onSuccess?: () => void;
}

export const TimeBoxForm = ({ onSuccess }: TimeBoxFormProps) => {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const { toast } = useToast();

  const handleSetToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log('Setting Today:', {
      originalDate: today,
      isoString: today.toISOString(),
      localString: today.toLocaleString()
    });
    setDate(today);
    setShowCalendar(false);
  };

  const handleSetTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    console.log('Setting Tomorrow:', {
      originalDate: tomorrow,
      isoString: tomorrow.toISOString(),
      localString: tomorrow.toLocaleString()
    });
    setDate(tomorrow);
    setShowCalendar(false);
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      const selectedDate = new Date(newDate);
      selectedDate.setHours(0, 0, 0, 0);
      console.log('Date Selected:', {
        originalDate: newDate,
        normalizedDate: selectedDate,
        isoString: selectedDate.toISOString(),
        localString: selectedDate.toLocaleString()
      });
      setDate(selectedDate);
      setShowCalendar(false);
    }
  };

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
      console.log('Task Creation:', {
        selectedDate: date,
        formattedDate,
        dateComponents: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        },
        timeZoneOffset: date.getTimezoneOffset(),
        isoString: date.toISOString(),
        localString: date.toLocaleString()
      });

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
      setDate(new Date());
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

      <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">Date</label>
        <div className="flex gap-2 mb-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleSetToday}
          >
            Today
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleSetTomorrow}
          >
            Tomorrow
          </Button>
        </div>
        <Popover open={showCalendar} onOpenChange={setShowCalendar}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? date.toLocaleDateString() : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={isBeforeToday}
            />
          </PopoverContent>
        </Popover>
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