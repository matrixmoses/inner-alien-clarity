import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { NavigationBar } from "./navigation/NavigationBar";
import { PersistentTimer } from "./PersistentTimer";
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

interface LayoutProps {
  children: React.ReactNode;
}

// Define valid table names as a type
type TableName = 
  | "subtasks"
  | "pomodoro_sessions"
  | "procrastination_entries"
  | "procrastination_insights"
  | "streak_history"
  | "subject_streaks"
  | "user_streaks"
  | "wins"
  | "achievements"
  | "journal_entries"
  | "tasks";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const handleClearData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Define tables in strict order based on foreign key relationships
      // Tables with foreign keys to tasks must be deleted first
      const tablesToDelete: TableName[] = [
        // Level 1: Tables that reference tasks
        'subtasks',
        'pomodoro_sessions',
        'procrastination_entries',
        // Level 2: Independent tables or tables referencing user only
        'procrastination_insights',
        'streak_history',
        'subject_streaks',
        'user_streaks',
        'wins',
        'achievements',
        'journal_entries',
        // Level 3: Main tasks table (deleted last)
        'tasks'
      ];

      console.log('Starting data deletion process...');

      // Delete data from each table sequentially
      for (const table of tablesToDelete) {
        try {
          console.log(`Attempting to clear table: ${table}`);
          
          const { error } = await supabase
            .from(table)
            .delete()
            .eq('user_id', user.id);
          
          if (error) {
            console.error(`Error details for ${table}:`, error);
            throw new Error(`Failed to clear table ${table}: ${error.message}`);
          }
          
          console.log(`Successfully cleared table: ${table}`);
        } catch (tableError) {
          console.error(`Detailed error for ${table}:`, tableError);
          throw tableError;
        }
      }

      console.log('All tables cleared successfully');

      toast({
        title: "Success",
        description: "All your data has been successfully cleared.",
      });

      // Force a complete page reload
      window.location.href = window.location.href;
    } catch (error: any) {
      console.error('Detailed error in handleClearData:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to clear data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {isAuthenticated && <NavigationBar />}
      <div className="flex-1">
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-semibold">
              TheInnerAlien.co
            </Link>
            <div className="flex items-center gap-4">
              {isAuthenticated && <PersistentTimer />}
              {isAuthenticated && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost"
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
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
              )}
              {isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};