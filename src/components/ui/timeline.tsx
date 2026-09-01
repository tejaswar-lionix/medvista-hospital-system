import { cn } from "@/lib/utils";

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-4 top-0 h-full w-px bg-gray-200" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={item.id} className="relative flex gap-4">
            <div
              className={cn(
                "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100",
                index === 0 && "bg-blue-100 border-blue-200"
              )}
            >
              {item.icon ?? (
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    index === 0 ? "bg-blue-500" : "bg-gray-400"
                  )}
                />
              )}
            </div>

            <div className="flex-1 pb-8">
              <div className="flex items-center gap-2">
                <time className="text-xs text-muted-foreground">
                  {item.date}
                </time>
              </div>
              <h4 className="mt-1 font-medium">{item.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
