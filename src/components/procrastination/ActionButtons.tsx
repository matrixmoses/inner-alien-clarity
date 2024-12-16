import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ActionButtonsProps {
  isLoading: boolean;
  onMarkAsDone: () => void;
  onSaveForLater: () => void;
}

export const ActionButtons = ({ isLoading, onMarkAsDone, onSaveForLater }: ActionButtonsProps) => {
  return (
    <div className="flex gap-2 pt-2">
      <Button 
        onClick={onMarkAsDone} 
        disabled={isLoading}
        className="flex-1"
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Mark as Done
      </Button>
      <Button 
        onClick={onSaveForLater} 
        variant="outline"
        disabled={isLoading}
        className="flex-1"
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save for Later
      </Button>
    </div>
  );
};