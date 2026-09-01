"use client";

import React from "react";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
  disabled?: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: "underline" | "pills" | "boxed";
  className?: string;
}

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  variant = "underline",
  className = "",
}: TabNavigationProps) {
  const variantStyles = {
    underline: {
      container: "border-b border-gray-200",
      tab: "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px",
      active: "border-blue-600 text-blue-600",
      inactive:
        "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
    },
    pills: {
      container: "flex gap-1 p-1 bg-gray-100 rounded-lg",
      tab: "px-4 py-2 text-sm font-medium rounded-md transition-all",
      active: "bg-white text-gray-900 shadow-sm",
      inactive: "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
    },
    boxed: {
      container: "flex gap-2",
      tab: "px-4 py-2 text-sm font-medium border rounded-lg transition-colors",
      active: "bg-blue-50 border-blue-300 text-blue-700",
      inactive:
        "border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`${styles.container} ${className}`} role="tablist">
      <div className={variant === "underline" ? "flex gap-0" : "flex"}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              className={`${styles.tab} ${
                isActive ? styles.active : styles.inactive
              } ${tab.disabled ? "opacity-50 cursor-not-allowed" : ""} flex items-center gap-2`}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
