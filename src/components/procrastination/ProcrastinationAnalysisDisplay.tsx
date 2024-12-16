import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ProcrastinationAnalysisDisplayProps {
  isAnalyzing: boolean;
  analysis: {
    analysis: string;
    steps: string[];
    motivation: string;
  } | null;
  error?: string;
}

export const ProcrastinationAnalysisDisplay = ({
  isAnalyzing,
  analysis,
  error
}: ProcrastinationAnalysisDisplayProps) => {
  if (isAnalyzing) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Analyzing...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!analysis) return null;

  return (
    <Card className="p-4 space-y-4 bg-muted/50">
      <div>
        <h3 className="text-lg font-semibold mb-2">Procrastination Analysis</h3>
        <p className="text-sm text-muted-foreground">{analysis.analysis}</p>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Recommended Steps</h4>
        <ol className="list-decimal pl-4 space-y-1">
          {analysis.steps.map((step, index) => (
            <li key={index} className="text-sm">{step}</li>
          ))}
        </ol>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Motivation</h4>
        <p className="text-sm italic text-muted-foreground">{analysis.motivation}</p>
      </div>
    </Card>
  );
};