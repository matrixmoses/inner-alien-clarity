import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Timer, Pause, Play, RotateCcw, Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const PersistentTimer = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("timerState");
    if (saved) {
      const { timeLeft: savedTime } = JSON.parse(saved);
      return savedTime;
    }
    return 25 * 60; // 25 minutes in seconds
  });
  
  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem("timerState");
    if (saved) {
      const { isRunning: savedIsRunning } = JSON.parse(saved);
      return savedIsRunning;
    }
    return false;
  });

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
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Duration (minutes):
            </label>
            <Input
              type="number"
              value={customMinutes}
              onChange={handleCustomTimeChange}
              min="1"
              max="120"
              className="w-full"
            />
            <Button onClick={resetTimer} className="w-full">
              Set Timer
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-1 shadow-sm">
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
  );
};