import { cn } from "@/lib/utils";

interface SkeletonProps {
  variant?: "text" | "circle" | "rect" | "card";
  className?: string;
}

export function Skeleton({ variant = "text", className }: SkeletonProps) {
  const baseClass = "animate-pulse rounded-md bg-gray-200";

  const variantClasses: Record<string, string> = {
    text: "h-4 w-full",
    circle: "h-10 w-10 rounded-full",
    rect: "h-32 w-full",
    card: "h-48 w-full",
  };

  return (
    <div className={cn(baseClass, variantClasses[variant], className)} />
  );
}
