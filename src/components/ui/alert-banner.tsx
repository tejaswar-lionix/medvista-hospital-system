"use client";

import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type AlertType = "info" | "success" | "warning" | "error";

interface AlertBannerProps {
  type: AlertType;
  title: string;
  description?: string;
  onDismiss?: () => void;
}

const alertConfig: Record<
  AlertType,
  {
    icon: React.ReactNode;
    className: string;
  }
> = {
  info: {
    icon: <Info className="h-4 w-4" />,
    className: "bg-blue-50 border-blue-200 text-blue-800",
  },
  success: {
    icon: <CheckCircle className="h-4 w-4" />,
    className: "bg-green-50 border-green-200 text-green-800",
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4" />,
    className: "bg-yellow-50 border-yellow-200 text-yellow-800",
  },
  error: {
    icon: <AlertCircle className="h-4 w-4" />,
    className: "bg-red-50 border-red-200 text-red-800",
  },
};

export function AlertBanner({
  type,
  title,
  description,
  onDismiss,
}: AlertBannerProps) {
  const config = alertConfig[type];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4",
        config.className
      )}
      role="alert"
    >
      <div className="mt-0.5 shrink-0">{config.icon}</div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        {description && (
          <p className="mt-1 text-sm opacity-80">{description}</p>
        )}
      </div>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0"
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
