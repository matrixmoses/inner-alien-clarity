import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { EmailForm } from "@/components/EmailForm";
import { GradientBackground } from "@/components/GradientBackground";
import { MobileNav } from "@/components/MobileNav";
import { CookieConsent } from "@/components/CookieConsent";
import { ScrollToTop } from "@/components/ScrollToTop";
import KeyFeatures from "@/components/KeyFeatures";
import HowItWorks from "@/components/HowItWorks";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Infographic from "@/components/Infographic";
import { Footer } from "@/components/Footer";
import { LogIn } from "lucide-react";

const Index = () => {
  const scrollToEmailForm = () => {
    const element = document.getElementById('email-form-bottom');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#9C8ADE]/10 to-[#6EC4A8]/10">
      <GradientBackground />
      
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-4 py-6">
        <Logo />
        <div className="flex items-center gap-4">
          <Link to="/blog">
            <Button variant="outline" className="hidden md:inline-flex">
              Blog
            </Button>
          </Link>
          <Link to="/login" className="hidden md:inline-flex">
            <Button variant="outline" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </Link>
          <a 
            href="https://discord.gg/shfZkcHx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
          >
            <Button 
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white transition-colors duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join our Community
            </Button>
          </a>
          <MobileNav />
        </div>
      </header>

      {/* Rest of the components */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="animate-fade-in text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Transform Anxiety into Action
          <span className="text-[#9C8ADE]">.</span>
          <br />
          <span className="text-[#6EC4A8]">Unlock</span> Your Full Potential
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Join a personalized, science-backed platform trusted by high achievers to master
          productivity and live with clarity.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <EmailForm />
          <Button 
            onClick={scrollToEmailForm}
            variant="outline"
            className="w-full border-[#9C8ADE] text-[#9C8ADE] hover:bg-[#9C8ADE] hover:text-white sm:w-auto"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Key Features Section */}
      <KeyFeatures />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Infographic Section */}
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <Infographic />
      </Suspense>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Got Questions? We've Got Answers!</h2>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full divide-y divide-[#9C8ADE]/20">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is TheInnerAlien.co?</AccordionTrigger>
              <AccordionContent>
                A productivity and wellness platform designed to help high achievers manage anxiety, procrastination, and time effectively.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Who is this platform for?</AccordionTrigger>
              <AccordionContent>
                It's for individuals who feel overwhelmed by time and want personalized tools to enhance productivity and focus.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Is the platform confidential?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We prioritize your privacy and provide a secure space for your growth.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How much does it cost?</AccordionTrigger>
              <AccordionContent>
                Early adopters gain free access to premium features during beta. After that, tiered plans will be available to suit your needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I get started?</AccordionTrigger>
              <AccordionContent>
                Join the waitlist by entering your email above. You'll receive exclusive updates and early access to the platform.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="mb-6 text-3xl font-bold text-gray-900">Don't Miss Out on Transforming Your Life</h2>
        <p className="mx-auto mb-10 max-w-2xl text-gray-600">
          Join our waitlist today and get exclusive early access to premium features, priority
          updates, and special community events.
        </p>
        <div id="email-form-bottom" className="flex flex-col items-center gap-4">
          <EmailForm />
          <Button 
            variant="outline"
            className="w-full border-[#9C8ADE] text-[#9C8ADE] hover:bg-[#9C8ADE] hover:text-white sm:w-auto"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to Top
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* UI Elements */}
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
};

export default Index;
