import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartLine } from "lucide-react";

const ProgressTracker = () => {
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="space-y-1 p-6">
        <div className="flex items-center space-x-2">
          <ChartLine className="w-5 h-5 text-primary" />
          <CardTitle className="text-2xl font-semibold">Progress Tracker</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Daily Goals</span>
            <span className="text-primary">75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Weekly Progress</span>
            <span className="text-accent">60%</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Monthly Achievement</span>
            <span className="text-primary">90%</span>
          </div>
          <Progress value={90} className="h-2" />
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <p className="text-sm text-center text-gray-600">
            Track your progress and stay motivated with visual insights
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;