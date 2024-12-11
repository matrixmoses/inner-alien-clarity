import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked_at: string | null;
}

export const AchievementsDisplay = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching achievements:", error);
        return;
      }

      setAchievements(data || []);
    };

    fetchAchievements();
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Award className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Achievements</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="p-3 bg-primary/10 rounded-lg flex flex-col items-center text-center"
          >
            <Award className="w-8 h-8 text-primary mb-2" />
            <p className="text-sm font-medium">{achievement.name}</p>
            <p className="text-xs text-gray-500">{achievement.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};