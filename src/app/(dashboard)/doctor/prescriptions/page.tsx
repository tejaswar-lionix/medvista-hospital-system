"use client";

import { useState } from "react";

type Prescription = {
  id: string;
  patientName: string;
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedDate: string;
  diagnosis: string;
  status: "active" | "completed" | "discontinued";
};

const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    medicine: "Ibuprofen",
    dosage: "400mg",
    frequency: "Twice daily",
    duration: "14 days",
    prescribedDate: "2026-09-01",
    diagnosis: "Post-surgery pain management",
    status: "active",
  },
  {
    id: "2",
    patientName: "Sarah Johnson",
    medicine: "Amoxicillin",
    dosage: "500mg",
    frequency: "Three times daily",
    duration: "7 days",
    prescribedDate: "2026-09-01",
    diagnosis: "Post-surgery infection prevention",
    status: "active",
  },
  {
    id: "3",
    patientName: "Michael Chen",
    medicine: "Naproxen",
    dosage: "500mg",
    frequency: "Once daily",
    duration: "30 days",
    prescribedDate: "2026-08-28",
    diagnosis: "Chronic back pain",
    status: "active",
  },
  {
    id: "4",
    patientName: "Emily Davis",
    medicine: "Vitamin D3",
    dosage: "2000 IU",
    frequency: "Once daily",
    duration: "90 days",
    prescribedDate: "2026-08-15",
    diagnosis: "Vitamin D deficiency",
    status: "active",
  },
  {
    id: "5",
    patientName: "James Wilson",
    medicine: "Metoprolol",
    dosage: "50mg",
    frequency: "Once daily",
    duration: "30 days",
    prescribedDate: "2026-08-20",
    diagnosis: "Heart palpitations",
    status: "active",
  },
  {
    id: "6",
    patientName: "Maria Garcia",
    medicine: "Metformin",
    dosage: "850mg",
    frequency: "Twice daily",
    duration: "90 days",
    prescribedDate: "2026-07-15",
    diagnosis: "Type 2 Diabetes",
    status: "active",
  },
  {
    id: "7",
    patientName: "Robert Taylor",
    medicine: "Sumatriptan",
    dosage: "50mg",
    frequency: "As needed",
    duration: "30 days",
    prescribedDate: "2026-08-10",
    diagnosis: "Migraine",
    status: "active",
  },
  {
    id: "8",
    patientName: "Lisa Anderson",
    medicine: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "90 days",
    prescribedDate: "2026-06-01",
    diagnosis: "Hypertension",
    status: "completed",
  },
  {
    id: "9",
    patientName: "David Brown",
    medicine: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    duration: "Ongoing",
    prescribedDate: "2026-05-10",
    diagnosis: "Cardiac prophylaxis",
    status: "active",
  },
  {
    id: "10",
    patientName: "Jennifer Martinez",
    medicine: "Amlodipine",
    dosage: "5mg",
    frequency: "Once daily",
    duration: "90 days",
    prescribedDate: "2026-08-01",
    diagnosis: "Hypertension",
    status: "active",
  },
];

export default function DoctorPrescriptions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredPrescriptions = MOCK_PRESCRIPTIONS.filter((rx) => {
    const matchesSearch = rx.patientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || rx.status === statusFilter;
    const matchesDate =
      !dateFilter || rx.prescribedDate === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handlePrint = (rx: Prescription) => {
    const printContent = `
PRESCRIPTION
================================
Patient: ${rx.patientName}
Date: ${rx.prescribedDate}
Diagnosis: ${rx.diagnosis}

Medicine: ${rx.medicine}
Dosage: ${rx.dosage}
Frequency: ${rx.frequency}
Duration: ${rx.duration}

Doctor: Dr. Williams
License: MED-2024-12345
    `.trim();

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`<pre>${printContent}</pre>`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200";
      case "completed":
        return "bg-gray-100 text-gray-600 border-gray-200";
      case "discontinued":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-500 border-gray-200";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Prescription History
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          All prescriptions you&apos;ve written
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by patient name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="discontinued">Discontinued</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Prescriptions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPrescriptions.map((rx) => (
          <div
            key={rx.id}
            className="bg-white border border-gray-200 rounded-lg p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{rx.medicine}</h3>
                <p className="text-sm text-gray-500">{rx.patientName}</p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                  rx.status
                )}`}
              >
                {rx.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div>
                <p className="text-gray-400 text-xs">Dosage</p>
                <p className="text-gray-700">{rx.dosage}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Frequency</p>
                <p className="text-gray-700">{rx.frequency}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Duration</p>
                <p className="text-gray-700">{rx.duration}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Prescribed</p>
                <p className="text-gray-700">{rx.prescribedDate}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-500 truncate flex-1 mr-4">
                Dx: {rx.diagnosis}
              </p>
              <button
                onClick={() => handlePrint(rx)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
              >
                Print
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPrescriptions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No prescriptions found matching your filters.
        </div>
      )}
    </div>
  );
}
