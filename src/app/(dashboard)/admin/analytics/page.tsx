"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Activity,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react";

const keyMetrics = [
  {
    title: "Total Patients",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Appointments Today",
    value: "186",
    change: "+8.2%",
    trend: "up",
    icon: Calendar,
    color: "bg-emerald-500",
  },
  {
    title: "Monthly Revenue",
    value: "$2.4M",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "bg-purple-500",
  },
  {
    title: "Bed Occupancy",
    value: "78%",
    change: "-3.1%",
    trend: "down",
    icon: Activity,
    color: "bg-amber-500",
  },
];

const demographics = [
  { age: "0-18", male: 1200, female: 1100 },
  { age: "19-35", male: 2100, female: 2400 },
  { age: "36-50", male: 1800, female: 2000 },
  { age: "51-65", male: 1500, female: 1700 },
  { age: "65+", male: 900, female: 1100 },
];

const appointmentTrends = [
  { month: "Jan", consultations: 1200, surgeries: 180, followUps: 800 },
  { month: "Feb", consultations: 1350, surgeries: 200, followUps: 850 },
  { month: "Mar", consultations: 1100, surgeries: 160, followUps: 750 },
  { month: "Apr", consultations: 1450, surgeries: 220, followUps: 900 },
  { month: "May", consultations: 1600, surgeries: 250, followUps: 950 },
  { month: "Jun", consultations: 1300, surgeries: 190, followUps: 820 },
];

const revenueData = [
  { department: "Cardiology", revenue: 450000, target: 500000 },
  { department: "Orthopedics", revenue: 380000, target: 400000 },
  { department: "Neurology", revenue: 320000, target: 350000 },
  { department: "Oncology", revenue: 290000, target: 300000 },
  { department: "Pediatrics", revenue: 210000, target: 250000 },
  { department: "General", revenue: 180000, target: 200000 },
];

const departmentPerformance = [
  { name: "Cardiology", patients: 1850, satisfaction: 4.8, waitTime: 15 },
  { name: "Orthopedics", patients: 1420, satisfaction: 4.6, waitTime: 18 },
  { name: "Neurology", patients: 980, satisfaction: 4.7, waitTime: 20 },
  { name: "Oncology", patients: 760, satisfaction: 4.9, waitTime: 25 },
  { name: "Pediatrics", patients: 2100, satisfaction: 4.5, waitTime: 12 },
  { name: "Emergency", patients: 3200, satisfaction: 4.3, waitTime: 8 },
];

const doctorProductivity = [
  { name: "Dr. Sarah Mitchell", specialty: "Cardiology", patients: 342, surgeries: 48, rating: 4.9 },
  { name: "Dr. James Wilson", specialty: "Orthopedics", patients: 298, surgeries: 52, rating: 4.8 },
  { name: "Dr. Emily Chen", specialty: "Neurology", patients: 256, surgeries: 28, rating: 4.7 },
  { name: "Dr. Michael Brown", specialty: "Oncology", patients: 198, surgeries: 35, rating: 4.9 },
  { name: "Dr. Lisa Anderson", specialty: "Pediatrics", patients: 420, surgeries: 0, rating: 4.6 },
  { name: "Dr. David Kim", specialty: "General", patients: 380, surgeries: 15, rating: 4.5 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("monthly");
  const [selectedMetric, setSelectedMetric] = useState("patients");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-500 mt-1">Hospital performance insights and metrics</p>
          </div>
          <div className="flex gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="quarterly">This Quarter</option>
              <option value="yearly">This Year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric) => (
            <div key={metric.title} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <metric.icon className="text-white" size={24} />
                </div>
                <span className={`flex items-center text-sm font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.trend === "up" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-4">{metric.value}</h3>
              <p className="text-gray-500 text-sm">{metric.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Patient Demographics</h2>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span> Male
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-pink-500 rounded-full"></span> Female
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {demographics.map((item) => (
                <div key={item.age} className="flex items-center gap-4">
                  <span className="w-12 text-sm text-gray-600">{item.age}</span>
                  <div className="flex-1 flex gap-2">
                    <div className="h-6 bg-blue-500 rounded" style={{ width: `${(item.male / 3000) * 100}%` }}></div>
                    <div className="h-6 bg-pink-500 rounded" style={{ width: `${(item.female / 3000) * 100}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-500 w-16 text-right">{item.male + item.female}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Appointment Trends</h2>
            <div className="space-y-3">
              {appointmentTrends.map((item) => (
                <div key={item.month} className="grid grid-cols-4 gap-4 items-center">
                  <span className="text-sm font-medium text-gray-700">{item.month}</span>
                  <div className="col-span-3 flex gap-1">
                    <div className="h-5 bg-blue-500 rounded" style={{ width: `${(item.consultations / 2000) * 100}%` }}></div>
                    <div className="h-5 bg-emerald-500 rounded" style={{ width: `${(item.surgeries / 2000) * 100}%` }}></div>
                    <div className="h-5 bg-purple-500 rounded" style={{ width: `${(item.followUps / 2000) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span> Consultations
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-full"></span> Surgeries
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span> Follow-ups
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Analytics by Department</h2>
          <div className="space-y-4">
            {revenueData.map((item) => (
              <div key={item.department} className="flex items-center gap-4">
                <span className="w-28 text-sm font-medium text-gray-700">{item.department}</span>
                <div className="flex-1 relative h-8 bg-gray-100 rounded">
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-500 rounded flex items-center justify-end pr-2"
                    style={{ width: `${(item.revenue / 500000) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">${(item.revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <div
                    className="absolute left-0 top-0 h-full border-2 border-dashed border-gray-400 rounded"
                    style={{ width: `${(item.target / 500000) * 100}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-medium ${item.revenue >= item.target ? "text-green-600" : "text-amber-600"}`}>
                  {((item.revenue / item.target) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Department Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Department</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Patients</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Satisfaction</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Wait Time</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentPerformance.map((dept) => (
                    <tr key={dept.name} className="border-b border-gray-100">
                      <td className="py-3 text-sm font-medium text-gray-900">{dept.name}</td>
                      <td className="py-3 text-sm text-gray-600">{dept.patients.toLocaleString()}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                          {dept.satisfaction} ★
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">{dept.waitTime} min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Doctor Productivity Rankings</h2>
            <div className="space-y-4">
              {doctorProductivity.map((doctor, index) => (
                <div key={doctor.name} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-white ${
                    index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-amber-600" : "bg-gray-300"
                  }`}>
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-sm text-gray-500">{doctor.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{doctor.patients} patients</p>
                    <p className="text-xs text-gray-500">{doctor.surgeries} surgeries • {doctor.rating}★</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
