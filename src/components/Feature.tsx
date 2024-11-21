import { LucideIcon } from "lucide-react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  imageSrc?: string;
}

export const Feature = ({ icon: Icon, title, description, imageSrc }: FeatureProps) => {
  return (
    <div className="group relative">
      <div className="rounded-lg border border-primary/20 bg-white p-6 text-center transition-all hover:border-primary hover:shadow-lg">
        <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3 text-primary transition-all group-hover:bg-primary group-hover:text-white">
          <Icon size={24} />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      {imageSrc && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 hidden transform overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:block">
          <img 
            src={imageSrc} 
            alt={title}
            className="h-48 w-full object-cover"
          />
        </div>
      )}
    </div>
  );
};