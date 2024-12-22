import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { isBeforeToday } from "@/utils/dateValidation";

interface DateSelectorProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export const DateSelector = ({ date, onDateChange }: DateSelectorProps) => {
  const handleSetToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    onDateChange(today);
  };

  const handleSetTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    onDateChange(tomorrow);
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      // Create a new date object at midnight in local timezone
      const selectedDate = new Date(newDate);
      selectedDate.setHours(0, 0, 0, 0);
      console.log('Selected date before change:', selectedDate.toLocaleString());
      onDateChange(selectedDate);
    }
  };

  return (
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.toLocaleDateString()}
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
  );
};