import { JournalHistory } from "./JournalHistory";
import { TaskHistory } from "./TaskHistory";

export const HistoryContainer = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">History</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <JournalHistory />
        <TaskHistory />
      </div>
    </div>
  );
};