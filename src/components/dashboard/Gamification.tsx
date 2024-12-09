import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

export const Gamification = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Trophy className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Achievements</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-neutral rounded-lg">
          <p className="text-sm font-medium">Current Streak</p>
          <p className="text-2xl font-bold">5 days</p>
        </div>
        <div className="p-4 bg-neutral rounded-lg">
          <p className="text-sm font-medium">Total Points</p>
          <p className="text-2xl font-bold">1,250</p>
        </div>
      </div>
    </Card>
  );
};