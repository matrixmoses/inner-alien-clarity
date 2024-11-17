import React from 'react';

export const BlogContent = () => {
  return (
    <article className="prose prose-lg mx-auto max-w-4xl px-4 md:px-0">
      <h1 className="mb-8 text-2xl md:text-4xl font-bold">5 Ways to Overcome Procrastination</h1>
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <span>Published: November 16, 2024</span>
        <span>By: The Inner Alien Team</span>
      </div>

      <div className="mb-8 overflow-hidden rounded-lg">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
          alt="Woman working on laptop, focused and productive"
          className="w-full object-cover"
          style={{ maxHeight: "400px" }}
        />
      </div>

      <p className="lead text-base md:text-lg">
        Procrastination is something we all experience at some point. It's that nagging feeling that keeps us from starting or finishing tasks, even when we know they're important. While it can feel overwhelming, overcoming procrastination is possible with the right strategies.
      </p>

      <h2 className="text-xl md:text-2xl font-bold mt-8">1. Break Tasks into Smaller Steps</h2>
      <p className="text-base md:text-lg">
        One of the main reasons we procrastinate is feeling overwhelmed by the size of a task. Breaking it into smaller, manageable steps makes it less daunting and helps you build momentum.
      </p>

      <h3 className="text-lg md:text-xl font-semibold mt-4">How to Do It:</h3>
      <ul className="list-disc pl-6 text-base md:text-lg">
        <li>Identify the smallest actionable step you can take.</li>
        <li>Focus on completing that step instead of the whole task.</li>
        <li>Celebrate each small win to stay motivated.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold mt-8">2. Use the "2-Minute Rule"</h2>
      <p className="text-base md:text-lg">
        The 2-minute rule states that if a task takes two minutes or less, do it immediately. For larger tasks, spend just two minutes getting started. This approach overcomes the inertia of starting and often leads to working longer.
      </p>

      <h2 className="text-xl md:text-2xl font-bold mt-8">3. Eliminate Distractions</h2>
      <p className="text-base md:text-lg">
        Distractions are procrastination's best friend. Whether it's social media, notifications, or a noisy environment, minimizing distractions can help you focus better.
      </p>

      <h2 className="text-xl md:text-2xl font-bold mt-8">4. Set Realistic Goals and Deadlines</h2>
      <p className="text-base md:text-lg">
        Unrealistic goals can make tasks seem impossible, leading to procrastination. Setting achievable objectives with clear deadlines helps you stay on track.
      </p>

      <h2 className="text-xl md:text-2xl font-bold mt-8">5. Build Accountability</h2>
      <p className="text-base md:text-lg">
        Having someone to hold you accountable can significantly reduce procrastination. When you know someone is checking on your progress, you're more likely to follow through.
      </p>

      <h2 className="text-xl md:text-2xl font-bold mt-8">Final Thoughts</h2>
      <p className="text-base md:text-lg">
        Procrastination doesn't mean you're lazy or incapable; it's often a sign of being overwhelmed or afraid of failure. By applying these strategies, you can build momentum, regain focus, and take meaningful steps toward your goals.
      </p>
      <p className="font-semibold mt-4 text-base md:text-lg">
        Start small, experiment with different methods, and remember: progress is better than perfection.
      </p>
    </article>
  );
};