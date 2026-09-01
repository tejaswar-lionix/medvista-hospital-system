"use client";

import React, { useState, useEffect } from "react";
import { Clock, User, MapPin, Phone, Video, CheckCircle, Circle } from "lucide-react";

interface ScheduleSlot {
  id: string;
  time: string;
  endTime: string;
  patientName: string;
  type: "in-person" | "video" | "phone";
  status: "completed" | "current" | "upcoming" | "available";
  reason: string;
}

const scheduleData: ScheduleSlot[] = [
  {
    id: "SLOT-001",
    time: "08:00 AM",
    endTime: "08:30 AM",
    patientName: "Alice Cooper",
    type: "in-person",
    status: "completed",
    reason: "Heart Checkup",
  },
  {
    id: "SLOT-002",
    time: "08:30 AM",
    endTime: "09:00 AM",
    patientName: "Bob Williams",
    type: "video",
    status: "completed",
    reason: "Follow-up Consultation",
  },
  {
    id: "SLOT-003",
    time: "09:00 AM",
    endTime: "09:30 AM",
    patientName: "Carol Johnson",
    type: "in-person",
    status: "current",
    reason: "ECG Test Review",
  },
  {
    id: "SLOT-004",
    time: "09:30 AM",
    endTime: "10:00 AM",
    patientName: "",
    type: "in-person",
    status: "available",
    reason: "",
  },
  {
    id: "SLOT-005",
    time: "10:00 AM",
    endTime: "10:30 AM",
    patientName: "David Brown",
    type: "in-person",
    status: "upcoming",
    reason: "Blood Pressure Check",
  },
  {
    id: "SLOT-006",
    time: "10:30 AM",
    endTime: "11:00 AM",
    patientName: "Eva Martinez",
    type: "phone",
    status: "upcoming",
    reason: "Lab Results Discussion",
  },
  {
    id: "SLOT-007",
    time: "11:00 AM",
    endTime: "11:30 AM",
    patientName: "",
    type: "in-person",
    status: "available",
    reason: "",
  },
  {
    id: "SLOT-008",
    time: "11:30 AM",
    endTime: "12:00 PM",
    patientName: "Frank Wilson",
    type: "in-person",
    status: "upcoming",
    reason: "Annual Physical",
  },
  {
    id: "SLOT-009",
    time: "12:00 PM",
    endTime: "01:00 PM",
    patientName: "",
    type: "in-person",
    status: "available",
    reason: "Lunch Break",
  },
  {
    id: "SLOT-010",
    time: "01:00 PM",
    endTime: "01:30 PM",
    patientName: "Grace Taylor",
    type: "in-person",
    status: "upcoming",
    reason: "Post-Surgery Review",
  },
  {
    id: "SLOT-011",
    time: "01:30 PM",
    endTime: "02:00 PM",
    patientName: "Henry Davis",
    type: "video",
    status: "upcoming",
    reason: "Cardiac Rehab Check",
  },
  {
    id: "SLOT-012",
    time: "02:00 PM",
    endTime: "02:30 PM",
    patientName: "",
    type: "in-person",
    status: "available",
    reason: "",
  },
];

const statusConfig: Record<
  string,
  { bg: string; border: string; text: string; icon: React.ReactNode }
> = {
  completed: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-500",
    icon: <CheckCircle className="h-5 w-5 text-gray-400" />,
  },
  current: {
    bg: "bg-blue-50",
    border: "border-blue-300",
    text: "text-blue-700",
    icon: <Clock className="h-5 w-5 text-blue-500" />,
  },
  upcoming: {
    bg: "bg-white",
    border: "border-gray-200",
    text: "text-gray-700",
    icon: <Circle className="h-5 w-5 text-gray-400" />,
  },
  available: {
    bg: "bg-green-50",
    border: "border-green-200 border-dashed",
    text: "text-green-600",
    icon: <span className="block h-5 w-5" />,
  },
};

const typeIcons: Record<string, React.ReactNode> = {
  "in-person": <MapPin className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  phone: <Phone className="h-4 w-4" />,
};

const DoctorScheduleWidget: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [slots] = useState(scheduleData);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const completedCount = slots.filter(
    (slot) => slot.status === "completed"
  ).length;
  const availableCount = slots.filter(
    (slot) => slot.status === "available"
  ).length;
  const upcomingCount = slots.filter(
    (slot) => slot.status === "upcoming"
  ).length;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Today&apos;s Schedule
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Dr. Michael Chen - Cardiology
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Current Time</p>
            <p className="text-lg font-bold text-gray-900">
              {currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-gray-400" />
            <span className="text-gray-600">Completed ({completedCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-gray-600">Current (1)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-gray-300" />
            <span className="text-gray-600">Upcoming ({upcomingCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-gray-600">Available ({availableCount})</span>
          </div>
        </div>
      </div>

      <div className="max-h-[500px] overflow-y-auto">
        {slots.map((slot, index) => (
          <div
            key={slot.id}
            className={`relative border-l-4 ${statusConfig[slot.status].border} ${
              statusConfig[slot.status].bg
            } transition-colors hover:bg-gray-50 ${
              slot.status === "current" ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex items-start gap-4 px-6 py-4">
              <div className="flex-shrink-0 pt-0.5">
                {statusConfig[slot.status].icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {slot.time}
                  </span>
                  <span className="text-xs text-gray-400">
                    - {slot.endTime}
                  </span>
                  {slot.status === "current" && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                      In Progress
                    </span>
                  )}
                  {slot.status === "available" && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Available
                    </span>
                  )}
                </div>

                {slot.patientName ? (
                  <div className="mt-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span
                        className={`font-medium ${
                          slot.status === "completed"
                            ? "text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {slot.patientName}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {slot.reason}
                    </p>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-green-600">
                    Open slot - Click to book
                  </p>
                )}
              </div>

              <div className="flex flex-shrink-0 items-center gap-2">
                <span className="flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-600">
                  {typeIcons[slot.type]}
                  <span className="capitalize">
                    {slot.type.replace("-", " ")}
                  </span>
                </span>
                {slot.status === "current" && (
                  <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700">
                    End Session
                  </button>
                )}
                {slot.status === "upcoming" && (
                  <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200">
                    Start
                  </button>
                )}
                {slot.status === "available" && (
                  <button className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700">
                    Book
                  </button>
                )}
              </div>
            </div>

            {slot.status === "current" && (
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500 animate-pulse" />
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {slots.filter((s) => s.status !== "available").length} of{" "}
            {slots.length} slots scheduled
          </div>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Manage Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorScheduleWidget;
