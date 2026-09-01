"use client";

import { useState, useMemo } from "react";

const allDoctors = [
  { id: "DOC-001", name: "Dr. Sarah Smith", specialty: "Cardiology", department: "Cardiology", experience: 15, rating: 4.9, patients: 1200, availability: "available", fee: 250, email: "sarah.smith@hospital.com", phone: "(555) 123-4567", education: "MD, Harvard Medical School", bio: "Board-certified cardiologist specializing in interventional cardiology." },
  { id: "DOC-002", name: "Dr. Raj Patel", specialty: "Neurology", department: "Neurology", experience: 12, rating: 4.8, patients: 980, availability: "available", fee: 300, email: "raj.patel@hospital.com", phone: "(555) 234-5678", education: "MD, Johns Hopkins", bio: "Expert in neurodegenerative disorders and stroke treatment." },
  { id: "DOC-003", name: "Dr. James Lee", specialty: "Orthopedics", department: "Orthopedics", experience: 10, rating: 4.7, patients: 850, availability: "busy", fee: 275, email: "james.lee@hospital.com", phone: "(555) 345-6789", education: "MD, Stanford University", bio: "Specializes in sports medicine and joint replacement surgery." },
  { id: "DOC-004", name: "Dr. Fatima Khan", specialty: "Pediatrics", department: "Pediatrics", experience: 8, rating: 4.9, patients: 1500, availability: "available", fee: 200, email: "fatima.khan@hospital.com", phone: "(555) 456-7890", education: "MD, Yale School of Medicine", bio: "Compassionate pediatrician with expertise in childhood development." },
  { id: "DOC-005", name: "Dr. Amit Sharma", specialty: "Oncology", department: "Oncology", experience: 18, rating: 4.8, patients: 750, availability: "unavailable", fee: 350, email: "amit.sharma@hospital.com", phone: "(555) 567-8901", education: "MD, Memorial Sloan Kettering", bio: "Leading oncologist with research focus on immunotherapy." },
  { id: "DOC-006", name: "Dr. Emily Chen", specialty: "Dermatology", department: "Dermatology", experience: 7, rating: 4.6, patients: 1100, availability: "available", fee: 225, email: "emily.chen@hospital.com", phone: "(555) 678-9012", education: "MD, UCSF", bio: "Dermatologist specializing in cosmetic and medical dermatology." },
  { id: "DOC-007", name: "Dr. Michael Gupta", specialty: "ENT", department: "ENT", experience: 11, rating: 4.7, patients: 920, availability: "busy", fee: 260, email: "michael.gupta@hospital.com", phone: "(555) 789-0123", education: "MD, Mayo Clinic", bio: "Expert in sinus surgery and hearing disorders." },
  { id: "DOC-008", name: "Dr. Lisa Jones", specialty: "General", department: "General", experience: 20, rating: 4.9, patients: 2000, availability: "available", fee: 180, email: "lisa.jones@hospital.com", phone: "(555) 890-1234", education: "MD, Columbia University", bio: "Experienced general practitioner with holistic approach to medicine." },
  { id: "DOC-009", name: "Dr. Vikram Singh", specialty: "Cardiology", department: "Cardiology", experience: 14, rating: 4.8, patients: 1050, availability: "available", fee: 280, email: "vikram.singh@hospital.com", phone: "(555) 901-2345", education: "MD, Cleveland Clinic", bio: "Interventional cardiologist with expertise in structural heart disease." },
  { id: "DOC-010", name: "Dr. Rachel Wilson", specialty: "Neurology", department: "Neurology", experience: 9, rating: 4.6, patients: 680, availability: "unavailable", fee: 290, email: "rachel.wilson@hospital.com", phone: "(555) 012-3456", education: "MD, Duke University", bio: "Specializes in epilepsy and movement disorders." },
];

const departments = ["All Departments", "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Oncology", "Dermatology", "ENT", "General"];
const availabilities = ["All", "available", "busy", "unavailable"];
const availabilityLabels: Record<string, string> = { available: "Available", busy: "Busy", unavailable: "Unavailable" };
const availabilityColors: Record<string, string> = { available: "bg-green-100 text-green-700", busy: "bg-yellow-100 text-yellow-700", unavailable: "bg-red-100 text-red-700" };

export default function DoctorsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("All Departments");
  const [filterAvail, setFilterAvail] = useState("All");
  const [addDialog, setAddDialog] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "", department: "", email: "", fee: "" });

  const filtered = useMemo(() => {
    return allDoctors.filter((d) => {
      if (filterDept !== "All Departments" && d.department !== filterDept) return false;
      if (filterAvail !== "All" && d.availability !== filterAvail) return false;
      if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase()) && !d.specialty.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [filterDept, filterAvail, searchQuery]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Management</h1>
          <p className="text-gray-500 text-sm">Manage your medical staff and their profiles.</p>
        </div>
        <button
          onClick={() => setAddDialog(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          + Add New Doctor
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
        />
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600"
        >
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select
          value={filterAvail}
          onChange={(e) => setFilterAvail(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600"
        >
          {availabilities.map((a) => (
            <option key={a} value={a}>{a === "All" ? "All Availability" : availabilityLabels[a]}</option>
          ))}
        </select>
        <div className="flex-1" />
        <span className="text-sm text-gray-500">{filtered.length} doctors found</span>
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-2 text-sm font-medium transition ${view === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 text-sm font-medium transition ${view === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            List
          </button>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-700" />
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {doc.name.split(" ").slice(1).map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{doc.name}</h3>
                    <p className="text-sm text-gray-500">{doc.specialty}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${availabilityColors[doc.availability]}`}>
                      {availabilityLabels[doc.availability]}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{doc.experience}</div>
                    <div className="text-xs text-gray-500">Years Exp</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{doc.patients.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Patients</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium text-gray-900">{doc.rating}</span>
                  </div>
                  <span className="text-gray-500">${doc.fee}/visit</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition">
                    View Profile
                  </button>
                  <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition">
                    Edit
                  </button>
                  <button className="px-3 py-2 border border-red-200 rounded-lg text-sm text-red-600 hover:bg-red-50 transition">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-100">
                  <th className="px-6 py-3">Doctor</th>
                  <th className="px-6 py-3">Specialty</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Experience</th>
                  <th className="px-6 py-3">Rating</th>
                  <th className="px-6 py-3">Availability</th>
                  <th className="px-6 py-3">Fee</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {doc.name.split(" ").slice(1).map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{doc.name}</div>
                          <div className="text-xs text-gray-400">{doc.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{doc.specialty}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.experience} years</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span> {doc.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${availabilityColors[doc.availability]}`}>
                        {availabilityLabels[doc.availability]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">${doc.fee}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                        <button className="text-sm text-red-500 hover:text-red-700">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Doctor Dialog */}
      {addDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Doctor</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Dr. "
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                  <input
                    type="text"
                    value={newDoctor.specialty}
                    onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g. Cardiology"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={newDoctor.department}
                    onChange={(e) => setNewDoctor({ ...newDoctor, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select department</option>
                    {departments.slice(1).map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newDoctor.email}
                    onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="doctor@hospital.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee ($)</label>
                  <input
                    type="number"
                    value={newDoctor.fee}
                    onChange={(e) => setNewDoctor({ ...newDoctor, fee: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="200"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setAddDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setAddDialog(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Add Doctor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
