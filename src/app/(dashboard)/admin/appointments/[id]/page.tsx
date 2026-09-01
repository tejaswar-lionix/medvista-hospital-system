"use client";

import { useState } from "react";
import Link from "next/link";

const appointmentData = {
  id: "APT001",
  date: "2026-01-15",
  time: "10:00 AM",
  duration: "30 minutes",
  type: "Follow-up",
  status: "confirmed",
  reason: "Follow-up for cholesterol management and review of recent blood work results",
  notes: "Patient requested morning appointment. Bring latest lab results.",
  createdAt: "2025-12-28",
};

const patientInfo = {
  id: "PAT001",
  name: "John Doe",
  age: 40,
  gender: "Male",
  phone: "+1 (555) 123-4567",
  email: "john.doe@email.com",
  bloodGroup: "O+",
  insuranceProvider: "Blue Cross Blue Shield",
  photo: null,
};

const doctorInfo = {
  id: "DOC001",
  name: "Dr. Sarah Johnson",
  department: "General Medicine",
  designation: "Senior Consultant",
  phone: "+1 (555) 234-5678",
  email: "sarah.johnson@hospital.com",
  consultationFee: 150,
};

const statusTimeline = [
  { status: "Scheduled", date: "2025-12-28", time: "03:45 PM", icon: "📅", description: "Appointment booked by reception" },
  { status: "Confirmed", date: "2025-12-29", time: "09:00 AM", icon: "✅", description: "Confirmation sent via SMS and email" },
  { status: "Reminder Sent", date: "2026-01-14", time: "10:00 AM", icon: "🔔", description: "24-hour reminder sent to patient" },
  { status: "Checked In", date: "2026-01-15", time: "09:45 AM", icon: "🏥", description: "Patient arrived and checked in at reception" },
  { status: "In Progress", date: "2026-01-15", time: "10:05 AM", icon: "👨‍⚕️", description: "Patient called in by doctor" },
];

