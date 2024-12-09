import { Card } from "@/components/ui/card";
import { Flame } from "lucide-react";

export const StreakTracker = () => {
  const streakDays = [
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: true },
    { day: 'T', completed: false },
    { day: 'F', completed: true },
    { day: 'S', completed: true },
    { day: 'S', completed: true },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Flame className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Weekly Streak</h2>
      </div>
      <div className="flex justify-between">
        {streakDays.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
              day.completed ? 'bg-primary text-white' : 'bg-neutral text-gray-500'
            }`}>
              {day.day}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};