import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Check, X, Trash2 } from "lucide-react";

interface TaskHeaderProps {
  taskName: string;
  taskDate: string;
  startTime: string;
  endTime: string;
  onDetails: () => void;
  onComplete: () => void;
  onMissed: () => void;
  onDelete: () => void;
}

export const TaskHeader = ({
  taskName,
  taskDate,
  startTime,
  endTime,
  onDetails,
  onComplete,
  onMissed,
  onDelete,
}: TaskHeaderProps) => {
  return (
    <div className="grid grid-cols-[1fr,auto] gap-4">
      <div className="space-y-1">
        <h3 className="font-medium text-lg text-foreground">{taskName}</h3>
        <div className="text-sm text-muted-foreground">
          <p>{format(new Date(taskDate), "MMM d, yyyy")}</p>
          <p>{startTime} - {endTime}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-center">
        <Button
          variant="outline"
          size="sm"
          onClick={onDetails}
        >
          Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onComplete}
          className="text-green-600 hover:text-green-700"
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onMissed}
          className="text-red-600 hover:text-red-700"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};