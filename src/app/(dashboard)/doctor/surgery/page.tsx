"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Calendar,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  FileText,
  Filter,
  ChevronDown,
  ClipboardList,
  Activity,
} from "lucide-react";

const surgeries = [
  {
    id: 1,
    patient: "Robert Johnson",
    procedure: "Coronary Artery Bypass",
    type: "Cardiac",
    surgeon: "Dr. Sarah Mitchell",
    date: "2024-01-20",
    time: "08:00",
    duration: "4 hours",
    status: "scheduled",
    room: "OR-1",
    preOpChecklist: ["Blood work complete", "ECG done", "Consent signed", "NPO confirmed"],
    preOpInstructions: "No food or drink after midnight. Take morning medications with small sip of water.",
  },
  {
    id: 2,
    patient: "Maria Garcia",
    procedure: "Knee Replacement",
    type: "Orthopedic",
    surgeon: "Dr. James Wilson",
    date: "2024-01-19",
    time: "10:30",
    duration: "2.5 hours",
    status: "in-progress",
    room: "OR-3",
    preOpChecklist: ["Blood work complete", "X-ray reviewed", "Consent signed", "Antibiotics given"],
    preOpInstructions: "Shower with antiseptic soap. Wear loose comfortable clothing.",
  },
  {
    id: 3,
    patient: "David Lee",
    procedure: "Appendectomy",
    type: "General",
    surgeon: "Dr. Emily Chen",
    date: "2024-01-19",
    time: "14:00",
    duration: "1.5 hours",
    status: "completed",
    room: "OR-2",
    preOpChecklist: ["Blood work complete", "Consent signed", "IV started", "Allergies verified"],
    preOpInstructions: "Nothing by mouth for 8 hours before surgery.",
  },
  {
    id: 4,
    patient: "Jennifer White",
    procedure: "Hysterectomy",
    type: "Gynecological",
    surgeon: "Dr. Lisa Anderson",
    date: "2024-01-21",
    time: "09:00",
    duration: "3 hours",
    status: "scheduled",
    room: "OR-4",
    preOpChecklist: ["Blood work complete", "Consent signed", "Pregnancy test negative"],
    preOpInstructions: "Begin bowel prep today. No solid foods after 6 PM.",
  },
  {
    id: 5,
    patient: "Thomas Brown",
    procedure: "Hip Arthroscopy",
    type: "Orthopedic",
    surgeon: "Dr. James Wilson",
    date: "2024-01-22",
    time: "11:00",
    duration: "2 hours",
    status: "scheduled",
    room: "OR-3",
    preOpChecklist: ["Blood work pending", "Consent pending", "Pre-op education completed"],
    preOpInstructions: "Stop blood thinners 7 days before surgery. Arrange ride home.",
  },
];

