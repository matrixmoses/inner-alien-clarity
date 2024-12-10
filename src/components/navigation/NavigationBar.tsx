import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Notebook, Clock, LayoutDashboard, Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    label: "Journal",
    icon: Notebook,
    href: "/journal",
  },
  {
    label: "Time Box",
    icon: Clock,
    href: "/timebox",
  },
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Procrastination",
    icon: Hourglass,
    href: "/procrastination",
  },
];

export const NavigationBar = () => {
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem("navExpanded");
    return saved ? JSON.parse(saved) : true;
  });
  
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("navExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  return (
    <nav
      className={cn(
        "h-screen bg-[#F4F5F9] border-r border-gray-200 transition-all duration-300 flex flex-col",
        isExpanded ? "w-[200px]" : "w-[60px]"
      )}
    >
      <div className="flex-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 my-1 mx-2 rounded-md transition-colors relative group",
                isActive
                  ? "bg-[#9C8ADE] text-white"
                  : "text-[#333333] hover:bg-[#6EC4A8] hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              <span
                className={cn(
                  "ml-3 transition-opacity",
                  isExpanded ? "opacity-100" : "opacity-0",
                  !isExpanded && "group-hover:opacity-100 absolute left-12 bg-[#6EC4A8] text-white px-2 py-1 rounded whitespace-nowrap"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-4 mx-auto hover:bg-[#6EC4A8] hover:text-white"
      >
        {isExpanded ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </nav>
  );
};