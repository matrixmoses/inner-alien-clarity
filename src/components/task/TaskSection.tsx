import { Task } from "../TaskItem";
import { TaskRow } from "./TaskRow";

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  onTaskStatusChange: (id: string, status: 'completed' | 'missed') => Promise<void>;
  onTaskDelete: (id: string) => Promise<void>;
}

export const TaskSection = ({ title, tasks, onTaskStatusChange, onTaskDelete }: TaskSectionProps) => {
  if (tasks.length === 0) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-foreground mb-4">{title}</h2>
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
    </div>
  );
};