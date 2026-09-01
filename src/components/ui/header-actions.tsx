"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface HeaderAction {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
}

interface HeaderActionsProps {
  actions: HeaderAction[];
  className?: string;
}

const variantClasses = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm",
  secondary:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
  ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
};

export function HeaderActions({ actions, className = "" }: HeaderActionsProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            disabled={action.disabled}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 ${
              variantClasses[action.variant || "primary"]
            }`}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
