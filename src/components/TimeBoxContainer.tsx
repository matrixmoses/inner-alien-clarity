import { JournalDisplay } from "./JournalDisplay";
import { TimeBoxForm } from "./TimeBoxForm";
import { TimeBoxList } from "./TimeBoxList";

export const TimeBoxContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <JournalDisplay />
        <TimeBoxForm />
      </div>
      <div className="space-y-8 bg-[#F4F5F9] p-6 rounded-lg">
        <TimeBoxList />
      </div>
    </div>
  );
};