import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SubjectStreaks } from "@/components/dashboard/SubjectStreaks";
import { StreakTracker } from "@/components/dashboard/StreakTracker";
import { TimeStatistics } from "@/components/dashboard/TimeStatistics";
import { TimeBoxHistory } from "@/components/dashboard/TimeBoxHistory";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [todayProgress, setTodayProgress] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const [totalTimeToday, setTotalTimeToday] = useState(0);
  const [weeklyAverageTime, setWeeklyAverageTime] = useState(0);

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
        return;
      }

      // Fetch today's progress
      const today = new Date().toISOString().split('T')[0];
      const { data: todayData } = await supabase.rpc(
        'calculate_daily_task_completion',
        { user_id_param: session.user.id, date_param: today }
      );
      setTodayProgress(todayData || 0);

      // Calculate weekly progress
      const last7Days = Array.from({length: 7}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
      }).reverse();

      const weeklyData = await Promise.all(
        last7Days.map(async (date) => {
          const { data } = await supabase.rpc(
            'calculate_daily_task_completion',
            { user_id_param: session.user.id, date_param: date }
          );
          return {
            date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
            completion: data || 0
          };
        })
      );
      setWeeklyProgress(weeklyData);

      // Calculate time statistics
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      
      const { data: todayTasks } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', session.user.id)
        .gte('created_at', startOfDay.toISOString())
        .eq('completed', true);

      const todayTotal = (todayTasks || []).reduce((acc, task) => {
        const start = new Date(`2000-01-01T${task.start_time}`);
        const end = new Date(`2000-01-01T${task.end_time}`);
        return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      }, 0);

      setTotalTimeToday(todayTotal);

      // Calculate weekly average
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      
      const { data: weekTasks } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', session.user.id)
        .gte('created_at', startOfWeek.toISOString())
        .eq('completed', true);

      const weeklyTotal = (weekTasks || []).reduce((acc, task) => {
        const start = new Date(`2000-01-01T${task.start_time}`);
        const end = new Date(`2000-01-01T${task.end_time}`);
        return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      }, 0);

      setWeeklyAverageTime(weeklyTotal / 7);
    };

    checkAuth();
  }, [navigate, toast]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Today's Progress */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Progress</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Task Completion</span>
                <span>{Math.round(todayProgress)}%</span>
              </div>
              <Progress value={todayProgress} className="h-2" />
            </div>
          </Card>

          {/* Time Statistics */}
          <TimeStatistics />

          {/* Streak Tracker */}
          <StreakTracker />

          {/* Subject Streaks */}
          <SubjectStreaks />

          {/* Time Box History */}
          <TimeBoxHistory />

          {/* Weekly Progress Chart */}
          <Card className="p-6 col-span-full">
            <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#6EC4A8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
