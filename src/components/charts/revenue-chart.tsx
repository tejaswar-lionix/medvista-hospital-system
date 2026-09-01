"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RevenueData {
  month: string;
  thisYear: number;
  lastYear: number;
}

const monthlyRevenueData: RevenueData[] = [
  { month: "Jan", thisYear: 45000, lastYear: 38000 },
  { month: "Feb", thisYear: 52000, lastYear: 41000 },
  { month: "Mar", thisYear: 48000, lastYear: 44000 },
  { month: "Apr", thisYear: 61000, lastYear: 47000 },
  { month: "May", thisYear: 55000, lastYear: 50000 },
  { month: "Jun", thisYear: 67000, lastYear: 52000 },
  { month: "Jul", thisYear: 72000, lastYear: 58000 },
  { month: "Aug", thisYear: 69000, lastYear: 55000 },
  { month: "Sep", thisYear: 78000, lastYear: 62000 },
  { month: "Oct", thisYear: 82000, lastYear: 68000 },
  { month: "Nov", thisYear: 88000, lastYear: 71000 },
  { month: "Dec", thisYear: 95000, lastYear: 75000 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
        <p className="mb-2 font-semibold text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-medium text-gray-900">
              ${entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const RevenueChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"yearly" | "quarterly">("yearly");

  const totalThisYear = monthlyRevenueData.reduce(
    (sum, item) => sum + item.thisYear,
    0
  );
  const totalLastYear = monthlyRevenueData.reduce(
    (sum, item) => sum + item.lastYear,
    0
  );
  const growthPercentage = (
    ((totalThisYear - totalLastYear) / totalLastYear) *
    100
  ).toFixed(1);

  const filteredData =
    timeRange === "quarterly"
      ? monthlyRevenueData.slice(0, 3)
      : monthlyRevenueData;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
          <p className="mt-1 text-sm text-gray-500">
            Monthly revenue comparison
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-xl font-bold text-gray-900">
              ${totalThisYear.toLocaleString()}
            </p>
            <p
              className={`text-sm ${
                Number(growthPercentage) >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {Number(growthPercentage) >= 0 ? "+" : ""}
              {growthPercentage}% vs last year
            </p>
          </div>
          <div className="flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setTimeRange("quarterly")}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                timeRange === "quarterly"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Quarterly
            </button>
            <button
              onClick={() => setTimeRange("yearly")}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                timeRange === "yearly"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-gray-600">{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="thisYear"
              name="This Year"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="lastYear"
              name="Last Year"
              stroke="#9ca3af"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "#9ca3af", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
