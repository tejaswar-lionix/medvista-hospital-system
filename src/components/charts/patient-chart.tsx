"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PatientData {
  month: string;
  newPatients: number;
  returningPatients: number;
}

const monthlyPatientData: PatientData[] = [
  { month: "Jan", newPatients: 120, returningPatients: 340 },
  { month: "Feb", newPatients: 145, returningPatients: 365 },
  { month: "Mar", newPatients: 132, returningPatients: 380 },
  { month: "Apr", newPatients: 168, returningPatients: 410 },
  { month: "May", newPatients: 155, returningPatients: 425 },
  { month: "Jun", newPatients: 189, returningPatients: 450 },
  { month: "Jul", newPatients: 201, returningPatients: 475 },
  { month: "Aug", newPatients: 195, returningPatients: 460 },
  { month: "Sep", newPatients: 220, returningPatients: 490 },
  { month: "Oct", newPatients: 235, returningPatients: 510 },
  { month: "Nov", newPatients: 248, returningPatients: 525 },
  { month: "Dec", newPatients: 265, returningPatients: 550 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
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

const PatientChart: React.FC = () => {
  const [metric, setMetric] = useState<"all" | "new" | "returning">("all");

  const totalNewPatients = monthlyPatientData.reduce(
    (sum, item) => sum + item.newPatients,
    0
  );
  const totalReturningPatients = monthlyPatientData.reduce(
    (sum, item) => sum + item.returningPatients,
    0
  );
  const totalPatients = totalNewPatients + totalReturningPatients;

  const avgNewPerMonth = Math.round(totalNewPatients / 12);
  const avgReturningPerMonth = Math.round(totalReturningPatients / 12);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Patient Growth
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Monthly patient registration trends
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-blue-50 px-3 py-2">
              <p className="text-blue-600">New Patients</p>
              <p className="text-lg font-bold text-blue-700">
                {totalNewPatients.toLocaleString()}
              </p>
              <p className="text-xs text-blue-500">
                ~{avgNewPerMonth}/month avg
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 px-3 py-2">
              <p className="text-purple-600">Returning</p>
              <p className="text-lg font-bold text-purple-700">
                {totalReturningPatients.toLocaleString()}
              </p>
              <p className="text-xs text-purple-500">
                ~{avgReturningPerMonth}/month avg
              </p>
            </div>
          </div>
          <div className="flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setMetric("all")}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                metric === "all"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setMetric("new")}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                metric === "new"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              New
            </button>
            <button
              onClick={() => setMetric("returning")}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                metric === "returning"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Returning
            </button>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyPatientData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorNewPatients" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient
                id="colorReturningPatients"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            />
            <Tooltip content={<CustomTooltip />} />
            {(metric === "all" || metric === "new") && (
              <Area
                type="monotone"
                dataKey="newPatients"
                name="New Patients"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorNewPatients)"
              />
            )}
            {(metric === "all" || metric === "returning") && (
              <Area
                type="monotone"
                dataKey="returningPatients"
                name="Returning Patients"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorReturningPatients)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PatientChart;
