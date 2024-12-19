import { Task, TaskItem } from "./TaskItem";

interface TaskGroupProps {
  title: string;
  tasks: Task[];
  onTaskStatusChange: (id: string, status: 'completed' | 'missed') => Promise<void>;
  onTaskDelete: (id: string) => Promise<void>;
}

export const TaskGroup = ({ tasks, onTaskStatusChange, onTaskDelete }: TaskGroupProps) => {
  return (
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
  );
};