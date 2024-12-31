import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { isBeforeToday } from "@/utils/dateValidation";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

interface DateSelectorProps {
  date: Date;
  onDateChange: (date: Date) => void;
  error?: string;
}

export const DateSelector = ({ date, onDateChange, error }: DateSelectorProps) => {
  const handleSetToday = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = toZonedTime(new Date(), timeZone);
    today.setHours(0, 0, 0, 0);
    console.log('Setting today:', today.toLocaleString());
    onDateChange(today);
  };

  const handleSetTomorrow = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tomorrow = toZonedTime(new Date(), timeZone);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    console.log('Setting tomorrow:', tomorrow.toLocaleString());
    onDateChange(tomorrow);
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate && !isBeforeToday(newDate)) {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const selectedDate = toZonedTime(newDate, timeZone);
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
            className={`w-full justify-start text-left font-normal ${error ? 'border-red-500' : ''}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(date, 'PPP')}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={isBeforeToday}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};