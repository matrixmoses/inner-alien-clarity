import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/MobileNav";

export const Navigation = () => {
  const scrollToEmailForm = () => {
    const element = document.getElementById('email-form-bottom');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="TheInnerAlien.co" className="h-8 w-8" />
            <span className="font-semibold text-lg hidden sm:inline-block">TheInnerAlien.co</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/blog" 
              className="text-gray-600 hover:text-[#9C8ADE] transition-colors"
            >
              Blog
            </Link>
            <Button
              variant="ghost"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-600 hover:text-[#9C8ADE]"
            >
              Back to Top
            </Button>
            <Button
              onClick={scrollToEmailForm}
              className="bg-[#9C8ADE] hover:bg-[#6EC4A8] text-white transition-all"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};