import React from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Trash2 } from "lucide-react";

interface JournalEntryProps {
  entry: {
    id: string;
    type: 'morning' | 'evening';
    content: string;
  };
  onDelete: (id: string) => Promise<void>;
}

export const JournalEntry: React.FC<JournalEntryProps> = ({ entry, onDelete }) => {
  return (
    <div className="bg-[#6EC4A8]/10 p-4 rounded-lg space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {entry.type === "morning" ? (
              <Sun className="h-4 w-4 text-[#9C8ADE]" />
            ) : (
              <Moon className="h-4 w-4 text-[#9C8ADE]" />
            )}
            <span className="font-medium capitalize">
              {entry.type} Reflection
            </span>
          </div>
          <p className="whitespace-pre-wrap">{entry.content}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(entry.id)}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};