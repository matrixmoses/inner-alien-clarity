import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";

export const TimeBoxHistory = () => {
  const sessions = [
    { id: 1, date: "2024-03-20", duration: "25 min", task: "Project planning" },
    { id: 2, date: "2024-03-20", duration: "25 min", task: "Code review" },
    { id: 3, date: "2024-03-19", duration: "25 min", task: "Bug fixing" },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Clock className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Recent Sessions</h2>
      </div>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="p-4 bg-neutral rounded-lg">
              <div className="flex justify-between items-center">
                <p className="font-medium">{session.task}</p>
                <p className="text-sm text-gray-500">{session.duration}</p>
              </div>
              <p className="text-sm text-gray-500 mt-2">{session.date}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};