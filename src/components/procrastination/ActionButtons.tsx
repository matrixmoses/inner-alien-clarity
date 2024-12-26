import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ActionButtonsProps {
  isLoading: boolean;
  isAnalyzing: boolean;
  onMarkAsDone: () => void;
  onSaveForLater: () => void;
  onAnalyze: () => void;
}

export const ActionButtons = ({ 
  isLoading, 
  isAnalyzing,
  onMarkAsDone, 
  onSaveForLater,
  onAnalyze 
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        onClick={onMarkAsDone} 
        disabled={isLoading}
        className="flex-1"
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Mark as Done
      </Button>
      <Button 
        onClick={onAnalyze}
        variant="secondary"
        disabled={isAnalyzing}
        className="flex-1"
      >
        {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Analyze
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