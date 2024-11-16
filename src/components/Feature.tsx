import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  imageSrc?: string;
}

export const Feature = ({ icon: Icon, title, description, imageSrc }: FeatureProps) => {
  const [showImage, setShowImage] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative">
      <div 
        className="group cursor-pointer rounded-lg border border-primary/20 bg-white p-6 text-center transition-all hover:border-primary hover:shadow-lg"
        onMouseEnter={() => setShowImage(true)}
        onMouseLeave={() => setShowImage(false)}
      >
        <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3 text-primary transition-all group-hover:bg-primary group-hover:text-white">
          <Icon size={24} />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      
      {imageSrc && !imageError && showImage && (
        <div className="absolute left-1/2 top-0 z-50 -translate-x-1/2 -translate-y-full animate-fade-in">
          <div className="mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
            <img 
              src={imageSrc} 
              alt={title} 
              className="h-48 w-80 object-cover rounded-lg"
              onError={() => setImageError(true)}
            />
          </div>
          <div className="mx-auto h-4 w-4 translate-y-[-1px] rotate-45 transform border-r border-b border-gray-200 bg-white" />
        </div>
      )}
    </div>
  );
};