import { BookOpen, Award, ChartLine } from "lucide-react";
import { EmailForm } from "@/components/EmailForm";
import { Feature } from "@/components/Feature";
import { GradientBackground } from "@/components/GradientBackground";
import { Logo } from "@/components/Logo";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <GradientBackground />
      
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <Logo />
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-5xl">
          <AspectRatio ratio={16 / 9} className="mb-8 overflow-hidden rounded-lg bg-muted">
            <img
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
              alt="Person working on laptop"
              className="object-cover transition-transform hover:scale-105"
            />
          </AspectRatio>
        </div>
        <h1 className="animate-fade-in text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Transform Anxiety into Action
          <span className="text-primary">.</span>
          <br />
          <span className="text-primary">Unlock</span> Your Full Potential
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Join a personalized, science-backed platform trusted by high achievers to conquer
          procrastination, master productivity, and live with clarity.
        </p>
        <div className="mt-10 flex justify-center">
          <EmailForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">What You'll Get</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group">
              <AspectRatio ratio={4 / 3} className="mb-4 overflow-hidden rounded-lg bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="Productivity tracking"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </AspectRatio>
              <Feature
                icon={BookOpen}
                title="The Win Journal"
                description="Celebrate your daily wins to stay motivated and build momentum."
              />
            </div>
            <div className="group">
              <AspectRatio ratio={4 / 3} className="mb-4 overflow-hidden rounded-lg bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="Guided routines"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </AspectRatio>
              <Feature
                icon={Award}
                title="Guided Routines"
                description="Personalized routines to eliminate procrastination and boost productivity."
              />
            </div>
            <div className="group">
              <AspectRatio ratio={4 / 3} className="mb-4 overflow-hidden rounded-lg bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                  alt="Progress tracking"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </AspectRatio>
              <Feature
                icon={ChartLine}
                title="Progress Tracker"
                description="Visualize your growth in real time with detailed analytics."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-5xl">
          <AspectRatio ratio={21 / 9} className="mb-8 overflow-hidden rounded-lg bg-muted">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt="Person achieving goals"
              className="object-cover transition-transform hover:scale-105"
            />
          </AspectRatio>
        </div>
        <h2 className="mb-6 text-3xl font-bold">Don't Miss Out on Transforming Your Life</h2>
        <p className="mx-auto mb-10 max-w-2xl text-gray-600">
          Join our waitlist today and get exclusive early access to premium features, priority
          updates, and special community events.
        </p>
        <div className="flex justify-center">
          <EmailForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="mb-4">TheInnerAlien.co: Empowering High Achievers to Thrive</p>
          <nav className="space-x-4">
            <a href="#" className="hover:text-primary">About</a>
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Contact Us</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Index;