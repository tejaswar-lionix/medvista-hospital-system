"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DepartmentData {
  name: string;
  value: number;
  color: string;
}

const departmentData: DepartmentData[] = [
  { name: "Cardiology", value: 1250, color: "#ef4444" },
  { name: "Orthopedics", value: 980, color: "#f97316" },
  { name: "Neurology", value: 820, color: "#eab308" },
  { name: "Pediatrics", value: 1100, color: "#22c55e" },
  { name: "Oncology", value: 650, color: "#3b82f6" },
  { name: "Emergency", value: 1400, color: "#8b5cf6" },
  { name: "General", value: 1550, color: "#ec4899" },
  { name: "Dermatology", value: 420, color: "#14b8a6" },
];

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
}

const renderCustomLabel: React.FC<CustomLabelProps> = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.08) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: DepartmentData }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = departmentData.reduce((sum, item) => sum + item.value, 0);
    const percentage = ((data.value / total) * 100).toFixed(1);

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <p className="font-semibold text-gray-800">{data.name}</p>
        </div>
        <div className="mt-2 space-y-1 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Patients:</span>
            <span className="font-medium text-gray-900">
              {data.value.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Share:</span>
            <span className="font-medium text-gray-900">{percentage}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const DepartmentChart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const totalPatients = departmentData.reduce(
    (sum, item) => sum + item.value,
    0
  );
  const maxDepartment = departmentData.reduce((max, item) =>
    item.value > max.value ? item : max
  );

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Department Distribution
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Patients per department
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Patients</p>
          <p className="text-xl font-bold text-gray-900">
            {totalPatients.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Busiest:{" "}
            <span className="font-medium" style={{ color: maxDepartment.color }}>
              {maxDepartment.name}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="h-80 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={120}
                innerRadius={60}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                animationBegin={0}
                animationDuration={800}
              >
                {departmentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={entry.color}
                    strokeWidth={activeIndex === index ? 3 : 1}
                    style={{
                      filter:
                        activeIndex === index
                          ? "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15))"
                          : "none",
                      opacity: activeIndex !== undefined && activeIndex !== index ? 0.6 : 1,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                formatter={(value) => (
                  <span className="text-sm text-gray-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3 border-t border-gray-100 pt-4">
        {departmentData.slice(0, 4).map((dept) => (
          <div
            key={dept.name}
            className="rounded-lg border border-gray-100 p-3"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: dept.color }}
              />
              <span className="text-xs text-gray-600">{dept.name}</span>
            </div>
            <p className="mt-1 text-lg font-bold text-gray-900">
              {dept.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentChart;
