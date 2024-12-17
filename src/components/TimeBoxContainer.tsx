import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { JournalDisplay } from "./JournalDisplay";
import { TimeBoxForm } from "./TimeBoxForm";
import { TimeBoxList } from "./TimeBoxList";
import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";

export const TimeBoxContainer = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
      <div className="space-y-8">
        <JournalDisplay />
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-lg">
            <TimeBoxForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-8 bg-[#F4F5F9] p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-[#9C8ADE] hover:bg-[#9C8ADE]/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
        <TimeBoxList />
      </div>
    </div>
  );
};