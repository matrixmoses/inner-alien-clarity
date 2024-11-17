import { Award, Users, BookOpen, Gamepad } from "lucide-react";
import { Feature } from "./Feature";

const KeyFeatures = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
        Highlight Key Features
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Feature
          icon={Award}
          title="Personalized Tools"
          description="AI-based systems for managing anxiety and procrastination"
          imageSrc="/personalized-tools.png"
        />
        <Feature
          icon={Users}
          title="Community Support"
          description="A confidential peer-support group to connect with like-minded individuals"
          imageSrc="/community-support.png"
        />
        <Feature
          icon={BookOpen}
          title="Evidence-Based Strategies"
          description="Techniques like CBT, mindfulness, and productivity methods"
          imageSrc="/evidence-based.png"
        />
        <Feature
          icon={Gamepad}
          title="Gamification"
          description="Progress tracking and rewards to keep users motivated"
          imageSrc="/gamification.png"
        />
      </div>
    </section>
  );
};

export default KeyFeatures;