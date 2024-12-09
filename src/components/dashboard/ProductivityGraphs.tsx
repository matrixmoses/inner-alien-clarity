import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart } from "lucide-react";

const data = [
  { name: 'Mon', tasks: 4 },
  { name: 'Tue', tasks: 3 },
  { name: 'Wed', tasks: 5 },
  { name: 'Thu', tasks: 2 },
  { name: 'Fri', tasks: 6 },
  { name: 'Sat', tasks: 4 },
  { name: 'Sun', tasks: 3 },
];

export const ProductivityGraphs = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <BarChart className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Weekly Progress</h2>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tasks" stroke="#9C8ADE" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};