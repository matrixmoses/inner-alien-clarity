import { Clock, Plus, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";

const GuidedRoutine = () => {
  return (
    <div className="flex gap-8 items-center justify-center">
      <Card className="w-[320px] p-6 bg-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-800">Morning Flow</h3>
            <p className="text-sm text-gray-500">Today's Routine</p>
          </div>
          <span className="text-sm text-gray-500">10:30</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="text-sm">Meditation & Breathing</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-accent" />
            <span className="text-sm">Daily Planning Session</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-accent" />
            <span className="text-sm">Priority Task Focus</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary-light/20 rounded-lg">
          <span className="text-sm text-gray-700">Next: Deep Work Block</span>
        </div>
      </Card>

      <Card className="w-[280px] p-6 bg-white shadow-lg">
        <div className="space-y-4">
          <button className="w-full py-3 bg-accent text-white rounded-md flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add Task
          </button>
          
          <div className="bg-gray-100 h-12 rounded-md"></div>
          <div className="bg-gray-100 h-12 rounded-md"></div>
          
          <div className="flex gap-2 mt-8">
            <div className="w-8 h-8 rounded-full bg-primary/20"></div>
            <div className="w-8 h-8 rounded-md bg-accent/20"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GuidedRoutine;