import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export function QuickActionCard({
  icon,
  title,
  description,
  onClick,
}: QuickActionCardProps) {
  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md hover:border-gray-300",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <CardContent className="flex items-start gap-4 p-5">
        <div className="rounded-lg bg-gray-100 p-2.5 text-gray-600">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
