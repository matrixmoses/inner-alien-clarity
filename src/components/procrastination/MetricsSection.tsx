import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MetricCard } from "./MetricCard";
import { ProcrastinationChart } from "./ProcrastinationChart";
import { ProcrastinationTrends } from "./ProcrastinationTrends";
import { TaskCategoryInsights } from "./TaskCategoryInsights";
import { ProcrastinationRecommendations } from "./ProcrastinationRecommendations";
import { supabase } from "@/integrations/supabase/client";

export const MetricsSection = () => {
  const [metrics, setMetrics] = useState({
    totalProcrastinated: 0,
    procrastinationRate: 0,
    averageDelay: 0,
  });

  const [reasonsData, setReasonsData] = useState([
    { name: "Lack of Motivation", value: 0 },
    { name: "Too Difficult", value: 0 },
    { name: "Forgot", value: 0 },
    { name: "Other", value: 0 },
  ]);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch total tasks and procrastinated tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('completed')
        .eq('user_id', user.id);

      if (tasksError) throw tasksError;

      const totalTasks = tasksData?.length || 0;
      const procrastinatedTasks = tasksData?.filter(task => !task.completed).length || 0;

      // Fetch procrastination reasons
      const { data: reasonsData, error: reasonsError } = await supabase
        .from('procrastination_entries')
        .select('reason, created_at')
        .eq('user_id', user.id);

      if (reasonsError) throw reasonsError;

      // Calculate metrics
      const procrastinationRate = totalTasks ? (procrastinatedTasks / totalTasks) * 100 : 0;

      // Group reasons
      const reasonsCounts = reasonsData?.reduce((acc: any, entry) => {
        acc[entry.reason] = (acc[entry.reason] || 0) + 1;
        return acc;
      }, {});

      setMetrics({
        totalProcrastinated: procrastinatedTasks,
        procrastinationRate: Math.round(procrastinationRate),
        averageDelay: 0, // This would require additional date calculations
      });

      setReasonsData([
        { name: "Lack of Motivation", value: reasonsCounts?.lack_of_motivation || 0 },
        { name: "Too Difficult", value: reasonsCounts?.too_difficult || 0 },
        { name: "Forgot", value: reasonsCounts?.forgot || 0 },
        { name: "Other", value: reasonsCounts?.custom || 0 },
      ]);

    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Procrastination Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Procrastinated Tasks"
          value={metrics.totalProcrastinated}
          description="Tasks marked as not completed"
        />
        <MetricCard
          title="Procrastination Rate"
          value={`${metrics.procrastinationRate}%`}
          description="Of total scheduled tasks"
        />
        <MetricCard
          title="Average Delay Duration"
          value={metrics.averageDelay}
          description="Time before marking as incomplete"
        />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Reasons for Procrastination</h3>
        <ProcrastinationChart data={reasonsData} />
      </Card>

      <ProcrastinationTrends />
      
      <TaskCategoryInsights />

      <ProcrastinationRecommendations />
    </div>
  );
};