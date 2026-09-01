"use client";

import { useState } from "react";

const statCards = [
  {
    label: "Total Patients",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: "👥",
    color: "bg-blue-500",
  },
  {
    label: "Active Doctors",
    value: "203",
    change: "+4.2%",
    trend: "up",
    icon: "👨‍⚕️",
    color: "bg-green-500",
  },
  {
    label: "Appointments Today",
    value: "148",
    change: "-2.1%",
    trend: "down",
    icon: "📅",
    color: "bg-orange-500",
  },
  {
    label: "Monthly Revenue",
    value: "$284,500",
    change: "+18.7%",
    trend: "up",
    icon: "💰",
    color: "bg-purple-500",
  },
];

const recentAppointments = [
  { id: "APT-001", patient: "Alice Johnson", doctor: "Dr. Smith", dept: "Cardiology", date: "2024-01-15", time: "09:00 AM", status: "confirmed" },
  { id: "APT-002", patient: "Bob Williams", doctor: "Dr. Patel", dept: "Neurology", date: "2024-01-15", time: "10:30 AM", status: "completed" },
  { id: "APT-003", patient: "Carol Davis", doctor: "Dr. Lee", dept: "Orthopedics", date: "2024-01-15", time: "11:00 AM", status: "pending" },
  { id: "APT-004", patient: "David Brown", doctor: "Dr. Khan", dept: "Pediatrics", date: "2024-01-15", time: "01:00 PM", status: "confirmed" },
  { id: "APT-005", patient: "Eva Martinez", doctor: "Dr. Sharma", dept: "Oncology", date: "2024-01-15", time: "02:30 PM", status: "cancelled" },
  { id: "APT-006", patient: "Frank Wilson", doctor: "Dr. Chen", dept: "Cardiology", date: "2024-01-15", time: "03:00 PM", status: "confirmed" },
  { id: "APT-007", patient: "Grace Taylor", doctor: "Dr. Gupta", dept: "Dermatology", date: "2024-01-15", time: "03:30 PM", status: "pending" },
  { id: "APT-008", patient: "Henry Anderson", doctor: "Dr. Jones", dept: "ENT", date: "2024-01-15", time: "04:00 PM", status: "confirmed" },
  { id: "APT-009", patient: "Ivy Thomas", doctor: "Dr. Singh", dept: "Neurology", date: "2024-01-15", time: "04:30 PM", status: "completed" },
  { id: "APT-010", patient: "Jack Robinson", doctor: "Dr. Patel", dept: "Cardiology", date: "2024-01-15", time: "05:00 PM", status: "confirmed" },
];

const notifications = [
  { text: "New patient registration: Alice Johnson", time: "5 min ago", type: "info" },
  { text: "Dr. Smith completed 3 appointments", time: "15 min ago", type: "success" },
  { text: "Payment received: $2,450 from Bob Williams", time: "30 min ago", type: "success" },
  { text: "Lab results ready for Carol Davis", time: "1 hour ago", type: "info" },
  { text: "Appointment cancelled: Eva Martinez", time: "2 hours ago", type: "warning" },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
};

const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 38000 },
  { month: "Mar", revenue: 51000 },
  { month: "Apr", revenue: 47000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 49000 },
  { month: "Jul", revenue: 58000 },
  { month: "Aug", revenue: 62000 },
  { month: "Sep", revenue: 54000 },
  { month: "Oct", revenue: 67000 },
  { month: "Nov", revenue: 71000 },
  { month: "Dec", revenue: 78000 },
];

const appointmentData = [
  { day: "Mon", count: 28 },
  { day: "Tue", count: 35 },
  { day: "Wed", count: 22 },
  { day: "Thu", count: 40 },
  { day: "Fri", count: 38 },
  { day: "Sat", count: 15 },
  { day: "Sun", count: 0 },
];

const departmentData = [
  { name: "Cardiology", count: 320, color: "bg-red-500" },
  { name: "Neurology", count: 210, color: "bg-purple-500" },
  { name: "Orthopedics", count: 180, color: "bg-blue-500" },
  { name: "Pediatrics", count: 290, color: "bg-green-500" },
  { name: "Oncology", count: 150, color: "bg-orange-500" },
  { name: "Others", count: 130, color: "bg-gray-400" },
];