const statusColors = {
  scheduled: "bg-blue-100 text-blue-700",
  "in-progress": "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function SurgeryPage() {
  const [selectedSurgery, setSelectedSurgery] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showPostOpModal, setShowPostOpModal] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [newSurgery, setNewSurgery] = useState({
    patient: "",
    procedure: "",
    type: "",
    surgeon: "",
    date: "",
    time: "",
    duration: "",
    room: "",
    notes: "",
  });

  const filteredSurgeries = surgeries.filter((s) => {
    return filterType === "all" || s.type.toLowerCase() === filterType.toLowerCase();
  });

  const handleScheduleSurgery = () => {
    setShowScheduleModal(false);
    setNewSurgery({
      patient: "",
      procedure: "",
      type: "",
      surgeon: "",
      date: "",
      time: "",
      duration: "",
      room: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Surgery Management</h1>
            <p className="text-gray-500 mt-1">Schedule and manage surgical procedures</p>
          </div>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} />
            Schedule Surgery
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{surgeries.filter((s) => s.status === "scheduled").length}</div>
            <div className="text-sm text-gray-500">Scheduled</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="text-2xl font-bold text-amber-600">{surgeries.filter((s) => s.status === "in-progress").length}</div>
            <div className="text-sm text-gray-500">In Progress</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{surgeries.filter((s) => s.status === "completed").length}</div>
            <div className="text-sm text-gray-500">Completed Today</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{surgeries.length}</div>
            <div className="text-sm text-gray-500">Total This Week</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search surgeries..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="cardiac">Cardiac</option>
              <option value="orthopedic">Orthopedic</option>
              <option value="general">General</option>
              <option value="gynecological">Gynecological</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {filteredSurgeries.map((surgery) => (
              <div
                key={surgery.id}
                onClick={() => setSelectedSurgery(surgery)}
                className={`bg-white rounded-xl shadow-sm p-6 border cursor-pointer transition-all ${
                  selectedSurgery?.id === surgery.id ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{surgery.procedure}</h3>
                    <p className="text-gray-500 text-sm mt-1">Patient: {surgery.patient}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[surgery.status]}`}>
                    {surgery.status.replace("-", " ")}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={14} />
                    {surgery.date}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={14} />
                    {surgery.time}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User size={14} />
                    {surgery.surgeon}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Activity size={14} />
                    Room {surgery.room}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedSurgery && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Surgery Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Patient</span>
                    <p className="font-medium">{selectedSurgery.patient}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Procedure</span>
                    <p className="font-medium">{selectedSurgery.procedure}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Duration</span>
                    <p className="font-medium">{selectedSurgery.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Type</span>
                    <p className="font-medium">{selectedSurgery.type}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Pre-op Instructions</h3>
                <p className="text-sm text-gray-600 bg-amber-50 p-3 rounded-lg">
                  {selectedSurgery.preOpInstructions}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Pre-op Checklist</h3>
                  <span className="text-sm text-green-600">
                    {selectedSurgery.preOpChecklist.length}/4 complete
                  </span>
                </div>
                <div className="space-y-2">
                  {selectedSurgery.preOpChecklist.map((item, index) => (
                    <label key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {selectedSurgery.status === "completed" && (
                <button
                  onClick={() => setShowPostOpModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  <FileText size={18} />
                  Add Post-op Notes
                </button>
              )}
            </div>
          )}
        </div>

        {showScheduleModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-lg mx-4">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Schedule New Surgery</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                  <input
                    type="text"
                    value={newSurgery.patient}
                    onChange={(e) => setNewSurgery({ ...newSurgery, patient: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Procedure</label>
                  <input
                    type="text"
                    value={newSurgery.procedure}
                    onChange={(e) => setNewSurgery({ ...newSurgery, procedure: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newSurgery.type}
                      onChange={(e) => setNewSurgery({ ...newSurgery, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select type</option>
                      <option value="Cardiac">Cardiac</option>
                      <option value="Orthopedic">Orthopedic</option>
                      <option value="General">General</option>
                      <option value="Gynecological">Gynecological</option>
                      <option value="Neurological">Neurological</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Surgeon</label>
                    <select
                      value={newSurgery.surgeon}
                      onChange={(e) => setNewSurgery({ ...newSurgery, surgeon: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select surgeon</option>
                      <option value="Dr. Sarah Mitchell">Dr. Sarah Mitchell</option>
                      <option value="Dr. James Wilson">Dr. James Wilson</option>
                      <option value="Dr. Emily Chen">Dr. Emily Chen</option>
                      <option value="Dr. Lisa Anderson">Dr. Lisa Anderson</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={newSurgery.date}
                      onChange={(e) => setNewSurgery({ ...newSurgery, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={newSurgery.time}
                      onChange={(e) => setNewSurgery({ ...newSurgery, time: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                    <select
                      value={newSurgery.room}
                      onChange={(e) => setNewSurgery({ ...newSurgery, room: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select room</option>
                      <option value="OR-1">OR-1</option>
                      <option value="OR-2">OR-2</option>
                      <option value="OR-3">OR-3</option>
                      <option value="OR-4">OR-4</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={newSurgery.notes}
                    onChange={(e) => setNewSurgery({ ...newSurgery, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduleSurgery}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        )}

        {showPostOpModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-lg mx-4">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Post-operative Notes</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Procedure Summary</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Complications</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={2} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Post-op Instructions</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                  <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowPostOpModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowPostOpModal(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
