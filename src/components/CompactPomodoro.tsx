import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Timer, Pause, Play, RotateCcw } from "lucide-react";

export const CompactPomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
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
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <Card className="p-6 bg-white shadow-lg">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6 text-primary" />
          <span className="text-4xl font-bold text-gray-900">
            {formatTime(timeLeft)}
          </span>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTimer}
            className="w-12 h-12"
          >
            {isRunning ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={resetTimer}
            className="w-12 h-12"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </Card>
  );
};