import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

interface AnalysisResponse {
  analysis: string;
  steps: string[];
  motivation: string;
}

export const useProcrastinationAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<AnalysisResponse | null>(null);
  const { toast } = useToast();

  const analyzeTask = async (
    reason: string,
    customReason: string,
    taskDetails: { task_name: string; task_description?: string }
  ) => {
    try {
      setIsAnalyzing(true);
      console.log('Analyzing task:', { reason, customReason, taskDetails });

      const { data, error } = await supabase.functions.invoke('analyze-text', {
        body: { reason, customReason, taskDetails }
      });

      if (error) {
        console.error('Analysis error:', error);
        throw error;
      }

      console.log('Analysis response:', data);
      setAiFeedback(data);
      return data;
    } catch (error: any) {
      console.error('Error in analyzeTask:', error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze task. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    isAnalyzing,
    aiFeedback,
    analyzeTask,
  };
};