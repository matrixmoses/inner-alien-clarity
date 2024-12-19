import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sun, Moon, AlertCircle } from "lucide-react";

interface JournalEntry {
  type: "morning" | "evening";
  content: string;
}

interface ProcrastinatedTask {
  id: string;
  task_name: string;
  reason: string;
  custom_reason: string | null;
}

export const JournalDisplay = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [procrastinatedTasks, setProcrastinatedTasks] = useState<ProcrastinatedTask[]>([]);

  useEffect(() => {
    const fetchTodayEntries = async () => {
      const today = new Date().toISOString().split('T')[0];
      
      // Fetch journal entries
      const { data: journalData, error: journalError } = await supabase
        .from('journal_entries')
        .select('type, content')
        .eq('date', today)
        .eq('is_draft', true);

      if (journalError) {
        console.error('Error fetching journal entries:', journalError);
        return;
      }

      if (journalData) {
        const validEntries = journalData.filter(
          (entry): entry is JournalEntry => 
            entry.type === 'morning' || entry.type === 'evening'
        );
        setEntries(validEntries);
      }

      // Fetch procrastinated tasks
      const { data: procrastinatedData, error: procrastinatedError } = await supabase
        .from('procrastination_entries')
        .select(`
          id,
          tasks (
            task_name
          ),
          reason,
          custom_reason
        `)
        .eq('resolved', false)
        .not('rescheduled_to', 'is', null)
        .order('created_at', { ascending: false });

      if (procrastinatedError) {
        console.error('Error fetching procrastinated tasks:', procrastinatedError);
        return;
      }

      if (procrastinatedData) {
        setProcrastinatedTasks(procrastinatedData.map(entry => ({
          id: entry.id,
          task_name: entry.tasks?.task_name || 'Unnamed Task',
          reason: entry.reason,
          custom_reason: entry.custom_reason
        })));
      }
    };

    fetchTodayEntries();
  }, []);

  if (entries.length === 0 && procrastinatedTasks.length === 0) {
    return (
      <div className="text-center p-8 bg-[#6EC4A8]/10 rounded-lg">
        <p className="text-lg text-gray-600">
          No pending journal entries for today. Visit the{" "}
          <Link to="/journal" className="text-[#9C8ADE] hover:underline">
            Journal page
          </Link>{" "}
          to add your reflections.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <div key={entry.type} className="bg-[#6EC4A8]/10 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            {entry.type === 'morning' ? (
              <Sun className="h-5 w-5 text-[#9C8ADE]" />
            ) : (
              <Moon className="h-5 w-5 text-[#9C8ADE]" />
            )}
            <h3 className="text-xl font-semibold capitalize">
              {entry.type} Reflection
            </h3>
          </div>
          <p className="text-sm italic text-gray-600 mb-3">
            {entry.type === 'morning' 
              ? "What good shall I do today?" 
              : "What good have I done today?"}
          </p>
          <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
        </div>
      ))}

      {procrastinatedTasks.length > 0 && (
        <div className="bg-[#6EC4A8]/10 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-5 w-5 text-[#9C8ADE]" />
            <h3 className="text-xl font-semibold">
              Procrastinated Tasks
            </h3>
          </div>
          <div className="space-y-3">
            {procrastinatedTasks.map((task) => (
              <div key={task.id} className="bg-white/50 p-4 rounded-lg">
                <h4 className="font-medium">{task.task_name}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Reason: {task.custom_reason || task.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};