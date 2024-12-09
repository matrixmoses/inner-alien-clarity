import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sun, Moon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface JournalEntry {
  date: string;
  type: "morning" | "evening";
  content: string;
}

export const Journal = () => {
  const [morningEntry, setMorningEntry] = useState("");
  const [eveningEntry, setEveningEntry] = useState("");
  const { toast } = useToast();

  const handleSave = (type: "morning" | "evening", content: string) => {
    const entries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
    const date = new Date().toISOString().split('T')[0];
    const newEntry: JournalEntry = { date, type, content };
    entries.push(newEntry);
    localStorage.setItem("journalEntries", JSON.stringify(entries));
    toast({ 
      title: "Entry saved!", 
      description: `Your ${type} entry has been saved.`,
      className: "bg-primary text-primary-foreground"
    });
    if (type === "morning") setMorningEntry("");
    else setEveningEntry("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="p-8 bg-secondary shadow-custom transform hover:scale-[1.01] transition-transform duration-200">
        <div className="flex items-center gap-3 mb-4">
          <Sun className="h-6 w-6 text-white" />
          <h2 className="text-2xl font-semibold text-white">Morning Journal</h2>
        </div>
        <p className="text-lg mb-4 italic text-white/90">What good shall I do this day?</p>
        <Textarea
          value={morningEntry}
          onChange={(e) => setMorningEntry(e.target.value)}
          placeholder="Write your morning reflections here..."
          className="min-h-[150px] mb-4 bg-white/90 text-foreground text-lg"
        />
        <Button 
          onClick={() => handleSave("morning", morningEntry)} 
          className="w-full bg-primary hover:bg-primary-hover text-white transition-colors duration-200"
        >
          Save Morning Entry
        </Button>
      </Card>

      <Card className="p-8 bg-secondary shadow-custom transform hover:scale-[1.01] transition-transform duration-200">
        <div className="flex items-center gap-3 mb-4">
          <Moon className="h-6 w-6 text-white" />
          <h2 className="text-2xl font-semibold text-white">Evening Journal</h2>
        </div>
        <p className="text-lg mb-4 italic text-white/90">What good have I done today?</p>
        <Textarea
          value={eveningEntry}
          onChange={(e) => setEveningEntry(e.target.value)}
          placeholder="Write your evening reflections here..."
          className="min-h-[150px] mb-4 bg-white/90 text-foreground text-lg"
        />
        <Button 
          onClick={() => handleSave("evening", eveningEntry)} 
          className="w-full bg-primary hover:bg-primary-hover text-white transition-colors duration-200"
        >
          Save Evening Entry
        </Button>
      </Card>
    </div>
  );
};