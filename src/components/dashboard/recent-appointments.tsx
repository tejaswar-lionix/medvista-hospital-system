"use client";

import React, { useState } from "react";
import { Eye, X, Clock, User, Stethoscope, MoreVertical } from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  patientAvatar: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  status: "completed" | "cancelled" | "pending" | "in-progress";
  reason: string;
}

const recentAppointmentsData: Appointment[] = [
  {
    id: "APT-001",
    patientName: "Sarah Johnson",
    patientAvatar: "SJ",
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Cardiology",
    date: "2024-01-15",
    time: "09:00 AM",
    status: "completed",
    reason: "Annual Checkup",
  },
  {
    id: "APT-002",
    patientName: "James Wilson",
    patientAvatar: "JW",
    doctorName: "Dr. Emily Davis",
    doctorSpecialty: "Neurology",
    date: "2024-01-15",
    time: "10:30 AM",
    status: "in-progress",
    reason: "Follow-up Consultation",
  },
  {
    id: "APT-003",
    patientName: "Maria Garcia",
    patientAvatar: "MG",
    doctorName: "Dr. Robert Smith",
    doctorSpecialty: "Orthopedics",
    date: "2024-01-15",
    time: "11:15 AM",
    status: "pending",
    reason: "Knee Pain Evaluation",
  },
  {
    id: "APT-004",
    patientName: "David Brown",
    patientAvatar: "DB",
    doctorName: "Dr. Sarah Lee",
    doctorSpecialty: "Pediatrics",
    date: "2024-01-15",
    time: "01:00 PM",
    status: "pending",
    reason: "Vaccination",
  },
  {
    id: "APT-005",
    patientName: "Jennifer Martinez",
    patientAvatar: "JM",
    doctorName: "Dr. Thomas Anderson",
    doctorSpecialty: "Dermatology",
    date: "2024-01-15",
    time: "02:30 PM",
    status: "cancelled",
    reason: "Skin Allergy",
  },
  {
    id: "APT-006",
    patientName: "Robert Taylor",
    patientAvatar: "RT",
    doctorName: "Dr. Lisa Wang",
    doctorSpecialty: "Oncology",
    date: "2024-01-15",
    time: "03:45 PM",
    status: "pending",
    reason: "Chemotherapy Session",
  },
  {
    id: "APT-007",
    patientName: "Emma Thompson",
    patientAvatar: "ET",
    doctorName: "Dr. James Miller",
    doctorSpecialty: "General",
    date: "2024-01-15",
    time: "04:15 PM",
    status: "pending",
    reason: "General Consultation",
  },
  {
    id: "APT-008",
    patientName: "Christopher Lee",
    patientAvatar: "CL",
    doctorName: "Dr. Michelle Rodriguez",
    doctorSpecialty: "Cardiology",
    date: "2024-01-15",
    time: "05:00 PM",
    status: "pending",
    reason: "Heart Monitor Check",
  },
];

const statusStyles: Record<string, string> = {
  completed: "bg-green-50 text-green-700 border-green-200",
  "in-progress": "bg-blue-50 text-blue-700 border-blue-200",
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const statusLabels: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  pending: "Pending",
  cancelled: "Cancelled",
};

const RecentAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState(recentAppointmentsData);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const handleView = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCancel = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: "cancelled" as const } : apt
      )
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Appointments
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Last 10 appointments
          </p>
        </div>
        <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.slice(0, 10).map((appointment) => (
              <tr
                key={appointment.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600">
                      {appointment.patientAvatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {appointment.patientName}
                      </p>
                      <p className="text-sm text-gray-500">{appointment.id}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.doctorName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointment.doctorSpecialty}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <p className="text-sm text-gray-900">{appointment.date}</p>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {appointment.time}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[appointment.status]}`}
                  >
                    {statusLabels[appointment.status]}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleView(appointment)}
                      className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {appointment.status !== "cancelled" &&
                      appointment.status !== "completed" && (
                        <button
                          onClick={() => handleCancel(appointment.id)}
                          className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          title="Cancel Appointment"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    <button
                      className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                      title="More Options"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAppointment && (
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                {selectedAppointment.patientName}
              </p>
              <p className="text-sm text-gray-500">
                {selectedAppointment.reason}
              </p>
            </div>
            <button
              onClick={() => setSelectedAppointment(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentAppointments;
