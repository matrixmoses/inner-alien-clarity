import { Plus, Star, Calendar, Trophy } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface Win {
  id: string;
  title: string;
  timestamp: string;
  category: "achievement" | "milestone" | "gratitude";
}

const WinJournal = () => {
  const wins: Win[] = [
    {
      id: "1",
      title: "Completed morning meditation",
      timestamp: "10:30 AM",
      category: "milestone"
    },
    {
      id: "2",
      title: "Finished project presentation",
      timestamp: "2:45 PM",
      category: "achievement"
    }
  ];

  return (
    <div className="flex gap-4 p-4 max-w-3xl mx-auto">
      {/* Wins List */}
      <Card className="flex-1 bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Today's Wins</h2>
              <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {wins.map((win) => (
                <div
                  key={win.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  {win.category === "achievement" && (
                    <Trophy className="w-5 h-5 text-primary" />
                  )}
                  {win.category === "milestone" && (
                    <Star className="w-5 h-5 text-primary" />
                  )}
                  {win.category === "gratitude" && (
                    <Calendar className="w-5 h-5 text-primary" />
                  )}
                  <div className="flex-1">
                    <p className="text-gray-900">{win.title}</p>
                    <p className="text-sm text-gray-500">{win.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Add Win Form */}
      <Card className="w-72 bg-white shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Win</h2>
          <div className="space-y-4">
            <Button
              className="w-full bg-accent hover:bg-accent-dark text-white"
              size="lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Win
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WinJournal;