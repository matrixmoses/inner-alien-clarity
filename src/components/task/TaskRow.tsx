import { Task } from "../TaskItem";
import { format } from "date-fns";
import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { SubtaskList } from "./SubtaskList";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ProcrastinationDialog } from "../procrastination/ProcrastinationDialog";

interface TaskRowProps {
  task: Task;
  onStatusChange: (id: string, status: 'completed' | 'missed') => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TaskRow = ({ task, onStatusChange, onDelete }: TaskRowProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [showProcrastinationDialog, setShowProcrastinationDialog] = useState(false);

  const handleMissed = () => {
    setShowProcrastinationDialog(true);
  };

  return (
    <div className="group">
      <div 
        className="flex items-center justify-between bg-background hover:bg-[#F4F5F9] p-4 rounded-lg cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="flex items-center gap-4 flex-1">
          <span className="font-medium text-foreground">{task.task_name}</span>
          <span className="text-sm text-muted-foreground">
            {format(new Date(task.task_date), "MMM d, yyyy")}
          </span>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-primary/10 hover:text-primary"
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange(task.id, 'completed');
            }}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-destructive/10 hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleMissed();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{task.task_name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <Input
                value={editedTask.task_name}
                onChange={(e) => setEditedTask({ ...editedTask, task_name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Notes</label>
              <Textarea
                value={editedTask.notes || ""}
                onChange={(e) => setEditedTask({ ...editedTask, notes: e.target.value })}
                placeholder="Add notes..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Hashtags</label>
              <Input
                placeholder="Add hashtags (e.g., #Work #Personal)"
                value={editedTask.hashtags?.join(" ") || ""}
                onChange={(e) => {
                  const hashtags = e.target.value
                    .split(" ")
                    .filter(tag => tag.startsWith("#"))
                    .map(tag => tag.trim());
                  setEditedTask({ ...editedTask, hashtags });
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Subtasks</label>
              <SubtaskList
                taskId={task.id}
                onStatusChange={onStatusChange}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ProcrastinationDialog
        isOpen={showProcrastinationDialog}
        onClose={() => setShowProcrastinationDialog(false)}
        task={task}
      />
    </div>
  );
};