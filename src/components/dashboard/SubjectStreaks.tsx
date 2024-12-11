import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Trophy, Book, Dumbbell, Briefcase, MoreHorizontal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SubjectStreak {
  subject: string;
  weekly_streak: number;
  weekly_total_hours: number;
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

export const SubjectStreaks = () => {
  const [streaks, setStreaks] = useState<SubjectStreak[]>([]);

  useEffect(() => {
    const fetchStreaks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("subject_streaks")
        .select("subject, weekly_streak, weekly_total_hours")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching streaks:", error);
        return;
      }

      setStreaks(data || []);
    };

    fetchStreaks();
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Subject Streaks</h2>
      </div>
      <div className="space-y-4">
        {streaks.map((streak) => (
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
      </div>
    </Card>
  );
};