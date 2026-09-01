"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AppointmentData {
  day: string;
  completed: number;
  cancelled: number;
  pending: number;
}

const weeklyAppointmentData: AppointmentData[] = [
  { day: "Mon", completed: 45, cancelled: 5, pending: 12 },
  { day: "Tue", completed: 52, cancelled: 3, pending: 8 },
  { day: "Wed", completed: 38, cancelled: 7, pending: 15 },
  { day: "Thu", completed: 61, cancelled: 4, pending: 10 },
  { day: "Fri", completed: 55, cancelled: 6, pending: 9 },
  { day: "Sat", completed: 42, cancelled: 2, pending: 14 },
  { day: "Sun", completed: 28, cancelled: 1, pending: 6 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum, entry) => sum + entry.value, 0);
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
            <span className="font-medium text-gray-900">{entry.value}</span>
          </div>
        ))}
        <div className="mt-2 border-t border-gray-100 pt-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-600">Total</span>
            <span className="font-bold text-gray-900">{total}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const AppointmentChart: React.FC = () => {
  const [viewType, setViewType] = useState<"weekly" | "monthly">("weekly");

  const totalCompleted = weeklyAppointmentData.reduce(
    (sum, item) => sum + item.completed,
    0
  );
  const totalCancelled = weeklyAppointmentData.reduce(
    (sum, item) => sum + item.cancelled,
    0
  );
  const totalPending = weeklyAppointmentData.reduce(
    (sum, item) => sum + item.pending,
    0
  );
  const completionRate = (
    (totalCompleted / (totalCompleted + totalCancelled + totalPending)) *
    100
  ).toFixed(1);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Appointment Statistics
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Weekly appointment breakdown
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-gray-600">
                Completed ({totalCompleted})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-gray-600">
                Cancelled ({totalCancelled})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="text-gray-600">Pending ({totalPending})</span>
            </div>
          </div>
          <div className="rounded-lg bg-green-50 px-3 py-1">
            <span className="text-sm font-medium text-green-700">
              {completionRate}% Completion
            </span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyAppointmentData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-gray-600">{value}</span>
              )}
            />
            <Bar
              dataKey="completed"
              name="Completed"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="cancelled"
              name="Cancelled"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="pending"
              name="Pending"
              fill="#eab308"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AppointmentChart;
