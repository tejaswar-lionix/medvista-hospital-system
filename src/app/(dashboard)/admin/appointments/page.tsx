"use client";

import { useState, useMemo } from "react";

const allAppointments = Array.from({ length: 50 }, (_, i) => ({
  id: `APT-${String(i + 1).padStart(3, "0")}`,
  patient: ["Alice Johnson", "Bob Williams", "Carol Davis", "David Brown", "Eva Martinez", "Frank Wilson", "Grace Taylor", "Henry Anderson", "Ivy Thomas", "Jack Robinson", "Karen White", "Leo Harris", "Mia Clark", "Noah Lewis", "Olivia Walker"][i % 15],
  doctor: ["Dr. Smith", "Dr. Patel", "Dr. Lee", "Dr. Khan", "Dr. Sharma", "Dr. Chen", "Dr. Gupta", "Dr. Jones", "Dr. Singh", "Dr. Wilson"][i % 10],
  department: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Oncology", "Dermatology", "ENT", "General"][i % 8],
  date: `2024-01-${String((i % 28) + 1).padStart(2, "0")}`,
  time: ["08:00 AM", "09:00 AM", "10:30 AM", "11:00 AM", "01:00 PM", "02:30 PM", "03:00 PM", "04:00 PM", "05:00 PM"][i % 9],
  status: (["confirmed", "pending", "completed", "cancelled", "confirmed", "completed"] as const)[i % 6],
}));

const calendarDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const calendarMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
};

const doctors = ["All Doctors", "Dr. Smith", "Dr. Patel", "Dr. Lee", "Dr. Khan", "Dr. Sharma", "Dr. Chen", "Dr. Gupta", "Dr. Jones", "Dr. Singh", "Dr. Wilson"];
const departments = ["All Departments", "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Oncology", "Dermatology", "ENT", "General"];
const statuses = ["All Status", "confirmed", "pending", "completed", "cancelled"];

export default function AppointmentsPage() {
  const [view, setView] = useState<"calendar" | "list">("list");
  const [selectedDate, setSelectedDate] = useState(15);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear] = useState(2024);
  const [filterDoctor, setFilterDoctor] = useState("All Doctors");
  const [filterDept, setFilterDept] = useState("All Departments");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cancelDialog, setCancelDialog] = useState<string | null>(null);
  const [statusDropdown, setStatusDropdown] = useState<string | null>(null);

  const itemsPerPage = 10;

  const filtered = useMemo(() => {
    return allAppointments.filter((a) => {
      if (filterDoctor !== "All Doctors" && a.doctor !== filterDoctor) return false;
      if (filterDept !== "All Departments" && a.department !== filterDept) return false;
      if (filterStatus !== "All Status" && a.status !== filterStatus) return false;
      if (searchQuery && !a.patient.toLowerCase().includes(searchQuery.toLowerCase()) && !a.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [filterDoctor, filterDept, filterStatus, searchQuery]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const calendarAppointments = allAppointments.filter((a) => {
    const day = parseInt(a.date.split("-")[2]);
    const month = parseInt(a.date.split("-")[1]) - 1;
    return month === currentMonth && day === selectedDate;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500 text-sm">Manage and track all patient appointments.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            Export
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            + New Appointment
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by patient or ID..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-60"
        />
        <select
          value={filterDoctor}
          onChange={(e) => { setFilterDoctor(e.target.value); setCurrentPage(1); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600"
        >
          {doctors.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select
          value={filterDept}
          onChange={(e) => { setFilterDept(e.target.value); setCurrentPage(1); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600"
        >
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600"
        >
          {statuses.map((s) => <option key={s} className="capitalize">{s}</option>)}
        </select>
        <div className="flex-1" />
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 text-sm font-medium transition ${view === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            List
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 text-sm font-medium transition ${view === "calendar" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* List View */}
      {view === "list" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-100">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Patient</th>
                  <th className="px-6 py-3">Doctor</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((apt) => (
                  <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{apt.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{apt.patient}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{apt.doctor}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{apt.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{apt.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{apt.time}</td>
                    <td className="px-6 py-4 relative">
                      <button
                        onClick={() => setStatusDropdown(statusDropdown === apt.id ? null : apt.id)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[apt.status]} cursor-pointer`}
                      >
                        {apt.status}
                      </button>
                      {statusDropdown === apt.id && (
                        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-32">
                          {["confirmed", "pending", "completed", "cancelled"].map((s) => (
                            <button
                              key={s}
                              onClick={() => setStatusDropdown(null)}
                              className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 capitalize"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-sm text-blue-600 hover:text-blue-800">View</button>
                        <button className="text-sm text-gray-400 hover:text-gray-600">Edit</button>
                        <button
                          onClick={() => setCancelDialog(apt.id)}
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span>Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} appointments</span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg ${currentPage === page ? "bg-blue-600 text-white" : "border border-gray-200 hover:bg-gray-50"}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar View */}
      {view === "calendar" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setCurrentMonth((m) => (m === 0 ? 11 : m - 1))} className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                ← Prev
              </button>
              <h3 className="font-semibold text-gray-900">{calendarMonths[currentMonth]} {currentYear}</h3>
              <button onClick={() => setCurrentMonth((m) => (m === 11 ? 0 : m + 1))} className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                Next →
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">{day}</div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const count = allAppointments.filter((a) => {
                  const d = parseInt(a.date.split("-")[2]);
                  const m = parseInt(a.date.split("-")[1]) - 1;
                  return m === currentMonth && d === day;
                }).length;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`aspect-square rounded-lg text-sm font-medium transition relative ${
                      selectedDate === day
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {day}
                    {count > 0 && (
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${selectedDate === day ? "bg-white" : "bg-blue-500"}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">
              {calendarMonths[currentMonth]} {selectedDate}, {currentYear}
            </h3>
            {calendarAppointments.length === 0 ? (
              <p className="text-gray-400 text-sm">No appointments on this day.</p>
            ) : (
              <div className="space-y-3">
                {calendarAppointments.map((apt) => (
                  <div key={apt.id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{apt.time}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[apt.status]}`}>
                        {apt.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700">{apt.patient}</div>
                    <div className="text-xs text-gray-400">{apt.doctor} &bull; {apt.department}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cancel Dialog */}
      {cancelDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Appointment</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to cancel appointment <strong>{cancelDialog}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelDialog(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Keep Appointment
              </button>
              <button
                onClick={() => setCancelDialog(null)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