const medicalRecord = {
  id: "MR001",
  date: "2026-01-15",
  diagnosis: "Hypercholesterolemia - Improved",
  symptoms: ["None reported", "Feeling well overall"],
  vitals: {
    bloodPressure: "128/82 mmHg",
    heartRate: "72 bpm",
    temperature: "98.6°F",
    weight: "178 lbs",
    height: "5'10\"",
    bmi: "25.5",
  },
  notes: "Patient has been following dietary recommendations. LDL cholesterol improved from 160 to 130 mg/dL. Continue current medication and lifestyle modifications.",
  prescriptions: [
    { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily (evening)", duration: "3 months" },
  ],
};

const allStatuses = ["scheduled", "confirmed", "checked-in", "in-progress", "completed", "cancelled", "no-show"];

export default function AppointmentDetailPage() {
  const [currentStatus, setCurrentStatus] = useState(appointmentData.status);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentStatus(newStatus);
    setShowStatusModal(false);
    setIsUpdating(false);
    alert(`Appointment status updated to ${newStatus}`);
  };

  const handleCancel = async () => {
    setIsUpdating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentStatus("cancelled");
    setShowCancelModal(false);
    setIsUpdating(false);
    alert("Appointment cancelled");
  };

  const statusColors: Record<string, string> = {
    scheduled: "bg-blue-100 text-blue-700",
    confirmed: "bg-green-100 text-green-700",
    "checked-in": "bg-purple-100 text-purple-700",
    "in-progress": "bg-yellow-100 text-yellow-700",
    completed: "bg-gray-100 text-gray-700",
    cancelled: "bg-red-100 text-red-700",
    "no-show": "bg-orange-100 text-orange-700",
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/admin/appointments" className="text-blue-600 hover:text-blue-800 text-sm">
          ← Back to Appointments
        </Link>
        <div className="flex justify-between items-start mt-2">
          <div>
            <h1 className="text-2xl font-bold">Appointment #{appointmentData.id}</h1>
            <p className="text-gray-500 text-sm">{appointmentData.date} at {appointmentData.time}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowStatusModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              Update Status
            </button>
            {currentStatus !== "cancelled" && currentStatus !== "completed" && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
              >
                Cancel Appointment
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <span className={`px-4 py-2 text-sm font-semibold rounded-full ${statusColors[currentStatus]}`}>
          {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1).replace("-", " ")}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Appointment Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appointment Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Appointment Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{appointmentData.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{appointmentData.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{appointmentData.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{appointmentData.type}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Reason for Visit</p>
                <p className="font-medium">{appointmentData.reason}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Notes</p>
                <p className="font-medium">{appointmentData.notes}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Booked On</p>
                <p className="font-medium">{appointmentData.createdAt}</p>
              </div>
            </div>
          </div>

          {/* Medical Record */}
          {currentStatus === "completed" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Medical Record</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Diagnosis</p>
                  <p className="font-medium">{medicalRecord.diagnosis}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Symptoms</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {medicalRecord.symptoms.map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Vitals</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Blood Pressure</p>
                      <p className="font-medium text-sm">{medicalRecord.vitals.bloodPressure}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Heart Rate</p>
                      <p className="font-medium text-sm">{medicalRecord.vitals.heartRate}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Temperature</p>
                      <p className="font-medium text-sm">{medicalRecord.vitals.temperature}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Weight</p>
                      <p className="font-medium text-sm">{medicalRecord.vitals.weight}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Height</p>
                      <p className="font-medium text-sm">{medicalRecord.vitals.height}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">BMI</p>
                      <p className="font-medium text-sm">{medicalRecord.vitals.bmi}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Doctor Notes</p>
                  <p className="font-medium">{medicalRecord.notes}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Prescriptions</p>
                  {medicalRecord.prescriptions.map((rx, i) => (
                    <div key={i} className="bg-blue-50 p-3 rounded-md mb-2">
                      <p className="font-medium">{rx.name} - {rx.dosage}</p>
                      <p className="text-sm text-gray-600">{rx.frequency} for {rx.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Patient & Doctor Info */}
        <div className="space-y-6">
          {/* Patient Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {patientInfo.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold">{patientInfo.name}</p>
                <p className="text-sm text-gray-500">{patientInfo.id}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Age/Gender</span>
                <span>{patientInfo.age} / {patientInfo.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Blood Group</span>
                <span>{patientInfo.bloodGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span>{patientInfo.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Insurance</span>
                <span className="text-right text-xs">{patientInfo.insuranceProvider}</span>
              </div>
            </div>
            <Link
              href={`/admin/patients/${patientInfo.id}`}
              className="block mt-4 text-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Full Profile
            </Link>
          </div>

          {/* Doctor Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Doctor Information</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                {doctorInfo.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold">{doctorInfo.name}</p>
                <p className="text-sm text-gray-500">{doctorInfo.designation}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Department</span>
                <span>{doctorInfo.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span>{doctorInfo.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Consultation Fee</span>
                <span>${doctorInfo.consultationFee}</span>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Status Timeline</h2>
            <div className="space-y-4">
              {statusTimeline.map((entry, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">
                      {entry.icon}
                    </div>
                    {index < statusTimeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 mt-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="font-medium text-sm">{entry.status}</p>
                    <p className="text-xs text-gray-500">{entry.date} at {entry.time}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{entry.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Update Appointment Status</h3>
            <div className="space-y-2">
              {allStatuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
                  disabled={isUpdating || status === currentStatus}
                  className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
                    status === currentStatus
                      ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                      : "hover:bg-blue-50 border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <span className="font-medium capitalize">{status.replace("-", " ")}</span>
                  {status === currentStatus && (
                    <span className="ml-2 text-xs text-gray-400">(Current)</span>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowStatusModal(false)}
              className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Cancel Appointment</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Cancellation</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter reason..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleCancel}
                disabled={isUpdating}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isUpdating ? "Cancelling..." : "Confirm Cancellation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
