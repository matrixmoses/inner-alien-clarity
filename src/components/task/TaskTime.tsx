import { Clock } from "lucide-react";
import { format } from "date-fns";

interface TaskTimeProps {
  startTime: string;
  endTime: string;
}

export const TaskTime = ({ startTime, endTime }: TaskTimeProps) => {
  const formatTimeString = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, 'h:mm a');
  };

  return (
    <div className="flex items-center gap-2 text-gray-500 mt-2">
      <Clock className="h-4 w-4" />
      <span className="text-sm">
        {formatTimeString(startTime)} - {formatTimeString(endTime)}
      </span>
    </div>
  );
};