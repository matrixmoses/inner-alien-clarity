import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book } from "lucide-react";

export const JournalHistory = () => {
  const entries = [
    { id: 1, date: "2024-03-20", content: "Completed major project milestone" },
    { id: 2, date: "2024-03-19", content: "Started learning a new framework" },
    { id: 3, date: "2024-03-18", content: "Fixed critical bug in production" },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <Book className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Journal History</h2>
      </div>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="p-4 bg-neutral rounded-lg">
              <p className="text-sm text-gray-500">{entry.date}</p>
              <p className="mt-2">{entry.content}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};