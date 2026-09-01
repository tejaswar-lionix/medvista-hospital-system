"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Stethoscope,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";

interface StatCard {
  id: string;
  title: string;
  value: string;
  trend: number;
  trendDirection: "up" | "down";
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
}

const defaultStats: StatCard[] = [
  {
    id: "patients",
    title: "Total Patients",
    value: "12,847",
    trend: 12.5,
    trendDirection: "up",
    icon: <Users className="h-6 w-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "from last month",
  },
  {
    id: "doctors",
    title: "Total Doctors",
    value: "156",
    trend: 4.2,
    trendDirection: "up",
    icon: <Stethoscope className="h-6 w-6" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "from last month",
  },
  {
    id: "appointments",
    title: "Today's Appointments",
    value: "84",
    trend: 8.1,
    trendDirection: "up",
    icon: <CalendarCheck className="h-6 w-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "from yesterday",
  },
  {
    id: "revenue",
    title: "Monthly Revenue",
    value: "$284,520",
    trend: 3.7,
    trendDirection: "down",
    icon: <DollarSign className="h-6 w-6" />,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    description: "from last month",
  },
];

const AdminStats: React.FC = () => {
  const [stats, setStats] = useState<StatCard[]>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.log("Using default stats data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-8 w-32 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-200" />
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="mt-3 flex items-center gap-1">
                {stat.trendDirection === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    stat.trendDirection === "up"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.trendDirection === "up" ? "+" : "-"}
                  {stat.trend}%
                </span>
                <span className="text-sm text-gray-500">{stat.description}</span>
              </div>
            </div>
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.bgColor} ${stat.color} transition-transform group-hover:scale-110`}
            >
              {stat.icon}
            </div>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">vs previous period</span>
              <Activity className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
