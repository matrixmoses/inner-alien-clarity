import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

export const MobileNav = () => {
  const scrollToEmailForm = () => {
    const element = document.getElementById('email-form-bottom');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-4">
            <Link to="/blog">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                Blog
              </Button>
            </Link>
            <a 
              href="https://discord.gg/shfZkcHx" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                Discord Community
              </Button>
            </a>
            <Button
              variant="ghost"
              onClick={scrollToEmailForm}
              className="w-full justify-start"
            >
              Get Started
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full justify-start"
            >
              Back to Top
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};