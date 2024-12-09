import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold">
            TheInnerAlien.co
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/blog">
              <Button variant="ghost">Blog</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6 animate-fade-in">
        {children}
      </main>
    </div>
  );
};