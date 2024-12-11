import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Award, Clock, Trophy, Book, Dumbbell, Briefcase, MoreHorizontal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";

interface WeeklyProgress {
  date: string;
  completion: number;
}

interface Achievement {
  name: string;
  description: string;
  icon: string;
  unlocked_at: string | null;
}

interface SubjectStreak {
  subject: string;
  weekly_streak: number;
  monthly_streak: number;
  overall_streak: number;
  weekly_total_hours: number;
  monthly_total_hours: number;
  all_time_total_hours: number;
}

const getSubjectIcon = (subject: string) => {
  switch (subject) {
    case 'study':
      return <Book className="w-6 h-6 text-primary" />;
    case 'sports':
      return <Dumbbell className="w-6 h-6 text-primary" />;
    case 'work':
      return <Briefcase className="w-6 h-6 text-primary" />;
    default:
      return <MoreHorizontal className="w-6 h-6 text-primary" />;
  }
};

const fetchUserData = async (userId: string) => {
  const [achievementsResponse, subjectStreaksResponse] = await Promise.all([
    supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId),
    supabase
      .from('subject_streaks')
      .select('*')
      .eq('user_id', userId)
  ]);

  return {
    achievements: achievementsResponse.data || [],
    subjectStreaks: subjectStreaksResponse.data || []
  };
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [todayProgress, setTodayProgress] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress[]>([]);
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

  // Use React Query to fetch user data
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      return fetchUserData(session.user.id);
    },
  });

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
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Time Statistics</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Today's Total Time</p>
                <p className="text-2xl font-bold">{Math.round(totalTimeToday * 10) / 10}h</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Weekly Average</p>
                <p className="text-2xl font-bold">{Math.round(weeklyAverageTime * 10) / 10}h</p>
              </div>
            </div>
          </Card>

          {/* Subject Streaks */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Subject Streaks</h2>
            </div>
            <div className="space-y-4">
              {userData?.subjectStreaks.map((streak) => (
                <div key={streak.subject} className="flex items-center gap-3">
                  {getSubjectIcon(streak.subject)}
                  <div>
                    <p className="font-medium capitalize">{streak.subject}</p>
                    <p className="text-sm text-gray-500">
                      {streak.weekly_streak} week streak • {Math.round(streak.weekly_total_hours)}h this week
                    </p>
                  </div>
                </div>
              ))}
              {(!userData?.subjectStreaks || userData.subjectStreaks.length === 0) && (
                <p className="text-sm text-gray-500">No subject streaks yet. Start completing tasks to build your streaks!</p>
              )}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Achievements</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {userData?.achievements.map((achievement) => (
                <div
                  key={achievement.name}
                  className="p-3 bg-primary/10 rounded-lg flex flex-col items-center text-center"
                >
                  <Award className="w-8 h-8 text-primary mb-2" />
                  <p className="text-sm font-medium">{achievement.name}</p>
                </div>
              ))}
              {(!userData?.achievements || userData.achievements.length === 0) && (
                <p className="text-sm text-gray-500 col-span-2">No achievements yet. Keep working to unlock them!</p>
              )}
            </div>
          </Card>

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
