import { LucideIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  imageSrc?: string;
}

export const Feature = ({ icon: Icon, title, description, imageSrc }: FeatureProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="group relative cursor-pointer rounded-lg border border-primary/20 bg-white p-6 text-center transition-all hover:border-primary hover:shadow-lg">
          <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3 text-primary transition-all group-hover:bg-primary group-hover:text-white">
            <Icon size={24} />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </HoverCardTrigger>
      {imageSrc && !imageError && (
        <HoverCardContent className="w-80">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img 
              src={imageSrc} 
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              onError={() => setImageError(true)}
            />
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};