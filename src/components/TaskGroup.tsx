import { Task } from "./TaskItem";
import { TaskItem } from "./TaskItem";

interface TaskGroupProps {
  title: string;
  tasks: Task[];
  onTaskStatusChange: (id: string, status: 'completed' | 'missed') => Promise<void>;
  onTaskDelete: (id: string) => Promise<void>;
}

export const TaskGroup = ({ title, tasks, onTaskStatusChange, onTaskDelete }: TaskGroupProps) => {
  if (tasks.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
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