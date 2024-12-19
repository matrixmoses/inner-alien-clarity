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
  taskId: string;  // Added this prop
  onStatusChange: (id: string, status: 'completed' | 'missed') => Promise<void>;
}

export const SubtaskList = ({
  taskId,
  onStatusChange,
}: SubtaskListProps) => {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSubtask = async () => {
    if (!newSubtaskTitle.trim()) return;
    setIsLoading(true);
    try {
      // Add subtask logic here
      setNewSubtaskTitle("");
    } catch (error) {
      console.error("Error adding subtask:", error);
    } finally {
      setIsLoading(false);
    }
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
                  onStatusChange(subtask.id, checked ? 'completed' : 'missed')
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