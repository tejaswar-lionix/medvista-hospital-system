"use client";

import { useState } from "react";
import Link from "next/link";

const patientData = {
  id: "PAT001",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  dateOfBirth: "1985-06-15",
  gender: "Male",
  bloodGroup: "O+",
  address: "123 Main Street, Apt 4B, New York, NY 10001",
  emergencyContact: "Jane Doe - +1 (555) 987-6543",
  insuranceProvider: "Blue Cross Blue Shield",
  insuranceId: "BCBS-12345678",
  registrationDate: "2023-01-15",
  photo: null,
};

const medicalHistory = [
  {
    id: "MH001",
    date: "2025-12-10",
    type: "Visit",
    title: "Annual Checkup",
    doctor: "Dr. Sarah Johnson",
    department: "General Medicine",
    description: "Routine annual physical examination. All vitals normal. Blood work ordered.",
    status: "completed",
  },
  {
    id: "MH002",
    date: "2025-11-05",
    type: "Lab Result",
    title: "Blood Work Results",
    doctor: "Dr. Sarah Johnson",
    department: "General Medicine",
    description: "CBC, Lipid Panel, Metabolic Panel. Cholesterol slightly elevated at 210 mg/dL.",
    status: "completed",
  },
  {
    id: "MH003",
    date: "2025-09-20",
    type: "Prescription",
    title: "Antibiotic Course",
    doctor: "Dr. Michael Chen",
    department: "ENT",
    description: "Prescribed Amoxicillin 500mg for 10 days for sinus infection.",
    status: "completed",
  },
  {
    id: "MH004",
    date: "2025-06-15",
    type: "Procedure",
    title: "Dental Cleaning",
    doctor: "Dr. Emily Rodriguez",
    department: "Dental",
    description: "Routine dental cleaning and examination. No cavities detected.",
    status: "completed",
  },
  {
    id: "MH005",
    date: "2025-03-10",
    type: "Visit",
    title: "Flu Treatment",
    doctor: "Dr. James Wilson",
    department: "General Medicine",
    description: "Presented with flu symptoms. Prescribed rest and OTC medications.",
    status: "completed",
  },
];

const appointmentHistory = [
  { id: "APT001", date: "2025-12-10", time: "10:00 AM", doctor: "Dr. Sarah Johnson", department: "General Medicine", status: "completed", type: "Checkup" },
  { id: "APT002", date: "2025-11-05", time: "02:30 PM", doctor: "Dr. Sarah Johnson", department: "General Medicine", status: "completed", type: "Follow-up" },
  { id: "APT003", date: "2025-09-20", time: "11:15 AM", doctor: "Dr. Michael Chen", department: "ENT", status: "completed", type: "Consultation" },
  { id: "APT004", date: "2026-01-15", time: "09:00 AM", doctor: "Dr. Sarah Johnson", department: "General Medicine", status: "upcoming", type: "Follow-up" },
  { id: "APT005", date: "2026-02-01", time: "03:00 PM", doctor: "Dr. Emily Rodriguez", department: "Dermatology", status: "upcoming", type: "Consultation" },
];

const billingSummary = [
  { id: "INV001", date: "2025-12-10", description: "Annual Checkup - Dr. Johnson", amount: 250.0, status: "paid", paidDate: "2025-12-10" },
  { id: "INV002", date: "2025-11-05", description: "Lab Work - Blood Panel", amount: 180.0, status: "paid", paidDate: "2025-11-05" },
  { id: "INV003", date: "2025-09-20", description: "ENT Consultation - Dr. Chen", amount: 200.0, status: "paid", paidDate: "2025-09-20" },
  { id: "INV004", date: "2025-09-20", description: "Prescription - Amoxicillin", amount: 35.0, status: "paid", paidDate: "2025-09-20" },
  { id: "INV005", date: "2026-01-15", description: "Follow-up Visit - Dr. Johnson", amount: 150.0, status: "pending", paidDate: null },
];

