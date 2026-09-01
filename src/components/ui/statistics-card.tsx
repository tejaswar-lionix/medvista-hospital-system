import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatisticsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  chart?: React.ReactNode;
  icon?: LucideIcon;
  iconColor?: string;
  period?: string;
  className?: string;
}

export function StatisticsCard({
  title,
  value,
  change,
  chart,
  icon: Icon,
  iconColor = "text-blue-600",
  period = "vs last month",
  className = "",
}: StatisticsCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <span
                className={`flex items-center text-sm font-medium ${
                  change.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {change.isPositive ? (
                  <TrendingUp className="h-4 w-4 mr-0.5" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-0.5" />
                )}
                {change.isPositive ? "+" : ""}
                {change.value}%
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">{period}</p>
        </div>

        {Icon && (
          <div className={`${iconColor} bg-opacity-10 p-3 rounded-lg bg-current`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
        )}
      </div>

      {chart && <div className="mt-4 h-24">{chart}</div>}
    </div>
  );
}
