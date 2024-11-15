import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src="/logo.svg"
        alt="TheInnerAlien.co Logo"
        className="h-12 w-12 animate-float"
      />
      <span className="text-xl font-bold text-gray-900">TheInnerAlien.co</span>
    </div>
  );
};