import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ActionButtons } from "./ActionButtons";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface ProcrastinationFormProps {
  taskId: string;
  onSuccess: () => void;
  onSaveForLater: () => void;
}

type ProcrastinationReason = "too_difficult" | "lack_of_motivation" | "forgot" | "custom";

export const ProcrastinationForm = ({
  taskId,
  onSuccess,
  onSaveForLater,
}: ProcrastinationFormProps) => {
  const [reason, setReason] = useState<ProcrastinationReason>("too_difficult");
  const [customReason, setCustomReason] = useState("");
  const [reflection, setReflection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from('procrastination_entries')
        .insert({
          task_id: taskId,
          user_id: user.id,
          reason: reason,
          custom_reason: reason === 'custom' ? customReason : null,
          reflection: reflection,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your procrastination entry has been saved",
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save procrastination entry",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // First save the entry
      const { error: saveError } = await supabase
        .from('procrastination_entries')
        .insert({
          task_id: taskId,
          user_id: user.id,
          reason: reason,
          custom_reason: reason === 'custom' ? customReason : null,
          reflection: reflection,
          resolved: false
        });

      if (saveError) throw saveError;

      // Then trigger analysis (you can implement this part based on your needs)
      toast({
        title: "Analysis Started",
        description: "Your procrastination pattern is being analyzed",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze procrastination entry",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveForLater = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase
        .from('procrastination_entries')
        .insert({
          task_id: taskId,
          user_id: user.id,
          reason: reason,
          custom_reason: reason === 'custom' ? customReason : null,
          reflection: reflection,
          rescheduled_to: new Date().toISOString(),
          resolved: false
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Task saved for later review",
      });
      onSaveForLater();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save task for later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <RadioGroup value={reason} onValueChange={(value) => setReason(value as ProcrastinationReason)}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="too_difficult" id="too_difficult" />
          <Label htmlFor="too_difficult">Too difficult</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="lack_of_motivation" id="lack_of_motivation" />
          <Label htmlFor="lack_of_motivation">Lack of motivation</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="forgot" id="forgot" />
          <Label htmlFor="forgot">Forgot</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="custom" />
          <Label htmlFor="custom">Other reason</Label>
        </div>
      </RadioGroup>

      {reason === "custom" && (
        <Textarea
          placeholder="Please describe your reason..."
          value={customReason}
          onChange={(e) => setCustomReason(e.target.value)}
        />
      )}

      <Textarea
        placeholder="Reflect on why this happened..."
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
      />

      <div className="flex gap-2 pt-2">
        <Button 
          onClick={handleAnalyze}
          className="flex-1"
          disabled={isLoading}
        >
          Analyze
        </Button>
        <Button 
          onClick={handleSaveForLater}
          variant="outline"
          className="flex-1"
          disabled={isLoading}
        >
          Save for Later
        </Button>
      </div>
    </div>
  );
};