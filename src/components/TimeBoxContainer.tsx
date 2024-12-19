import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { JournalDisplay } from "./JournalDisplay";
import { TimeBoxList } from "./TimeBoxList";
import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { TimeBoxForm } from "./TimeBoxForm";

export const TimeBoxContainer = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative min-h-[calc(100vh-12rem)]">
      <div className="space-y-8">
        <JournalDisplay />
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <TimeBoxForm onSuccess={() => setShowForm(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-8">
        <TimeBoxList />
      </div>
      
      {/* Floating Add Button */}
      <Button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary-hover transition-colors duration-200"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};