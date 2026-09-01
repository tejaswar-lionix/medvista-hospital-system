import React from "react";
import { ChevronRight } from "lucide-react";

interface ListItemProps {
  title: string;
  subtitle?: string;
  description?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
  badge?: {
    text: string;
    color?: string;
  };
  className?: string;
}

export function ListItem({
  title,
  subtitle,
  description,
  leading,
  trailing,
  onClick,
  badge,
  className = "",
}: ListItemProps) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-lg transition-colors duration-150 ${
        onClick
          ? "hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          : ""
      } ${className}`}
    >
      {leading && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {leading}
        </div>
      )}

      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
          {badge && (
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                badge.color || "bg-gray-100 text-gray-700"
              }`}
            >
              {badge.text}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-gray-500 truncate mt-0.5">{subtitle}</p>
        )}
        {description && (
          <p className="text-xs text-gray-400 truncate mt-0.5">{description}</p>
        )}
      </div>

      {trailing ? (
        <div className="flex-shrink-0">{trailing}</div>
      ) : onClick ? (
        <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
      ) : null}
    </Component>
  );
}
