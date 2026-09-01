"use client";

import { useState } from "react";

const doctorProfile = {
  name: "Dr. Sarah Smith",
  specialty: "Cardiology",
  department: "Cardiology Department",
  avatar: "SS",
  todayStats: {
    appointments: 12,
    patients: 8,
    prescriptions: 15,
    surgeries: 2,
  },
};

const schedule = [
  { time: "08:00 AM", patient: "Alice Johnson", type: "Consultation", status: "completed" },
  { time: "09:00 AM", patient: "Bob Williams", type: "Follow-up", status: "completed" },
  { time: "10:00 AM", patient: "Carol Davis", type: "Check-up", status: "completed" },
  { time: "11:00 AM", patient: "David Brown", type: "Consultation", status: "active" },
  { time: "12:00 PM", patient: "Eva Martinez", type: "Review Results", status: "upcoming" },
  { time: "01:00 PM", patient: "Lunch Break", type: "break", status: "upcoming" },
  { time: "02:00 PM", patient: "Frank Wilson", type: "Surgery Pre-op", status: "upcoming" },
  { time: "03:00 PM", patient: "Grace Taylor", type: "Consultation", status: "upcoming" },
  { time: "04:00 PM", patient: "Henry Anderson", type: "Follow-up", status: "upcoming" },
  { time: "05:00 PM", patient: "Ivy Thomas", type: "Emergency", status: "upcoming" },
];

const recentPatients = [
  { name: "Alice Johnson", age: 45, condition: "Hypertension", lastVisit: "Today", status: "stable" },
  { name: "Bob Williams", age: 62, condition: "Post-Op Recovery", lastVisit: "Today", status: "improving" },
  { name: "Carol Davis", age: 38, condition: "Arrhythmia", lastVisit: "Today", status: "stable" },
  { name: "David Brown", age: 55, condition: "Chest Pain", lastVisit: "Today", status: "critical" },
  { name: "Eva Martinez", age: 29, condition: "Heart Murmur", lastVisit: "Yesterday", status: "stable" },
];

const upcomingAppointments = [
  { patient: "Eva Martinez", time: "12:00 PM", type: "Review Results", date: "Today" },
  { patient: "Frank Wilson", time: "02:00 PM", type: "Surgery Pre-op", date: "Today" },
  { patient: "Grace Taylor", time: "03:00 PM", type: "Consultation", date: "Today" },
  { patient: "Henry Anderson", time: "04:00 PM", type: "Follow-up", date: "Today" },
  { patient: "Jack Robinson", time: "09:00 AM", type: "Consultation", date: "Tomorrow" },
  { patient: "Karen White", time: "10:30 AM", type: "Check-up", date: "Tomorrow" },
  { patient: "Leo Harris", time: "11:00 AM", type: "Follow-up", date: "Tomorrow" },
];

const statusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  active: "bg-blue-100 text-blue-700",
  upcoming: "bg-gray-100 text-gray-600",
  break: "bg-yellow-100 text-yellow-700",
};

