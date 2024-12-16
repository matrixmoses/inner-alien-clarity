import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sun } from "lucide-react";
import { JournalEntryGroup } from "./journal/JournalEntryGroup";
import { useJournalEntries } from "./journal/useJournalEntries";

interface JournalHistoryProps {
  searchQuery: string;
  selectedDate?: Date;
}

export const JournalHistory = ({ searchQuery, selectedDate }: JournalHistoryProps) => {
  const { groupedEntries, isLoading, handleDelete } = useJournalEntries(searchQuery, selectedDate);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Sun className="h-6 w-6 text-[#9C8ADE]" />
        <h2 className="text-2xl font-semibold">Journal Entries</h2>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {Object.entries(groupedEntries).map(([date, entries]) => (
            <JournalEntryGroup
              key={date}
              date={date}
              entries={entries}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};