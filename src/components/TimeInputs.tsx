import { Input } from "./ui/input";

interface TimeInputsProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
}

export const TimeInputs = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: TimeInputsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="startTime" className="block text-sm font-medium mb-1">
          Start Time
        </label>
        <Input
          id="startTime"
          type="time"
          value={startTime}
          onChange={(e) => onStartTimeChange(e.target.value)}
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
          onChange={(e) => onEndTimeChange(e.target.value)}
          className="bg-white border-[#6EC4A8]"
        />
      </div>
    </div>
  );
};