const patientStatusColors: Record<string, string> = {
  stable: "bg-green-100 text-green-700",
  improving: "bg-blue-100 text-blue-700",
  critical: "bg-red-100 text-red-700",
};

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState<"schedule" | "patients" | "appointments">("schedule");

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Good Morning, {doctorProfile.name}!</h1>
            <p className="text-blue-100">
              {doctorProfile.specialty} &bull; {doctorProfile.department}
            </p>
            <p className="text-blue-200 text-sm mt-2">You have 12 appointments scheduled for today.</p>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="text-center bg-white/10 rounded-xl px-6 py-4">
              <div className="text-3xl font-bold">{doctorProfile.todayStats.appointments}</div>
              <div className="text-sm text-blue-200">Appointments</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl px-6 py-4">
              <div className="text-3xl font-bold">{doctorProfile.todayStats.surgeries}</div>
              <div className="text-sm text-blue-200">Surgeries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Appointments", value: doctorProfile.todayStats.appointments, icon: "📅", color: "bg-blue-50 text-blue-600" },
          { label: "Patients Seen", value: doctorProfile.todayStats.patients, icon: "👥", color: "bg-green-50 text-green-600" },
          { label: "Prescriptions", value: doctorProfile.todayStats.prescriptions, icon: "💊", color: "bg-purple-50 text-purple-600" },
          { label: "Surgeries", value: doctorProfile.todayStats.surgeries, icon: "🏥", color: "bg-orange-50 text-orange-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-lg`}>
                {stat.icon}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100">
          {(["schedule", "patients", "appointments"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize transition border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Today&apos;s Schedule</h3>
              <span className="text-sm text-gray-500">January 15, 2024</span>
            </div>
            <div className="space-y-2">
              {schedule.map((slot) => (
                <div
                  key={slot.time}
                  className={`flex items-center gap-4 p-4 rounded-xl transition ${
                    slot.status === "active"
                      ? "bg-blue-50 border-2 border-blue-200"
                      : slot.status === "completed"
                      ? "bg-gray-50 opacity-60"
                      : "hover:bg-gray-50 border border-gray-100"
                  }`}
                >
                  <div className="w-20 text-sm font-medium text-gray-600">{slot.time}</div>
                  <div className="w-px h-10 bg-gray-200" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{slot.patient}</div>
                    <div className="text-sm text-gray-500">{slot.type}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[slot.status]}`}>
                    {slot.status}
                  </span>
                  {slot.status === "active" && (
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                      Start Consultation
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === "patients" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Recent Patients</h3>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-800">View All Patients</button>
            </div>
            <div className="space-y-3">
              {recentPatients.map((patient) => (
                <div key={patient.name} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {patient.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{patient.name}</div>
                    <div className="text-sm text-gray-500">Age: {patient.age} &bull; {patient.condition}</div>
                  </div>
                  <div className="text-sm text-gray-400">{patient.lastVisit}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${patientStatusColors[patient.status]}`}>
                    {patient.status}
                  </span>
                  <div className="flex gap-2">
                    <button className="text-sm text-blue-600 hover:text-blue-800">View</button>
                    <button className="text-sm text-gray-400 hover:text-gray-600">Record</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Upcoming Appointments</h3>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
                + Schedule Appointment
              </button>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((apt, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {apt.patient.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{apt.patient}</div>
                    <div className="text-sm text-gray-500">{apt.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{apt.time}</div>
                    <div className="text-xs text-gray-400">{apt.date}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm text-blue-600 hover:text-blue-800">Reschedule</button>
                    <button className="text-sm text-red-500 hover:text-red-700">Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { icon: "➕", label: "Add Medical Record", color: "bg-blue-50 text-blue-600" },
              { icon: "💊", label: "Write Prescription", color: "bg-green-50 text-green-600" },
              { icon: "🔬", label: "Order Lab Test", color: "bg-purple-50 text-purple-600" },
              { icon: "📅", label: "View Full Schedule", color: "bg-orange-50 text-orange-600" },
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

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Today&apos;s Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Appointments Completed</span>
                <span className="font-medium text-gray-900">3/12</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "25%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Patients Consulted</span>
                <span className="font-medium text-gray-900">8/12</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "67%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Prescriptions Written</span>
                <span className="font-medium text-gray-900">15</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "75%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Department News</h3>
          <div className="space-y-3">
            {[
              { title: "New cardiac equipment installed", date: "2 days ago", type: "update" },
              { title: "Dr. Khan joined the team", date: "1 week ago", type: "team" },
              { title: "Monthly review meeting Friday", date: "3 days ago", type: "event" },
            ].map((news, i) => (
              <div key={i} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                <div className="text-sm font-medium text-gray-900">{news.title}</div>
                <div className="text-xs text-gray-400 mt-1">{news.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
