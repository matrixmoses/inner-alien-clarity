import { BookOpen, CheckSquare, LineChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

const Infographic = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#6EC4A8]/10 to-[#9C8ADE]/10 py-20">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-32 w-32 animate-pulse rounded-full bg-[#9C8ADE]/10" />
        <div className="absolute right-1/4 top-3/4 h-24 w-24 animate-pulse rounded-full bg-[#6EC4A8]/10" />
      </div>

      <div className="container relative mx-auto grid max-w-6xl gap-16 px-4">
        {/* Title Section */}
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-[#9C8ADE] to-[#6EC4A8] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Transform Anxiety into Action
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Win Journal Card */}
          <Card className="group relative overflow-hidden border-[#9C8ADE]/20 bg-white/80 p-6 backdrop-blur-sm transition-all hover:border-[#9C8ADE] hover:shadow-lg hover:shadow-[#9C8ADE]/10">
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#9C8ADE]/10 transition-transform group-hover:scale-150" />
            <div className="relative">
              <div className="mb-4 inline-flex rounded-full bg-[#9C8ADE]/10 p-3 text-[#9C8ADE]">
                <BookOpen size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">The Win Journal</h3>
              <p className="text-gray-600">
                Track your daily wins and build momentum with our intuitive journaling system.
              </p>
            </div>
          </Card>

          {/* Guided Routines Card */}
          <Card className="group relative overflow-hidden border-[#6EC4A8]/20 bg-white/80 p-6 backdrop-blur-sm transition-all hover:border-[#6EC4A8] hover:shadow-lg hover:shadow-[#6EC4A8]/10">
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#6EC4A8]/10 transition-transform group-hover:scale-150" />
            <div className="relative">
              <div className="mb-4 inline-flex rounded-full bg-[#6EC4A8]/10 p-3 text-[#6EC4A8]">
                <CheckSquare size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Guided Routines</h3>
              <p className="text-gray-600">
                Follow personalized routines designed to boost your productivity and focus.
              </p>
            </div>
          </Card>

          {/* Progress Tracker Card */}
          <Card className="group relative overflow-hidden border-[#9C8ADE]/20 bg-white/80 p-6 backdrop-blur-sm transition-all hover:border-[#9C8ADE] hover:shadow-lg hover:shadow-[#9C8ADE]/10">
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#9C8ADE]/10 transition-transform group-hover:scale-150" />
            <div className="relative">
              <div className="mb-4 inline-flex rounded-full bg-[#9C8ADE]/10 p-3 text-[#9C8ADE]">
                <LineChart size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Progress Tracker</h3>
              <Progress value={75} className="mb-2" />
              <p className="text-gray-600">
                Visualize your growth with detailed analytics and progress tracking.
              </p>
            </div>
          </Card>
        </div>

        {/* Image Gallery */}
        <div className="mx-auto w-full max-w-4xl space-y-8">
          <Card className="group relative overflow-hidden">
            <div className="aspect-[16/9] w-full">
              <img
                src="/win-journal-preview.png"
                alt="Win Journal Preview"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Card>

          <Card className="group relative overflow-hidden">
            <div className="aspect-[16/9] w-full">
              <img
                src="/guided-routine-preview.png"
                alt="Guided Routine Preview"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Card>

          <Card className="group relative overflow-hidden">
            <div className="aspect-[16/9] w-full">
              <img
                src="/progress-tracker-preview.png"
                alt="Progress Tracker Preview"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-[#9C8ADE] to-[#6EC4A8] p-0.5 transition-all hover:shadow-lg hover:shadow-[#9C8ADE]/20">
            <span className="relative rounded-md bg-white px-6 py-3 text-sm font-medium transition-all group-hover:bg-transparent group-hover:text-white">
              Join the Waitlist Today
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Infographic;