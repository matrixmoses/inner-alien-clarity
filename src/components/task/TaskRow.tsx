import { Task } from "../TaskItem";
import { format } from "date-fns";
import { Check, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface TaskRowProps {
  task: Task;
  onStatusChange: (id: string, status: 'completed' | 'missed') => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TaskRow = ({ task, onStatusChange, onDelete }: TaskRowProps) => {
  return (
    <div className="group flex items-center justify-between bg-[#1C1C1E] rounded-lg p-4 hover:bg-[#2C2C2E] transition-colors">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 rounded-full border border-gray-600 p-0"
          onClick={() => onStatusChange(task.id, 'completed')}
        >
          {task.completed && <Check className="h-4 w-4" />}
        </Button>
        <div>
          <h3 className="text-white font-medium">{task.task_name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              {format(new Date(task.task_date), "MMM d, yyyy")}
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="h-4 w-4 text-gray-400" />
      </Button>
    </div>
  );
};