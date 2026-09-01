"use client";

import React from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface FeedbackData {
  category: string;
  currentMonth: number;
  lastMonth: number;
  fullMark: number;
}

const feedbackData: FeedbackData[] = [
  { category: "Staff", currentMonth: 4.5, lastMonth: 4.2, fullMark: 5 },
  { category: "Cleanliness", currentMonth: 4.7, lastMonth: 4.5, fullMark: 5 },
  { category: "Wait Time", currentMonth: 3.8, lastMonth: 3.5, fullMark: 5 },
  { category: "Treatment", currentMonth: 4.8, lastMonth: 4.6, fullMark: 5 },
  { category: "Communication", currentMonth: 4.3, lastMonth: 4.0, fullMark: 5 },
  { category: "Facilities", currentMonth: 4.1, lastMonth: 3.9, fullMark: 5 },
];

const overallRating =
  feedbackData.reduce((sum, item) => sum + item.currentMonth, 0) /
  feedbackData.length;

const previousRating =
  feedbackData.reduce((sum, item) => sum + item.lastMonth, 0) /
  feedbackData.length;

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
          <div key={index} className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">{entry.name}</span>
            </div>
            <span className="font-medium text-gray-900">
              {entry.value.toFixed(1)}/5.0
            </span>
          </div>
        ))}
        <div className="mt-2 border-t border-gray-100 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-600">Difference</span>
            <span
              className={`font-bold ${
                payload[0]?.value > (payload[1]?.value || 0)
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {payload[0]?.value > (payload[1]?.value || 0) ? "+" : ""}
              {((payload[0]?.value || 0) - (payload[1]?.value || 0)).toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const FeedbackChart: React.FC = () => {
  const ratingImprovement = overallRating - previousRating;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Patient Feedback
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Rating distribution by category
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-gray-600">Current Month</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gray-400" />
              <span className="text-gray-600">Last Month</span>
            </div>
          </div>
          <div className="rounded-lg bg-blue-50 px-4 py-2">
            <p className="text-xs text-blue-600">Overall Rating</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-blue-700">
                {overallRating.toFixed(1)}
              </p>
              <span className="text-sm text-blue-600">/5.0</span>
            </div>
            <p
              className={`text-xs ${
                ratingImprovement >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {ratingImprovement >= 0 ? "+" : ""}
              {ratingImprovement.toFixed(1)} from last month
            </p>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={feedbackData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 5]}
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-gray-600">{value}</span>
              )}
            />
            <Radar
              name="Current Month"
              dataKey="currentMonth"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Last Month"
              dataKey="lastMonth"
              stroke="#9ca3af"
              fill="#9ca3af"
              fillOpacity={0.1}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-6 gap-3 border-t border-gray-100 pt-4">
        {feedbackData.map((item) => {
          const improvement = item.currentMonth - item.lastMonth;
          return (
            <div
              key={item.category}
              className="rounded-lg border border-gray-100 p-2 text-center"
            >
              <p className="text-xs text-gray-500">{item.category}</p>
              <p className="text-lg font-bold text-gray-900">
                {item.currentMonth.toFixed(1)}
              </p>
              <p
                className={`text-xs ${
                  improvement >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {improvement >= 0 ? "+" : ""}
                {improvement.toFixed(1)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeedbackChart;
