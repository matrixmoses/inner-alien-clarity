import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export const useTaskActions = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const markTaskAsDone = async (taskId: string) => {
    try {
      setIsUpdating(true);
      console.log('Marking task as done:', taskId);

      const { error } = await supabase
        .from("tasks")
        .update({ completed: true })
        .eq("id", taskId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Task marked as completed",
      });
      return true;
    } catch (error: any) {
      console.error('Error marking task as done:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update task status",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const saveTaskForLater = async (taskId: string) => {
    try {
      setIsUpdating(true);
      console.log('Saving task for later:', taskId);

      const { error } = await supabase
        .from("procrastination_entries")
        .update({ rescheduled_to: new Date().toISOString() })
        .eq("task_id", taskId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Task saved for later review",
      });
      return true;
    } catch (error: any) {
      console.error('Error saving task for later:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save task for later",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    markTaskAsDone,
    saveTaskForLater,
  };
};