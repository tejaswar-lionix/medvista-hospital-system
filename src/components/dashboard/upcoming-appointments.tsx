"use client";

import React, { useState } from "react";
import { Clock, User, Stethoscope, Phone, Video, MapPin } from "lucide-react";

interface UpcomingAppointment {
  id: string;
  time: string;
  patientName: string;
  doctorName: string;
  department: string;
  reason: string;
  status: "scheduled" | "confirmed" | "checked-in";
  type: "in-person" | "video" | "phone";
}

const upcomingAppointmentsData: UpcomingAppointment[] = [
  {
    id: "UP-001",
    time: "09:00 AM",
    patientName: "Alice Cooper",
    doctorName: "Dr. Michael Chen",
    department: "Cardiology",
    reason: "Heart Checkup",
    status: "confirmed",
    type: "in-person",
  },
  {
    id: "UP-002",
    time: "09:30 AM",
    patientName: "Bob Williams",
    doctorName: "Dr. Emily Davis",
    department: "Neurology",
    reason: "Migraine Follow-up",
    status: "scheduled",
    type: "video",
  },
  {
    id: "UP-003",
    time: "10:00 AM",
    patientName: "Carol Johnson",
    doctorName: "Dr. Robert Smith",
    department: "Orthopedics",
    reason: "Back Pain Consultation",
    status: "checked-in",
    type: "in-person",
  },
  {
    id: "UP-004",
    time: "10:30 AM",
    patientName: "David Brown",
    doctorName: "Dr. Sarah Lee",
    department: "Pediatrics",
    reason: "Child Vaccination",
    status: "confirmed",
    type: "in-person",
  },
  {
    id: "UP-005",
    time: "11:00 AM",
    patientName: "Eva Martinez",
    doctorName: "Dr. Thomas Anderson",
    department: "Dermatology",
    reason: "Skin Consultation",
    status: "scheduled",
    type: "phone",
  },
  {
    id: "UP-006",
    time: "11:30 AM",
    patientName: "Frank Wilson",
    doctorName: "Dr. Lisa Wang",
    department: "Oncology",
    reason: "Treatment Review",
    status: "confirmed",
    type: "in-person",
  },
  {
    id: "UP-007",
    time: "02:00 PM",
    patientName: "Grace Taylor",
    doctorName: "Dr. James Miller",
    department: "General",
    reason: "Annual Physical",
    status: "scheduled",
    type: "in-person",
  },
  {
    id: "UP-008",
    time: "02:30 PM",
    patientName: "Henry Davis",
    doctorName: "Dr. Michelle Rodriguez",
    department: "Cardiology",
    reason: "ECG Test",
    status: "confirmed",
    type: "in-person",
  },
];

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  scheduled: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-500" },
  confirmed: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  "checked-in": { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
};

const statusLabels: Record<string, string> = {
  scheduled: "Scheduled",
  confirmed: "Confirmed",
  "checked-in": "Checked In",
};

const typeIcons: Record<string, React.ReactNode> = {
  "in-person": <MapPin className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  phone: <Phone className="h-4 w-4" />,
};

const UpcomingAppointments: React.FC = () => {
  const [appointments] = useState(upcomingAppointmentsData);
  const [filter, setFilter] = useState<"all" | "confirmed" | "scheduled" | "checked-in">("all");

  const filteredAppointments =
    filter === "all"
      ? appointments
      : appointments.filter((apt) => apt.status === filter);

  const confirmedCount = appointments.filter(
    (apt) => apt.status === "confirmed"
  ).length;
  const checkedInCount = appointments.filter(
    (apt) => apt.status === "checked-in"
  ).length;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Today&apos;s Upcoming
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {appointments.length} appointments scheduled
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-gray-600">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              {confirmedCount} Confirmed
            </span>
            <span className="flex items-center gap-1 text-gray-600">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {checkedInCount} Checked In
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          {(["all", "confirmed", "scheduled", "checked-in"] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status === "all" ? "All" : statusLabels[status]}
              </button>
            )
          )}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {filteredAppointments.map((appointment, index) => (
          <div
            key={appointment.id}
            className={`flex items-center gap-4 px-6 py-4 transition-colors hover:bg-gray-50 ${
              index !== filteredAppointments.length - 1
                ? "border-b border-gray-100"
                : ""
            }`}
          >
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900">
                  {appointment.time}
                </p>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[appointment.status].bg} ${statusStyles[appointment.status].text}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${statusStyles[appointment.status].dot}`}
                  />
                  {statusLabels[appointment.status]}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-gray-900">
                {appointment.patientName}
              </p>
              <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Stethoscope className="h-3.5 w-3.5" />
                  {appointment.doctorName}
                </span>
                <span>|</span>
                <span>{appointment.reason}</span>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2">
              <span className="flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1 text-xs text-gray-600">
                {typeIcons[appointment.type]}
                <span className="capitalize">
                  {appointment.type.replace("-", " ")}
                </span>
              </span>
              <div className="flex gap-1">
                <button
                  className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                  title="Start Appointment"
                >
                  Start
                </button>
                <button
                  className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
                  title="Reschedule"
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="px-6 py-12 text-center">
          <User className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2 text-sm text-gray-500">
            No appointments found for this filter
          </p>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
