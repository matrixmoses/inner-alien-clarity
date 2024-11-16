import { BookOpen, CheckSquare, PieChart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export const Infographic = () => {
  return (
    <div className="relative w-full overflow-hidden bg-white py-20">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#9C8ADE]/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#6EC4A8]/10 blur-3xl"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white shadow-[0_0_8px_#9C8ADE]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4">
        {/* Title */}
        <motion.h2 
          className="mb-16 text-center text-4xl font-bold text-gray-900 md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Transform Anxiety into Action
        </motion.h2>

        {/* Features Grid */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Win Journal */}
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6 rounded-full bg-[#9C8ADE]/10 p-6">
              <BookOpen className="h-12 w-12 text-[#9C8ADE]" />
            </div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">The Win Journal</h3>
            <p className="text-gray-600">Track your daily wins and build momentum with our intuitive journaling system</p>
          </motion.div>

          {/* Guided Routines */}
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="mb-6 rounded-full bg-[#6EC4A8]/10 p-6">
              <CheckSquare className="h-12 w-12 text-[#6EC4A8]" />
            </div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">Guided Routines</h3>
            <p className="text-gray-600">Follow personalized routines designed to maximize your productivity</p>
          </motion.div>

          {/* Progress Tracker */}
          <motion.div 
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="mb-6 rounded-full bg-[#9C8ADE]/10 p-6">
              <PieChart className="h-12 w-12 text-[#9C8ADE]" />
            </div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">Progress Tracker</h3>
            <p className="text-gray-600">Visualize your growth with detailed analytics and insights</p>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button 
            className="bg-[#9C8ADE] px-8 py-6 text-lg font-semibold text-white hover:bg-[#8B79CD] shadow-[0_0_20px_rgba(156,138,222,0.3)] transition-all hover:shadow-[0_0_30px_rgba(156,138,222,0.5)]"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Join the Waitlist Today
          </Button>
        </motion.div>
      </div>
    </div>
  );
};