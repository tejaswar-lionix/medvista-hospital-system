import { cn } from "@/lib/utils";
import {
  Bell,
  Calendar,
  CreditCard,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

type NotificationType = "appointment" | "bill" | "message" | "alert" | "system";

interface NotificationItemProps {
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read?: boolean;
  onClick?: () => void;
}

const typeIcons: Record<NotificationType, React.ReactNode> = {
  appointment: <Calendar className="h-4 w-4" />,
  bill: <CreditCard className="h-4 w-4" />,
  message: <MessageSquare className="h-4 w-4" />,
  alert: <AlertCircle className="h-4 w-4" />,
  system: <Bell className="h-4 w-4" />,
};

const typeColors: Record<NotificationType, string> = {
  appointment: "bg-blue-100 text-blue-600",
  bill: "bg-green-100 text-green-600",
  message: "bg-purple-100 text-purple-600",
  alert: "bg-red-100 text-red-600",
  system: "bg-gray-100 text-gray-600",
};

export function NotificationItem({
  type,
  title,
  message,
  time,
  read = false,
  onClick,
}: NotificationItemProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50",
        !read && "border-l-4 border-l-blue-500 bg-blue-50/30",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          typeColors[type]
        )}
      >
        {typeIcons[type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm", !read && "font-medium")}>{title}</p>
          <span className="shrink-0 text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
          {message}
        </p>
      </div>
    </div>
  );
}
