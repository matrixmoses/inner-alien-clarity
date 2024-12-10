import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CompactPomodoro } from "@/components/CompactPomodoro";
import { Gamification } from "@/components/dashboard/Gamification";
import { JournalHistory } from "@/components/dashboard/JournalHistory";
import { ProductivityGraphs } from "@/components/dashboard/ProductivityGraphs";
import { StreakTracker } from "@/components/dashboard/StreakTracker";
import { TimeBoxHistory } from "@/components/dashboard/TimeBoxHistory";
import { TimeStatistics } from "@/components/dashboard/TimeStatistics";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access the dashboard",
          variant: "destructive",
        });
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate, toast]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Focus Timer</h2>
            <CompactPomodoro />
          </Card>
          
          <TimeStatistics />
          <Gamification />
          <ProductivityGraphs />
          <StreakTracker />
          <TimeBoxHistory />
          <JournalHistory />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;