import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface SubtaskListProps {
  taskId: string;
  onStatusChange: (id: string, status: 'completed' | 'missed') => Promise<void>;
}

export const SubtaskList = ({
  taskId,
  onStatusChange,
}: SubtaskListProps) => {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchSubtasks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('subtasks')
        .select('*')
        .eq('task_id', taskId)
        .eq('user_id', user.id);

      if (error) throw error;
      setSubtasks(data || []);
    } catch (error: any) {
      console.error("Error fetching subtasks:", error);
      toast({
        title: "Error",
        description: "Failed to fetch subtasks",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSubtasks();
  }, [taskId]);

  const handleAddSubtask = async () => {
    if (!newSubtaskTitle.trim()) return;
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('subtasks')
        .insert({
          task_id: taskId,
          user_id: user.id,
          title: newSubtaskTitle,
          completed: false
        })
        .select()
        .single();

      if (error) throw error;

      setSubtasks([...subtasks, data]);
      setNewSubtaskTitle("");
      
      toast({
        title: "Success",
        description: "Subtask added successfully",
      });
    } catch (error: any) {
      console.error("Error adding subtask:", error);
      toast({
        title: "Error",
        description: "Failed to add subtask",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSubtask = async (subtaskId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('subtasks')
        .update({ completed })
        .eq('id', subtaskId);

      if (error) throw error;

      setSubtasks(subtasks.map(st => 
        st.id === subtaskId ? { ...st, completed } : st
      ));
    } catch (error) {
      console.error("Error updating subtask:", error);
      toast({
        title: "Error",
        description: "Failed to update subtask",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <ScrollArea className="h-[200px] pr-4">
        <div className="space-y-2">
          {subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center gap-2">
              <Checkbox
                checked={subtask.completed}
                onCheckedChange={(checked) => 
                  handleToggleSubtask(subtask.id, checked as boolean)
                }
              />
              <span className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : ''}`}>
                {subtask.title}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex gap-2">
        <Input
          placeholder="Add a subtask..."
          value={newSubtaskTitle}
          onChange={(e) => setNewSubtaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
          className="flex-1"
        />
        <Button 
          onClick={handleAddSubtask}
          disabled={isLoading}
          size="sm"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};