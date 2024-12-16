import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Folder, ListTodo } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MetricCard } from "./MetricCard";

interface CategoryData {
  category: string;
  count: number;
}

export const TaskCategoryInsights = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month">("week");
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [taskSizeData, setTaskSizeData] = useState({
    singleTasks: 0,
    multiStepTasks: 0,
  });
  const [mostProcrastinated, setMostProcrastinated] = useState("");

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Get date range
        const now = new Date();
        const startDate = new Date();
        startDate.setDate(now.getDate() - (timeRange === "week" ? 7 : 30));

        // Fetch tasks with their categories and completion status
        const { data: tasks, error } = await supabase
          .from("tasks")
          .select(`
            category,
            completed,
            subtasks (
              id
            )
          `)
          .eq("user_id", user.id)
          .gte("task_date", startDate.toISOString())
          .lt("task_date", now.toISOString());

        if (error) throw error;

        // Process category data
        const categoryCount: Record<string, number> = {};
        let singleTaskCount = 0;
        let multiStepTaskCount = 0;

        tasks?.forEach(task => {
          if (!task.completed) {
            const category = task.category || "Uncategorized";
            categoryCount[category] = (categoryCount[category] || 0) + 1;

            // Count tasks by size
            if (task.subtasks && task.subtasks.length > 0) {
              multiStepTaskCount++;
            } else {
              singleTaskCount++;
            }
          }
        });

        // Convert to array format for chart
        const categoryArray = Object.entries(categoryCount).map(([category, count]) => ({
          category,
          count,
        }));

        // Sort by count
        categoryArray.sort((a, b) => b.count - a.count);

        setCategoryData(categoryArray);
        setTaskSizeData({
          singleTasks: singleTaskCount,
          multiStepTasks: multiStepTaskCount,
        });
        setMostProcrastinated(categoryArray[0]?.category || "None");
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, [timeRange]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Procrastination by Task Type</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Most Procrastinated Category"
          value={mostProcrastinated}
          description="Category with highest procrastination rate"
          icon={<Folder className="h-4 w-4" />}
        />
        <MetricCard
          title="Task Size Impact"
          value={`${taskSizeData.multiStepTasks > taskSizeData.singleTasks ? 'Multi-step' : 'Single-step'} Tasks`}
          description={`${Math.max(taskSizeData.multiStepTasks, taskSizeData.singleTasks)} tasks procrastinated`}
          icon={<ListTodo className="h-4 w-4" />}
        />
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Folder className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Task Categories Overview</h3>
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
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6EC4A8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};