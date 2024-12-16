import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface SubtaskListProps {
  subtasks: Subtask[];
  onSubtaskToggle: (id: string, completed: boolean) => Promise<void>;
  onAddSubtask: (title: string) => Promise<void>;
  isLoading: boolean;
}

export const SubtaskList = ({
  subtasks,
  onSubtaskToggle,
  onAddSubtask,
  isLoading,
}: SubtaskListProps) => {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  const handleAddSubtask = async () => {
    if (!newSubtaskTitle.trim()) return;
    await onAddSubtask(newSubtaskTitle);
    setNewSubtaskTitle("");
  };

  return (
    <div className="mt-4 space-y-4">
      <ScrollArea className="h-[200px] pr-4">
        <div className="space-y-2">
          {subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center gap-2">
              <Checkbox
                checked={subtask.completed}
                onCheckedChange={(checked) => 
                  onSubtaskToggle(subtask.id, checked as boolean)
                }
              />
              <span className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : ''}`}>
                {subtask.title}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex gap-2">
        <Input
          placeholder="Add a subtask..."
          value={newSubtaskTitle}
          onChange={(e) => setNewSubtaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
          className="flex-1"
        />
        <Button 
          onClick={handleAddSubtask}
          disabled={isLoading}
          size="sm"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};