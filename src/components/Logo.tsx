import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="bg-neutral-white rounded-full p-1">
        <img
          src="/logo.png"
          alt="TheInnerAlien.co Logo"
          className="h-16 w-16 animate-float"
        />
      </div>
      <span className="text-2xl font-bold text-gray-900">TheInnerAlien.co</span>
    </div>
  );
};