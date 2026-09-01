"use client";

import { useState } from "react";
import Link from "next/link";

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  bloodType: string;
  lastVisit: string;
  totalVisits: number;
  insuranceProvider: string;
  status: "active" | "inactive";
}

const initialPatients: Patient[] = [
  {
    id: "PAT-001",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 111-2233",
    dateOfBirth: "1985-06-15",
    gender: "female",
    bloodType: "O+",
    lastVisit: "2024-01-10",
    totalVisits: 12,
    insuranceProvider: "Blue Cross",
    status: "active",
  },
  {
    id: "PAT-002",
    name: "James Wilson",
    email: "j.wilson@email.com",
    phone: "(555) 222-3344",
    dateOfBirth: "1972-03-22",
    gender: "male",
    bloodType: "A+",
    lastVisit: "2024-01-08",
    totalVisits: 8,
    insuranceProvider: "Aetna",
    status: "active",
  },
  {
    id: "PAT-003",
    name: "Maria Garcia",
    email: "maria.g@email.com",
    phone: "(555) 333-4455",
    dateOfBirth: "1990-11-30",
    gender: "female",
    bloodType: "B+",
    lastVisit: "2023-12-20",
    totalVisits: 5,
    insuranceProvider: "UnitedHealth",
    status: "active",
  },
  {
    id: "PAT-004",
    name: "Robert Brown",
    email: "r.brown@email.com",
    phone: "(555) 444-5566",
    dateOfBirth: "1965-08-12",
    gender: "male",
    bloodType: "AB-",
    lastVisit: "2024-01-12",
    totalVisits: 23,
    insuranceProvider: "Medicare",
    status: "active",
  },
  {
    id: "PAT-005",
    name: "Jennifer Lee",
    email: "j.lee@email.com",
    phone: "(555) 555-6677",
    dateOfBirth: "1988-04-05",
    gender: "female",
    bloodType: "O-",
    lastVisit: "2023-11-15",
    totalVisits: 3,
    insuranceProvider: "Cigna",
    status: "inactive",
  },
  {
    id: "PAT-006",
    name: "David Martinez",
    email: "d.martinez@email.com",
    phone: "(555) 666-7788",
    dateOfBirth: "1978-09-18",
    gender: "male",
    bloodType: "A-",
    lastVisit: "2024-01-14",
    totalVisits: 15,
    insuranceProvider: "Blue Cross",
    status: "active",
  },
];

export default function ManagePatients() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState<keyof Patient>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredPatients = patients
    .filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || patient.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });

  const handleSort = (field: keyof Patient) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const calculateAge = (dob: string) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Patients</h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage all registered patients
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Export CSV
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Add Patient
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Patients</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {patients.length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {patients.filter((p) => p.status === "active").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Inactive</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {patients.filter((p) => p.status === "inactive").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">+24</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Patients table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                <th
                  className="px-5 py-3 cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort("name")}
                >
                  Patient {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-5 py-3">Contact</th>
                <th
                  className="px-5 py-3 cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort("dateOfBirth")}
                >
                  Age {sortField === "dateOfBirth" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-5 py-3">Blood Type</th>
                <th className="px-5 py-3">Insurance</th>
                <th
                  className="px-5 py-3 cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort("lastVisit")}
                >
                  Last Visit {sortField === "lastVisit" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {patient.name}
                        </p>
                        <p className="text-xs text-gray-500">{patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-600">{patient.email}</p>
                    <p className="text-xs text-gray-500">{patient.phone}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {calculateAge(patient.dateOfBirth)} yrs
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex px-2.5 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      {patient.bloodType}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {patient.insuranceProvider}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {new Date(patient.lastVisit).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        patient.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {patient.status.charAt(0).toUpperCase() +
                        patient.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/patients/${patient.id}`}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 rounded-lg transition-colors"
                      >
                        View
                      </Link>
                      <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-700 bg-gray-50 rounded-lg transition-colors">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl">🧑‍🦰</span>
            <p className="text-gray-500 mt-2">No patients found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing 1-{filteredPatients.length} of {filteredPatients.length}{" "}
          patients
        </p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded-lg">
            1
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
