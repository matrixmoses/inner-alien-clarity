import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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

type TableName = "subtasks" | "procrastination_entries" | "pomodoro_sessions" | 
                 "procrastination_insights" | "streak_history" | "subject_streaks" | 
                 "user_streaks" | "wins" | "achievements" | "journal_entries" | "tasks";

interface DeleteOperation {
  table: TableName;
  message: string;
}

export const ClearDataButton = () => {
  const [isClearing, setIsClearing] = useState(false);
  const { toast } = useToast();

  const handleClearData = async () => {
    try {
      setIsClearing(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Delete data in the correct order based on foreign key relationships
      const deleteOperations: DeleteOperation[] = [
        // First level: Delete dependent tables
        { table: "subtasks", message: 'Clearing subtasks...' },
        { table: "procrastination_entries", message: 'Clearing procrastination entries...' },
        { table: "pomodoro_sessions", message: 'Clearing pomodoro sessions...' },
        
        // Second level: Delete independent tables
        { table: "procrastination_insights", message: 'Clearing insights...' },
        { table: "streak_history", message: 'Clearing streak history...' },
        { table: "subject_streaks", message: 'Clearing subject streaks...' },
        { table: "user_streaks", message: 'Clearing user streaks...' },
        { table: "wins", message: 'Clearing wins...' },
        { table: "achievements", message: 'Clearing achievements...' },
        { table: "journal_entries", message: 'Clearing journal entries...' },
        
        // Final level: Delete main table
        { table: "tasks", message: 'Clearing tasks...' },
      ];

      for (const operation of deleteOperations) {
        console.log(`Starting: ${operation.message}`);
        const { error } = await supabase
          .from(operation.table)
          .delete()
          .eq('user_id', user.id);
        
        if (error) {
          console.error(`Error clearing ${operation.table}:`, error);
          throw new Error(`Failed to clear ${operation.table}: ${error.message}`);
        }
        console.log(`Completed: ${operation.message}`);
      }

      toast({
        title: "Success",
        description: "All your data has been successfully cleared.",
      });

      window.location.reload();
    } catch (error: any) {
      console.error('Error in handleClearData:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to clear data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="ghost"
          className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          disabled={isClearing}
        >
          <Trash2 className="h-4 w-4" />
          Clear Data
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all your tasks,
            journal entries, achievements, and other data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleClearData}
            className="bg-red-600 hover:bg-red-700"
          >
            Clear all data
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};