const prescriptions = [
  {
    id: "RX001",
    date: "2025-12-10",
    doctor: "Dr. Sarah Johnson",
    medicines: [
      { name: "Vitamin D3", dosage: "1000 IU", frequency: "Once daily", duration: "3 months" },
      { name: "Fish Oil", dosage: "1000mg", frequency: "Once daily", duration: "3 months" },
    ],
    notes: "Continue healthy diet and regular exercise. Follow up in 3 months.",
  },
  {
    id: "RX002",
    date: "2025-09-20",
    doctor: "Dr. Michael Chen",
    medicines: [
      { name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", duration: "10 days" },
      { name: "Pseudoephedrine", dosage: "30mg", frequency: "Every 6 hours", duration: "7 days" },
    ],
    notes: "Complete the full course of antibiotics. Rest and stay hydrated.",
  },
];

export default function PatientDetailPage() {
  const [activeTab, setActiveTab] = useState<"history" | "appointments" | "billing" | "prescriptions">("history");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const totalBilled = billingSummary.reduce((sum, b) => sum + b.amount, 0);
  const totalPaid = billingSummary.filter((b) => b.status === "paid").reduce((sum, b) => sum + b.amount, 0);
  const totalPending = totalBilled - totalPaid;

  const tabs = [
    { key: "history", label: "Medical History" },
    { key: "appointments", label: "Appointments" },
    { key: "billing", label: "Billing" },
    { key: "prescriptions", label: "Prescriptions" },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/admin/patients" className="text-blue-600 hover:text-blue-800 text-sm">
          ← Back to Patients
        </Link>
        <div className="flex justify-between items-start mt-2">
          <h1 className="text-2xl font-bold">Patient Details</h1>
          <div className="flex gap-2">
            <Link
              href={`/admin/patients/edit/${patientData.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              Edit Patient
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Patient Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold flex-shrink-0">
            {patientData.firstName[0]}{patientData.lastName[0]}
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold">{patientData.firstName} {patientData.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Patient ID</p>
              <p className="font-semibold">{patientData.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-semibold">{patientData.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-semibold">{patientData.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Blood Group</p>
              <p className="font-semibold">{patientData.bloodGroup}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold">{patientData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{patientData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Insurance</p>
              <p className="font-semibold">{patientData.insuranceProvider}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Insurance ID</p>
              <p className="font-semibold">{patientData.insuranceId}</p>
            </div>
            <div className="md:col-span-3">
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-semibold">{patientData.address}</p>
            </div>
            <div className="md:col-span-3">
              <p className="text-sm text-gray-500">Emergency Contact</p>
              <p className="font-semibold">{patientData.emergencyContact}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Billed</p>
          <p className="text-2xl font-bold text-gray-900">${totalBilled.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-2xl font-bold text-green-600">${totalPaid.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Pending Amount</p>
          <p className="text-2xl font-bold text-orange-600">${totalPending.toFixed(2)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Medical History Tab */}
          {activeTab === "history" && (
            <div className="space-y-4">
              {medicalHistory.map((entry) => (
                <div key={entry.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                          entry.type === "Visit" ? "bg-blue-100 text-blue-700" :
                          entry.type === "Lab Result" ? "bg-purple-100 text-purple-700" :
                          entry.type === "Prescription" ? "bg-green-100 text-green-700" :
                          "bg-orange-100 text-orange-700"
                        }`}>
                          {entry.type}
                        </span>
                        <h3 className="font-semibold">{entry.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{entry.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {entry.doctor} · {entry.department}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">{entry.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Time</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Doctor</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Department</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Type</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentHistory.map((apt) => (
                    <tr key={apt.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">{apt.date}</td>
                      <td className="py-3 px-2">{apt.time}</td>
                      <td className="py-3 px-2">{apt.doctor}</td>
                      <td className="py-3 px-2">{apt.department}</td>
                      <td className="py-3 px-2">{apt.type}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          apt.status === "completed" ? "bg-green-100 text-green-700" :
                          apt.status === "upcoming" ? "bg-blue-100 text-blue-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Invoice</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Description</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-500">Amount</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billingSummary.map((bill) => (
                    <tr key={bill.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 font-medium">{bill.id}</td>
                      <td className="py-3 px-2">{bill.date}</td>
                      <td className="py-3 px-2">{bill.description}</td>
                      <td className="py-3 px-2 text-right font-medium">${bill.amount.toFixed(2)}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          bill.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {bill.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Prescriptions Tab */}
          {activeTab === "prescriptions" && (
            <div className="space-y-6">
              {prescriptions.map((rx) => (
                <div key={rx.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">Prescription #{rx.id}</h3>
                      <p className="text-sm text-gray-500">{rx.doctor} · {rx.date}</p>
                    </div>
                    <Link
                      href={`/patient/records/${rx.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                  <table className="w-full text-sm mb-3">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium text-gray-500">Medicine</th>
                        <th className="text-left py-2 font-medium text-gray-500">Dosage</th>
                        <th className="text-left py-2 font-medium text-gray-500">Frequency</th>
                        <th className="text-left py-2 font-medium text-gray-500">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rx.medicines.map((med, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-2 font-medium">{med.name}</td>
                          <td className="py-2">{med.dosage}</td>
                          <td className="py-2">{med.frequency}</td>
                          <td className="py-2">{med.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-sm text-gray-600 italic">{rx.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Delete Patient</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {patientData.firstName} {patientData.lastName}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Patient deleted");
                  setShowDeleteModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
