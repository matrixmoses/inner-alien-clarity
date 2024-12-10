import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Clock,
  LayoutDashboard,
  PauseCircle,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const navItems = [
  { icon: BookOpen, label: "Journal", path: "/journal" },
  { icon: Clock, label: "Time Box", path: "/timebox" },
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: PauseCircle, label: "Procrastination", path: "/procrastination" },
  { icon: History, label: "History", path: "/history" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(
    localStorage.getItem("navExpanded") === "true"
  );
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("navExpanded", String(isExpanded));
  }, [isExpanded]);

  return (
    <nav
      className={cn(
        "h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        isExpanded ? "w-56" : "w-16"
      )}
    >
      <div className="flex-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Tooltip key={item.path} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 my-1",
                      isActive && "bg-[#9C8ADE]/10 text-[#9C8ADE]",
                      !isExpanded && "justify-center"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {isExpanded && <span>{item.label}</span>}
                  </Button>
                </Link>
              </TooltipTrigger>
              {!isExpanded && (
                <TooltipContent side="right">{item.label}</TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </div>
      <Button
        variant="ghost"
        className="mx-2 mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </Button>
    </nav>
  );
};