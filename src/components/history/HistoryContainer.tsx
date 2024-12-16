import { useState } from "react";
import { JournalHistory } from "./JournalHistory";
import { TaskHistory } from "./TaskHistory";
import { ProcrastinationHistory } from "./ProcrastinationHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";

export const HistoryContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">History</h1>
      
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Tabs defaultValue="journal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="completed">Completed Tasks</TabsTrigger>
          <TabsTrigger value="procrastination">Procrastination</TabsTrigger>
        </TabsList>

        <TabsContent value="journal">
          <JournalHistory searchQuery={searchQuery} selectedDate={date} />
        </TabsContent>
        
        <TabsContent value="completed">
          <TaskHistory searchQuery={searchQuery} selectedDate={date} />
        </TabsContent>
        
        <TabsContent value="procrastination">
          <ProcrastinationHistory searchQuery={searchQuery} selectedDate={date} />
        </TabsContent>
      </Tabs>
    </div>
  );
};