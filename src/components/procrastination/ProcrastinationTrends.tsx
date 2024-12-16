import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock, Calendar } from "lucide-react";
import { MetricCard } from "./MetricCard";

const weekData = [
  { name: 'Mon', tasks: 4 },
  { name: 'Tue', tasks: 3 },
  { name: 'Wed', tasks: 5 },
  { name: 'Thu', tasks: 2 },
  { name: 'Fri', tasks: 6 },
  { name: 'Sat', tasks: 4 },
  { name: 'Sun', tasks: 3 },
];

const monthData = Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`,
  tasks: Math.floor(Math.random() * 8),
}));

export const ProcrastinationTrends = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month">("week");
  
  const peakHours = "2 PM - 4 PM";
  const worstDay = "Monday";

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Procrastination Trends</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Peak Procrastination Hours"
          value={peakHours}
          description="Most tasks are postponed during this time"
        />
        <MetricCard
          title="Day with Most Procrastination"
          value={worstDay}
          description="Tasks are most likely to be postponed on this day"
        />
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Procrastination Over Time</h3>
          </div>
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as "week" | "month")}>
            <TabsList>
              <TabsTrigger value="week">7 Days</TabsTrigger>
              <TabsTrigger value="month">30 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeRange === "week" ? weekData : monthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#9C8ADE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};