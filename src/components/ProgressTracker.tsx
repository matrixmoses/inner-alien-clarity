import React from "react";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Progress", value: 20 },
  { name: "Remaining", value: 80 },
];

const COLORS = ["#67E8F9", "#9b87f5"];

const ProgressTracker = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Your Progress</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Daily Goals</span>
              <span>20%</span>
            </div>
            <Progress value={20} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Weekly Tasks</span>
              <span>45%</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Monthly Goals</span>
              <span>60%</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-2xl font-bold text-accent-dark">7</p>
          <p className="text-sm text-gray-600">Daily Streaks</p>
        </div>
        <div className="p-4 bg-primary/10 rounded-lg">
          <p className="text-2xl font-bold text-primary-dark">12</p>
          <p className="text-sm text-gray-600">Tasks Completed</p>
        </div>
        <div className="p-4 bg-accent/10 rounded-lg">
          <p className="text-2xl font-bold text-accent-dark">3</p>
          <p className="text-sm text-gray-600">Goals Achieved</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;