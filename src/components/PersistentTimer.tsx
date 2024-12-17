import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Timer, Pause, Play, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const PersistentTimer = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("timerState");
    if (saved) {
      const { timeLeft: savedTime } = JSON.parse(saved);
      return savedTime;
    }
    return 25 * 60;
  });
  
  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem("timerState");
    if (saved) {
      const { isRunning: savedIsRunning } = JSON.parse(saved);
      return savedIsRunning;
    }
    return false;
  });

  const [showCustomTime, setShowCustomTime] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("25");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem(
            "timerState",
            JSON.stringify({ timeLeft: newTime, isRunning: true })
          );
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      localStorage.setItem(
        "timerState",
        JSON.stringify({ timeLeft: 0, isRunning: false })
      );
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    localStorage.setItem(
      "timerState",
      JSON.stringify({ timeLeft, isRunning: !isRunning })
    );
  };

  const resetTimer = () => {
    const minutes = parseInt(customMinutes) || 25;
    setTimeLeft(minutes * 60);
    setIsRunning(false);
    setShowCustomTime(false);
    localStorage.setItem(
      "timerState",
      JSON.stringify({ timeLeft: minutes * 60, isRunning: false })
    );
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && parseInt(value) <= 120) {
      setCustomMinutes(value);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <div 
          className="flex items-center gap-2 bg-white rounded-lg px-3 py-1 shadow-sm cursor-pointer"
          onClick={() => setShowCustomTime(true)}
        >
          <Timer className="h-4 w-4 text-primary" />
          <span className="text-lg font-medium">
            {formatTime(timeLeft)}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTimer}
          className="hover:bg-primary/10"
        >
          {isRunning ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={resetTimer}
          className="hover:bg-primary/10"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={showCustomTime} onOpenChange={setShowCustomTime}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Timer Duration</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Input
                type="number"
                value={customMinutes}
                onChange={handleCustomTimeChange}
                min="1"
                max="120"
                className="w-full"
                placeholder="Enter minutes (1-120)"
              />
              <Button onClick={resetTimer} className="w-full">
                Set Timer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};