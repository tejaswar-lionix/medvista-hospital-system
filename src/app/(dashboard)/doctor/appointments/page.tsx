"use client";

import { useState } from "react";
import Link from "next/link";

type Appointment = {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  time: string;
  date: string;
  status: "completed" | "in-progress" | "scheduled" | "cancelled";
  type: string;
  reason: string;
};

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    patientAge: 34,
    patientGender: "F",
    time: "09:00 AM",
    date: "2026-09-01",
    status: "completed",
    type: "Follow-up",
    reason: "Post-surgery recovery check",
  },
  {
    id: "2",
    patientName: "Michael Chen",
    patientAge: 56,
    patientGender: "M",
    time: "09:30 AM",
    date: "2026-09-01",
    status: "in-progress",
    type: "Consultation",
    reason: "Chronic back pain evaluation",
  },
  {
    id: "3",
    patientName: "Emily Davis",
    patientAge: 28,
    patientGender: "F",
    time: "10:00 AM",
    date: "2026-09-01",
    status: "scheduled",
    type: "Check-up",
    reason: "Annual physical examination",
  },
  {
    id: "4",
    patientName: "James Wilson",
    patientAge: 45,
    patientGender: "M",
    time: "10:30 AM",
    date: "2026-09-01",
    status: "scheduled",
    type: "New Patient",
    reason: "Referred by Dr. Martinez for heart palpitations",
  },
  {
    id: "5",
    patientName: "Maria Garcia",
    patientAge: 62,
    patientGender: "F",
    time: "11:00 AM",
    date: "2026-09-01",
    status: "scheduled",
    type: "Follow-up",
    reason: "Blood work review and medication adjustment",
  },
  {
    id: "6",
    patientName: "Robert Taylor",
    patientAge: 41,
    patientGender: "M",
    time: "02:00 PM",
    date: "2026-09-02",
    status: "scheduled",
    type: "Consultation",
    reason: "Persistent headaches and dizziness",
  },
  {
    id: "7",
    patientName: "Lisa Anderson",
    patientAge: 38,
    patientGender: "F",
    time: "02:30 PM",
    date: "2026-09-02",
    status: "scheduled",
    type: "Follow-up",
    reason: "Diabetes management review",
  },
  {
    id: "8",
    patientName: "David Brown",
    patientAge: 70,
    patientGender: "M",
    time: "03:00 PM",
    date: "2026-09-03",
    status: "scheduled",
    type: "Check-up",
    reason: "Routine cardiac monitoring",
  },
];

type TabType = "all" | "today" | "upcoming" | "completed";

export default function DoctorAppointments() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: { key: TabType; label: string; count: number }[] = [
    {
      key: "all",
      label: "All",
      count: MOCK_APPOINTMENTS.length,
    },
    {
      key: "today",
      label: "Today",
      count: MOCK_APPOINTMENTS.filter((a) => a.date === "2026-09-01").length,
    },
    {
      key: "upcoming",
      label: "Upcoming",
      count: MOCK_APPOINTMENTS.filter(
        (a) => a.date > "2026-09-01" && a.status === "scheduled"
      ).length,
    },
    {
      key: "completed",
      label: "Completed",
      count: MOCK_APPOINTMENTS.filter((a) => a.status === "completed").length,
    },
  ];

  const filteredAppointments = MOCK_APPOINTMENTS.filter((appt) => {
    const matchesSearch = appt.patientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    switch (activeTab) {
      case "today":
        return matchesSearch && appt.date === "2026-09-01";
      case "upcoming":
        return (
          matchesSearch && appt.date > "2026-09-01" && appt.status === "scheduled"
        );
      case "completed":
        return matchesSearch && appt.status === "completed";
      default:
        return matchesSearch;
    }
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "in-progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track your patient appointments
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            <span
              className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                activeTab === tab.key ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by patient name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Appointment List */}
      <div className="space-y-3">
        {filteredAppointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-gray-600">
                    {appt.patientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {appt.patientName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {appt.patientAge}y, {appt.patientGender === "M" ? "Male" : "Female"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{appt.reason}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-500">{appt.date}</span>
                    <span className="text-xs text-gray-500">{appt.time}</span>
                    <span className="text-xs text-gray-400">&middot;</span>
                    <span className="text-xs text-gray-500">{appt.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                    appt.status
                  )}`}
                >
                  {appt.status.replace("-", " ")}
                </span>
                {appt.status !== "completed" && appt.status !== "cancelled" && (
                  <Link
                    href={`/doctor/appointments/${appt.id}`}
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {appt.status === "in-progress" ? "Continue" : "Start"}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No appointments found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
