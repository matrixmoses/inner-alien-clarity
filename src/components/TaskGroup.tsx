import { Calendar, Clock } from "lucide-react";
import { Task, TaskItem } from "./TaskItem";
import { Button } from "./ui/button";

interface TaskGroupProps {
  title: string;
  tasks: Task[];
  onTaskStatusChange: (id: string, status: 'completed' | 'missed') => Promise<void>;
  onTaskDelete: (id: string) => Promise<void>;
}

export const TaskGroup = ({ title, tasks, onTaskStatusChange, onTaskDelete }: TaskGroupProps) => {
  if (tasks.length === 0) return null;

  const getIcon = () => {
    if (title.toLowerCase().includes('today')) {
      return <Clock className="h-5 w-5" />;
    }
    return <Calendar className="h-5 w-5" />;
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        {getIcon()}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onStatusChange={onTaskStatusChange}
            onDelete={onTaskDelete}
          />
        ))}
      </div>
    </div>
  );
};