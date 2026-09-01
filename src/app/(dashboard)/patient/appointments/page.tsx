"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "upcoming" | "past" | "cancelled";

const appointments = {
  upcoming: [
    {
      id: 1,
      doctor: "Dr. Sarah Mitchell",
      department: "Cardiology",
      date: "2026-09-05",
      time: "10:30 AM",
      location: "Building A, Room 204",
      status: "confirmed",
    },
    {
      id: 2,
      doctor: "Dr. James Wilson",
      department: "General Medicine",
      date: "2026-09-12",
      time: "2:00 PM",
      location: "Building B, Room 101",
      status: "confirmed",
    },
    {
      id: 3,
      doctor: "Dr. Emily Carter",
      department: "Dermatology",
      date: "2026-09-18",
      time: "11:00 AM",
      location: "Building A, Room 305",
      status: "pending",
    },
  ],
  past: [
    {
      id: 4,
      doctor: "Dr. Sarah Mitchell",
      department: "Cardiology",
      date: "2026-08-15",
      time: "10:30 AM",
      location: "Building A, Room 204",
      status: "completed",
    },
    {
      id: 5,
      doctor: "Dr. Michael Brown",
      department: "Orthopedics",
      date: "2026-07-22",
      time: "3:30 PM",
      location: "Building C, Room 102",
      status: "completed",
    },
  ],
  cancelled: [
    {
      id: 6,
      doctor: "Dr. Emily Carter",
      department: "Dermatology",
      date: "2026-08-01",
      time: "9:00 AM",
      location: "Building A, Room 305",
      status: "cancelled",
    },
  ],
};

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  const handleCancel = (id: number) => {
    setCancellingId(id);
  };

  const confirmCancel = (id: number) => {
    alert(`Appointment ${id} has been cancelled.`);
    setCancellingId(null);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "upcoming", label: "Upcoming" },
    { key: "past", label: "Past" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        <Link
          href="/patient/appointments/book"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Book New
        </Link>
      </div>

      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label} ({appointments[tab.key].length})
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {appointments[activeTab].map((appt) => (
          <div
            key={appt.id}
            className="bg-white border border-gray-200 rounded-lg p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                  {appt.doctor.split(" ").pop()?.[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{appt.doctor}</p>
                  <p className="text-sm text-gray-500">{appt.department}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>
                      {new Date(appt.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>{appt.time}</span>
                    <span>{appt.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    appt.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : appt.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : appt.status === "completed"
                      ? "bg-gray-100 text-gray-500"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {appt.status}
                </span>
                {activeTab === "upcoming" && (
                  <div className="flex gap-2 mt-1">
                    <button className="text-sm text-blue-600 hover:text-blue-700 underline">
                      Reschedule
                    </button>
                    {cancellingId === appt.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => confirmCancel(appt.id)}
                          className="text-sm text-red-600 font-medium"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setCancellingId(null)}
                          className="text-sm text-gray-500"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCancel(appt.id)}
                        className="text-sm text-red-500 hover:text-red-600 underline"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {appointments[activeTab].length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No {activeTab} appointments
          </div>
        )}
      </div>
    </div>
  );
}
