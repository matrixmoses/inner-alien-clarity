import { LucideIcon } from "lucide-react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const Feature = ({ icon: Icon, title, description }: FeatureProps) => {
  return (
    <div className="group flex flex-col items-center p-6 text-center transition-all hover:transform hover:-translate-y-1">
      <div className="mb-4 rounded-full bg-primary-light p-3 text-primary transition-all group-hover:bg-primary group-hover:text-white">
        <Icon size={24} />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};