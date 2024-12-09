import { Card } from "@/components/ui/card";
import { Clock, Target } from "lucide-react";

export const TimeStatistics = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Target className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Today's Progress</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-neutral rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium">Focus Time</p>
          </div>
          <p className="text-2xl font-bold mt-2">2h 15m</p>
        </div>
        <div className="p-4 bg-neutral rounded-lg">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium">Tasks Done</p>
          </div>
          <p className="text-2xl font-bold mt-2">8/10</p>
        </div>
      </div>
    </Card>
  );
};