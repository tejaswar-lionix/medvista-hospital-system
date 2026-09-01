"use client";

import { useState } from "react";
import Link from "next/link";

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  condition: string;
  phone: string;
};

const MOCK_PATIENTS: Patient[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    age: 34,
    gender: "F",
    lastVisit: "Sep 01, 2026",
    condition: "Post-surgery recovery",
    phone: "(555) 234-5678",
  },
  {
    id: "2",
    name: "Michael Chen",
    age: 56,
    gender: "M",
    lastVisit: "Sep 01, 2026",
    condition: "Chronic back pain",
    phone: "(555) 345-6789",
  },
  {
    id: "3",
    name: "Emily Davis",
    age: 28,
    gender: "F",
    lastVisit: "Aug 15, 2026",
    condition: "Routine checkup",
    phone: "(555) 456-7890",
  },
  {
    id: "4",
    name: "James Wilson",
    age: 45,
    gender: "M",
    lastVisit: "Aug 28, 2026",
    condition: "Heart palpitations",
    phone: "(555) 567-8901",
  },
  {
    id: "5",
    name: "Maria Garcia",
    age: 62,
    gender: "F",
    lastVisit: "Aug 20, 2026",
    condition: "Diabetes management",
    phone: "(555) 678-9012",
  },
  {
    id: "6",
    name: "Robert Taylor",
    age: 41,
    gender: "M",
    lastVisit: "Aug 10, 2026",
    condition: "Migraine treatment",
    phone: "(555) 789-0123",
  },
  {
    id: "7",
    name: "Lisa Anderson",
    age: 38,
    gender: "F",
    lastVisit: "Jul 25, 2026",
    condition: "Type 2 Diabetes",
    phone: "(555) 890-1234",
  },
  {
    id: "8",
    name: "David Brown",
    age: 70,
    gender: "M",
    lastVisit: "Aug 05, 2026",
    condition: "Cardiac monitoring",
    phone: "(555) 901-2345",
  },
  {
    id: "9",
    name: "Jennifer Martinez",
    age: 52,
    gender: "F",
    lastVisit: "Aug 18, 2026",
    condition: "Hypertension",
    phone: "(555) 012-3456",
  },
  {
    id: "10",
    name: "William Lee",
    age: 67,
    gender: "M",
    lastVisit: "Jul 30, 2026",
    condition: "Arthritis follow-up",
    phone: "(555) 123-4567",
  },
];

export default function DoctorPatients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCondition, setFilterCondition] = useState("all");

  const conditions = Array.from(
    new Set(MOCK_PATIENTS.map((p) => p.condition))
  );

  const filteredPatients = MOCK_PATIENTS.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCondition =
      filterCondition === "all" || patient.condition === filterCondition;
    return matchesSearch && matchesCondition;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Patients</h1>
          <p className="text-gray-500 text-sm mt-1">
            {MOCK_PATIENTS.length} patients you&apos;ve seen
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search patients by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={filterCondition}
          onChange={(e) => setFilterCondition(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All conditions</option>
          {conditions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Patient List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Condition
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Last Visit
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {patient.name}
                      </p>
                      <p className="text-xs text-gray-500 md:hidden">
                        {patient.condition}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{patient.age}</td>
                <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                  {patient.condition}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                  {patient.lastVisit}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/doctor/patients/${patient.id}`}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No patients found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
