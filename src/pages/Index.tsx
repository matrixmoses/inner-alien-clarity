import { Mail, X } from "lucide-react";
import { EmailForm } from "@/components/EmailForm";
import { GradientBackground } from "@/components/GradientBackground";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Infographic from "@/components/Infographic";
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
          <Button 
            onClick={scrollToEmailForm}
            className="hidden md:inline-flex bg-[#9C8ADE] hover:bg-[#6EC4A8] text-white transition-all"
          >
            Get Started
          </Button>
          <MobileNav />
        </div>
      </header>

      {/* Hero Section */}
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
      <footer className="bg-[#9C8ADE]/10 py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">About</h3>
              <p className="text-gray-600">TheInnerAlien.co: Empowering High Achievers to Thrive</p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Contact Us</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:YourInnerAlien@gmail.com" className="hover:text-[#9C8ADE]">
                    YourInnerAlien@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  <a href="https://x.com/MyInnerAlien" target="_blank" rel="noopener noreferrer" className="hover:text-[#9C8ADE]">
                    @MyInnerAlien
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                  </svg>
                  <a href="https://discord.gg/shfZkcHx" target="_blank" rel="noopener noreferrer" className="hover:text-[#9C8ADE]">
                    Join our Discord
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Legal</h3>
              <nav className="space-y-2">
                <Link to="/privacy-policy" className="block hover:text-[#9C8ADE]">Privacy Policy</Link>
                <Link to="/terms-of-service" className="block hover:text-[#9C8ADE]">Terms of Service</Link>
              </nav>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} TheInnerAlien.co. All rights reserved.
          </div>
        </div>
      </footer>

      {/* UI Elements */}
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
};

export default Index;