"use client";

import { useState } from "react";
import Link from "next/link";

const records = [
  {
    id: 1,
    date: "2026-08-28",
    doctor: "Dr. Sarah Mitchell",
    department: "Cardiology",
    diagnosis: "Hypertension - Stage 1",
    notes: "Blood pressure slightly elevated. Recommended lifestyle changes and follow-up in 2 weeks.",
    prescriptions: ["Amlodipine 5mg", "Lisinopril 10mg"],
  },
  {
    id: 2,
    date: "2026-08-15",
    doctor: "Dr. Emily Carter",
    department: "Dermatology",
    diagnosis: "Contact Dermatitis",
    notes: "Mild allergic reaction on left forearm. Prescribed topical cream. Avoid known irritants.",
    prescriptions: ["Hydrocortisone 1% Cream", "Cetirizine 10mg"],
  },
  {
    id: 3,
    date: "2026-07-22",
    doctor: "Dr. Michael Brown",
    department: "Orthopedics",
    diagnosis: "Lower Back Strain",
    notes: "Muscle strain from heavy lifting. Prescribed rest and physical therapy. Re-evaluate in 3 weeks.",
    prescriptions: ["Ibuprofen 400mg", "Cyclobenzaprine 10mg"],
  },
  {
    id: 4,
    date: "2026-06-10",
    doctor: "Dr. James Wilson",
    department: "General Medicine",
    diagnosis: "Seasonal Allergic Rhinitis",
    notes: "Allergy symptoms well-controlled with current medication. Continue as needed.",
    prescriptions: ["Loratadine 10mg"],
  },
  {
    id: 5,
    date: "2026-05-05",
    doctor: "Dr. Sarah Mitchell",
    department: "Cardiology",
    diagnosis: "Annual Cardiac Checkup",
    notes: "ECG normal. Cholesterol within range. Maintain current lifestyle.",
    prescriptions: [],
  },
];

export default function MedicalRecordsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredRecords = records.filter((record) => {
    if (!startDate && !endDate) return true;
    const recordDate = new Date(record.date);
    if (startDate && recordDate < new Date(startDate)) return false;
    if (endDate && recordDate > new Date(endDate)) return false;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="From"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="To"
          />
          {(startDate || endDate) && (
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedId(expandedId === record.id ? null : record.id)
              }
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
                  {new Date(record.date).toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{record.diagnosis}</p>
                  <p className="text-sm text-gray-500">
                    {record.doctor} · {record.department}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">
                  {new Date(record.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span
                  className={`transition-transform ${
                    expandedId === record.id ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
            </button>

            {expandedId === record.id && (
              <div className="px-5 pb-4 border-t border-gray-100 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Doctor&apos;s Notes
                    </p>
                    <p className="text-sm text-gray-700">{record.notes}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Prescriptions
                    </p>
                    {record.prescriptions.length > 0 ? (
                      <ul className="text-sm text-gray-700 space-y-1">
                        {record.prescriptions.map((rx, i) => (
                          <li key={i}>• {rx}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-400">No prescriptions</p>
                    )}
                  </div>
                </div>
                <Link
                  href={`/patient/records/${record.id}`}
                  className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  View full details →
                </Link>
              </div>
            )}
          </div>
        ))}
        {filteredRecords.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No records found for the selected date range
          </div>
        )}
      </div>
    </div>
  );
}
