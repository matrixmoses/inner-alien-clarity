import { Task } from "../TaskItem";
import { TaskRow } from "./TaskRow";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  onTaskStatusChange: (id: string, status: 'completed' | 'missed') => Promise<void>;
  onTaskDelete: (id: string) => Promise<void>;
}

export const TaskSection = ({ title, tasks, onTaskStatusChange, onTaskDelete }: TaskSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (tasks.length === 0) return null;

  return (
    <div className="space-y-2">
      <Button
        variant="ghost"
        className="w-full flex justify-between items-center py-2 hover:bg-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </Button>
      
      {isExpanded && (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onStatusChange={onTaskStatusChange}
              onDelete={onTaskDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};