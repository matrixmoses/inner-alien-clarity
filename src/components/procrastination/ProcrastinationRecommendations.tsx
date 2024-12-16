import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookmarkPlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Recommendation {
  analysis: string;
  steps: string[];
  motivation: string;
}

export const ProcrastinationRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedForLater, setSavedForLater] = useState(false);
  const { toast } = useToast();

  const fetchRecommendations = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get the latest procrastination entry
      const { data: entries } = await supabase
        .from('procrastination_entries')
        .select('*, tasks(task_name)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!entries) {
        toast({
          title: "No procrastination entries found",
          description: "Try adding some tasks first.",
          variant: "destructive",
        });
        return;
      }

      const response = await supabase.functions.invoke('analyze-text', {
        body: {
          reason: entries.reason,
          customReason: entries.custom_reason,
          taskDetails: {
            task_name: entries.tasks?.task_name || "Unknown task",
          },
        },
      });

      if (response.error) throw response.error;
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveForLater = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('procrastination_insights')
        .insert({
          user_id: user.id,
          insight_type: 'recommendation',
          insight_content: JSON.stringify(recommendations),
        });

      if (error) throw error;

      setSavedForLater(true);
      toast({
        title: "Saved",
        description: "Recommendations saved for later review.",
      });
    } catch (error) {
      console.error('Error saving recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to save recommendations. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Procrastination Recommendations</h2>
        <Button
          onClick={fetchRecommendations}
          disabled={isLoading}
          variant="outline"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Get Recommendations"
          )}
        </Button>
      </div>

      {recommendations && (
        <Card className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Analysis</h3>
            <p className="text-muted-foreground">{recommendations.analysis}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Action Steps</h3>
            <ul className="space-y-2">
              {recommendations.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-1 text-primary">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Motivation</h3>
            <p className="text-muted-foreground italic">{recommendations.motivation}</p>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSaveForLater}
              disabled={savedForLater}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <BookmarkPlus className="h-4 w-4" />
              {savedForLater ? "Saved" : "Save for Later"}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};