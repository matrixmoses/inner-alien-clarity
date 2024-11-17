import { ArrowRight, CheckSquare, Users, ChartLine } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: CheckSquare,
      title: "Sign Up",
      description: "Share your challenges and goals",
    },
    {
      icon: ArrowRight,
      title: "Get Resources",
      description: "Access personalized tools and resources",
    },
    {
      icon: ChartLine,
      title: "Track Progress",
      description: "Monitor your growth and engage with our community",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
        How It Works
      </h2>
      <div className="relative">
        {/* Background line connecting the steps */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/20 md:hidden" />
        <div className="hidden md:absolute md:left-0 md:top-1/2 md:block md:h-px md:w-full md:-translate-y-1/2 md:bg-primary/20" />
        
        <div className="relative grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg transition-all group-hover:scale-110">
                  <Icon className="h-8 w-8 text-primary transition-colors group-hover:text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;