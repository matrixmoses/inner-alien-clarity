import { Button } from "@/components/ui/button";
import { Check, X, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TaskHeaderProps {
  taskName: string;
  completed: boolean;
  onComplete: () => Promise<void>;
  onMissed: () => void;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
}

export const TaskHeader = ({
  taskName,
  completed,
  onComplete,
  onMissed,
  onDelete,
  isDeleting,
}: TaskHeaderProps) => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`${
              completed
                ? "bg-green-500 text-white hover:bg-green-600"
                : "hover:bg-green-100"
            }`}
            onClick={onComplete}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-red-100"
            onClick={onMissed}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <h3 className="font-bold text-lg">{taskName}</h3>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-600"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};