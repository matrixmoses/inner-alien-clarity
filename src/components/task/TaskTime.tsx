import { Clock } from "lucide-react";

interface TaskTimeProps {
  startTime: string;
  endTime: string;
}

export const TaskTime = ({ startTime, endTime }: TaskTimeProps) => {
  return (
    <div className="flex items-center gap-2 text-gray-500 mt-2">
      <Clock className="h-4 w-4" />
      <span className="text-sm">
        {startTime} - {endTime}
      </span>
    </div>
  );
};