function MiniBarChart({ data, maxVal }: { data: typeof appointmentData; maxVal: number }) {
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d) => (
        <div key={d.day} className="flex flex-col items-center flex-1 gap-1">
          <div className="text-xs font-medium text-gray-600">{d.count}</div>
          <div
            className="w-full bg-blue-500 rounded-t-md transition-all duration-500"
            style={{ height: `${(d.count / maxVal) * 100}%`, minHeight: d.count > 0 ? "4px" : "0" }}
          />
          <div className="text-xs text-gray-400">{d.day}</div>
        </div>
      ))}
    </div>
  );
}

function LineChart({ data }: { data: typeof revenueData }) {
  const max = Math.max(...data.map((d) => d.revenue));
  const min = Math.min(...data.map((d) => d.revenue));
  const range = max - min;
  const width = 100;
  const height = 60;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.revenue - min) / range) * height;
    return `${x},${y}`;
  });

  return (
    <div className="relative h-40 mt-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,${height} ${points.join(" ")} ${width},${height}`}
          fill="url(#lineGrad)"
        />
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-1">
        {data.map((d) => (
          <span key={d.month}>{d.month}</span>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [filter, setFilter] = useState("all");

  const filteredAppointments = filter === "all"
    ? recentAppointments
    : recentAppointments.filter((a) => a.status === filter);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, Administrator. Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            + New Patient
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center text-2xl text-white shadow-lg`}>
                {card.icon}
              </div>
              <span className={`text-sm font-medium ${card.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {card.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="text-sm text-gray-500 mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600">
              <option>This Year</option>
              <option>Last Year</option>
              <option>Last 3 Years</option>
            </select>
          </div>
          <div className="text-3xl font-bold text-gray-900">$284,500</div>
          <div className="text-sm text-green-600 mb-2">↑ 18.7% from last month</div>
          <LineChart data={revenueData} />
        </div>

        {/* Appointment Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Appointments This Week</h3>
            <span className="text-sm text-gray-500">148 total</span>
          </div>
          <MiniBarChart data={appointmentData} maxVal={45} />
        </div>
      </div>

      {/* Department Distribution + Quick Actions + Notifications */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Department Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Department Distribution</h3>
          <div className="space-y-3">
            {departmentData.map((dept) => (
              <div key={dept.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{dept.name}</span>
                  <span className="font-medium text-gray-900">{dept.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${dept.color} h-2 rounded-full transition-all duration-700`}
                    style={{ width: `${(dept.count / 320) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { icon: "👤", label: "Add New Patient", color: "bg-blue-50 text-blue-600" },
              { icon: "👨‍⚕️", label: "Add New Doctor", color: "bg-green-50 text-green-600" },
              { icon: "📅", label: "Schedule Appointment", color: "bg-purple-50 text-purple-600" },
              { icon: "💊", label: "Manage Pharmacy", color: "bg-orange-50 text-orange-600" },
              { icon: "📊", label: "View Reports", color: "bg-indigo-50 text-indigo-600" },
              { icon: "🏥", label: "Bed Management", color: "bg-rose-50 text-rose-600" },
            ].map((action) => (
              <button
                key={action.label}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-left"
              >
                <span className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-lg`}>
                  {action.icon}
                </span>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notification Feed */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {notifications.map((n, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                  n.type === "success" ? "bg-green-500" : n.type === "warning" ? "bg-yellow-500" : "bg-blue-500"
                }`} />
                <div>
                  <p className="text-sm text-gray-700">{n.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Appointments</h3>
            <div className="flex gap-2">
              {["all", "confirmed", "pending", "completed", "cancelled"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition ${
                    filter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-100">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Doctor</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Date & Time</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{apt.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{apt.patient}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{apt.doctor}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{apt.dept}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{apt.date} {apt.time}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[apt.status]}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                      <button className="text-gray-400 hover:text-gray-600 text-sm">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {filteredAppointments.length} of {recentAppointments.length} appointments</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
