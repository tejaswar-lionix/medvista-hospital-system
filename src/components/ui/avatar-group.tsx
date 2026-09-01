import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarItem {
  src?: string;
  alt?: string;
  fallback: string;
}

interface AvatarGroupProps {
  avatars: AvatarItem[];
  max?: number;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function AvatarGroup({
  avatars,
  max = 3,
  size = "md",
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const overflowCount = avatars.length - max;

  return (
    <div className="flex items-center">
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          className={cn(
            sizeClasses[size],
            "border-2 border-white -ml-2 first:ml-0"
          )}
          style={{ zIndex: max - index }}
        >
          <AvatarImage src={avatar.src} alt={avatar.alt} />
          <AvatarFallback className="bg-gray-200 text-gray-600">
            {avatar.fallback}
          </AvatarFallback>
        </Avatar>
      ))}

      {overflowCount > 0 && (
        <Avatar
          className={cn(
            sizeClasses[size],
            "border-2 border-white -ml-2 bg-gray-100"
          )}
          style={{ zIndex: 0 }}
        >
          <AvatarFallback className="bg-gray-200 text-gray-600 font-medium">
            +{overflowCount}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
