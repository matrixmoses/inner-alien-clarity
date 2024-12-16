import React from "react";
import { format } from "date-fns";
import { JournalEntry } from "./JournalEntry";

interface JournalEntry {
  id: string;
  type: 'morning' | 'evening';
  content: string;
  date: string;
}

interface JournalEntryGroupProps {
  date: string;
  entries: JournalEntry[];
  onDelete: (id: string) => Promise<void>;
}

export const JournalEntryGroup: React.FC<JournalEntryGroupProps> = ({
  date,
  entries,
  onDelete,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">
        {format(new Date(date), "MMMM d, yyyy")}
      </h3>
      {entries.map((entry) => (
        <JournalEntry key={entry.id} entry={entry} onDelete={onDelete} />
      ))}
    </div>
  );
};