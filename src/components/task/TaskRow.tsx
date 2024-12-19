import { Task } from "../TaskItem";
import { format } from "date-fns";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { SubtaskList } from "./SubtaskList";

interface TaskRowProps {
  task: Task;
  onStatusChange: (id: string, status: 'completed' | 'missed') => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TaskRow = ({ task, onStatusChange, onDelete }: TaskRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group">
      <div className="flex items-center justify-between bg-white rounded-lg p-4 hover:bg-[#F4F5F9] transition-colors">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 rounded-full border border-[#9C8ADE] p-0 hover:bg-[#9C8ADE]/10"
            onClick={() => onStatusChange(task.id, 'completed')}
          >
            {task.completed && <Check className="h-4 w-4 text-[#9C8ADE]" />}
          </Button>
          <div>
            <h3 className="font-medium text-[#333333]">{task.task_name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#666666]">
                {format(new Date(task.task_date), "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#666666] hover:text-[#9C8ADE]"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-[#666666] hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-2 pl-12 pr-4">
          <SubtaskList
            taskId={task.id}
            onStatusChange={onStatusChange}
          />
        </div>
      )}
    </div>
  );
};