"use client";

import { useState } from "react";

type Filter = "all" | "active" | "completed";

const prescriptions = [
  {
    id: 1,
    date: "2026-08-28",
    doctor: "Dr. Sarah Mitchell",
    status: "active",
    medicines: [
      { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", duration: "30 days", remaining: "22 days" },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily (morning)", duration: "30 days", remaining: "22 days" },
    ],
  },
  {
    id: 2,
    date: "2026-08-15",
    doctor: "Dr. Emily Carter",
    status: "active",
    medicines: [
      { name: "Hydrocortisone Cream", dosage: "1%", frequency: "Apply twice daily", duration: "7 days", remaining: "3 days" },
      { name: "Cetirizine", dosage: "10mg", frequency: "Once daily as needed", duration: "14 days", remaining: "10 days" },
    ],
  },
  {
    id: 3,
    date: "2026-07-22",
    doctor: "Dr. Michael Brown",
    status: "completed",
    medicines: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "Three times daily with food", duration: "14 days", remaining: "Completed" },
      { name: "Cyclobenzaprine", dosage: "10mg", frequency: "At bedtime", duration: "7 days", remaining: "Completed" },
    ],
  },
  {
    id: 4,
    date: "2026-06-10",
    doctor: "Dr. James Wilson",
    status: "completed",
    medicines: [
      { name: "Loratadine", dosage: "10mg", frequency: "Once daily as needed", duration: "30 days", remaining: "Completed" },
    ],
  },
];

export default function PrescriptionsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = prescriptions.filter((p) => {
    if (filter === "all") return true;
    return p.status === filter;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Prescriptions</h1>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {(["all", "active", "completed"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((rx) => (
          <div
            key={rx.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === rx.id ? null : rx.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                    rx.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {rx.status === "active" ? "●" : "✓"}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {rx.medicines.map((m) => m.name).join(", ")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Prescribed by {rx.doctor} ·{" "}
                    {new Date(rx.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    rx.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {rx.status}
                </span>
                <span
                  className={`transition-transform ${
                    expandedId === rx.id ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
            </button>

            {expandedId === rx.id && (
              <div className="px-5 pb-4 border-t border-gray-100">
                <table className="w-full text-sm mt-3">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 text-xs text-gray-400 font-medium">
                        Medicine
                      </th>
                      <th className="text-left py-2 text-xs text-gray-400 font-medium">
                        Dosage
                      </th>
                      <th className="text-left py-2 text-xs text-gray-400 font-medium">
                        Frequency
                      </th>
                      <th className="text-left py-2 text-xs text-gray-400 font-medium">
                        Duration
                      </th>
                      <th className="text-left py-2 text-xs text-gray-400 font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rx.medicines.map((med, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0">
                        <td className="py-2.5 font-medium text-gray-900">
                          {med.name}
                        </td>
                        <td className="py-2.5 text-gray-600">{med.dosage}</td>
                        <td className="py-2.5 text-gray-600">{med.frequency}</td>
                        <td className="py-2.5 text-gray-600">{med.duration}</td>
                        <td className="py-2.5">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              med.remaining === "Completed"
                                ? "bg-gray-100 text-gray-500"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {med.remaining}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No {filter} prescriptions
          </div>
        )}
      </div>
    </div>
  );
}
