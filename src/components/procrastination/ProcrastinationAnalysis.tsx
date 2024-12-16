import { Card } from "@/components/ui/card";

interface ProcrastinationAnalysisProps {
  analysis: string;
  steps: string[];
  motivation: string;
}

export const ProcrastinationAnalysis = ({ analysis, steps, motivation }: ProcrastinationAnalysisProps) => {
  return (
    <Card className="p-4 space-y-4 bg-muted/50">
      <div>
        <h3 className="text-lg font-semibold mb-2">Procrastination Analysis</h3>
        <p className="text-sm text-muted-foreground">{analysis}</p>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Recommended Steps</h4>
        <ol className="list-decimal pl-4 space-y-1">
          {steps.map((step, index) => (
            <li key={index} className="text-sm">{step}</li>
          ))}
        </ol>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Motivation</h4>
        <p className="text-sm italic text-muted-foreground">{motivation}</p>
      </div>
    </Card>
  );
};