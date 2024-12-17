import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { PersistentTimer } from "@/components/PersistentTimer";
import { ClearDataButton } from "./ClearDataButton";

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => Promise<void>;
}

export const Header = ({ isAuthenticated, onLogout }: HeaderProps) => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold">
          TheInnerAlien.co
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated && <PersistentTimer />}
          {isAuthenticated && <ClearDataButton />}
          {isAuthenticated ? (
            <Button 
              variant="ghost" 
              className="flex items-center gap-2"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="ghost" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};