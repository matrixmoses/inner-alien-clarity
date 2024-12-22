import { Task } from "../TaskItem";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { SubtaskList } from "./SubtaskList";

interface TaskDetailsFormProps {
  editedTask: Task;
  onTaskChange: (task: Task) => void;
  onSave: () => Promise<void>;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
  onStatusChange: (id: string, status: 'completed' | 'missed') => Promise<void>;
}

export const TaskDetailsForm = ({
  editedTask,
  onTaskChange,
  onSave,
  onDelete,
  isDeleting,
  onStatusChange
}: TaskDetailsFormProps) => {
  const handleHashtagsChange = (value: string) => {
    const hashtags = value
      .split(' ')
      .filter(tag => tag.startsWith('#'))
      .map(tag => tag.trim());
    onTaskChange({ ...editedTask, hashtags });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Title</label>
        <Input 
          value={editedTask.task_name}
          onChange={(e) => onTaskChange({ ...editedTask, task_name: e.target.value })}
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Notes</label>
        <Textarea 
          value={editedTask.notes || ""}
          onChange={(e) => onTaskChange({ ...editedTask, notes: e.target.value })}
          className="min-h-[100px]"
          placeholder="Add notes..."
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Hashtags</label>
        <Input
          placeholder="Add hashtags (e.g., #Work #Personal)"
          value={editedTask.hashtags?.join(' ') || ''}
          onChange={(e) => handleHashtagsChange(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {editedTask.hashtags?.map((tag) => (
            <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Subtasks</label>
        <SubtaskList taskId={editedTask.id} onStatusChange={onStatusChange} />
      </div>
      <div className="flex flex-col gap-4 pt-4 border-t">
        <Button
          variant="destructive"
          onClick={onDelete}
          disabled={isDeleting}
          className="w-full"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {isDeleting ? 'Deleting...' : 'Delete Task'}
        </Button>
        <Button onClick={onSave}>Save Changes</Button>
      </div>
    </div>
  );
};