"use client";

import { useState } from "react";

interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  doctorCount: number;
  patientCount: number;
  status: "active" | "inactive";
  floor: string;
  phone: string;
  services: string[];
}

const initialDepartments: Department[] = [
  {
    id: "DEPT-001",
    name: "Cardiology",
    description: "Specialized care for heart and cardiovascular system disorders.",
    head: "Dr. Michael Chen",
    doctorCount: 12,
    patientCount: 345,
    status: "active",
    floor: "3rd Floor, Wing A",
    phone: "(555) 100-2001",
    services: ["ECG", "Echocardiogram", "Cardiac Catheterization", "Heart Surgery"],
  },
  {
    id: "DEPT-002",
    name: "Neurology",
    description: "Diagnosis and treatment of disorders of the nervous system.",
    head: "Dr. Emily Rodriguez",
    doctorCount: 8,
    patientCount: 212,
    status: "active",
    floor: "4th Floor, Wing B",
    phone: "(555) 100-2002",
    services: ["EEG", "EMG", "Brain Mapping", "Stroke Care"],
  },
  {
    id: "DEPT-003",
    name: "Orthopedics",
    description: "Treatment of musculoskeletal system conditions.",
    head: "Dr. David Kim",
    doctorCount: 10,
    patientCount: 289,
    status: "active",
    floor: "2nd Floor, Wing A",
    phone: "(555) 100-2003",
    services: ["Joint Replacement", "Sports Medicine", "Fracture Care", "Physical Therapy"],
  },
  {
    id: "DEPT-004",
    name: "Pediatrics",
    description: "Comprehensive healthcare for infants, children, and adolescents.",
    head: "Dr. Sarah Thompson",
    doctorCount: 15,
    patientCount: 456,
    status: "active",
    floor: "1st Floor, Wing C",
    phone: "(555) 100-2004",
    services: ["Well-child Visits", "Vaccinations", "Developmental Screening", "Pediatric Surgery"],
  },
  {
    id: "DEPT-005",
    name: "Emergency Medicine",
    description: "Immediate care for acute illnesses and injuries.",
    head: "Dr. James Park",
    doctorCount: 20,
    patientCount: 567,
    status: "active",
    floor: "Ground Floor",
    phone: "(555) 100-2005",
    services: ["Trauma Care", "Critical Care", "Emergency Surgery", "Ambulance Services"],
  },
  {
    id: "DEPT-006",
    name: "Dermatology",
    description: "Treatment of skin, hair, and nail conditions.",
    head: "Dr. Lisa Wang",
    doctorCount: 6,
    patientCount: 178,
    status: "active",
    floor: "5th Floor, Wing A",
    phone: "(555) 100-2006",
    services: ["Skin Cancer Screening", "Cosmetic Procedures", "Acne Treatment", "Allergy Testing"],
  },
];

export default function ManageDepartments() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [showDialog, setShowDialog] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    head: "",
    floor: "",
    phone: "",
    services: "",
  });

  const handleOpenDialog = (dept?: Department) => {
    if (dept) {
      setEditingDept(dept);
      setFormData({
        name: dept.name,
        description: dept.description,
        head: dept.head,
        floor: dept.floor,
        phone: dept.phone,
        services: dept.services.join(", "),
      });
    } else {
      setEditingDept(null);
      setFormData({
        name: "",
        description: "",
        head: "",
        floor: "",
        phone: "",
        services: "",
      });
    }
    setShowDialog(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.head) return;

    const servicesList = formData.services
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingDept) {
      setDepartments(
        departments.map((d) =>
          d.id === editingDept.id
            ? {
                ...d,
                name: formData.name,
                description: formData.description,
                head: formData.head,
                floor: formData.floor,
                phone: formData.phone,
                services: servicesList,
              }
            : d
        )
      );
    } else {
      const newDept: Department = {
        id: `DEPT-${String(departments.length + 1).padStart(3, "0")}`,
        name: formData.name,
        description: formData.description,
        head: formData.head,
        doctorCount: 0,
        patientCount: 0,
        status: "active",
        floor: formData.floor,
        phone: formData.phone,
        services: servicesList,
      };
      setDepartments([...departments, newDept]);
    }

    setShowDialog(false);
  };

  const toggleStatus = (id: string) => {
    setDepartments(
      departments.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "active" ? "inactive" : "active" }
          : d
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage hospital departments and their configurations
          </p>
        </div>
        <button
          onClick={() => handleOpenDialog()}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Department
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Departments</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {departments.length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {departments.filter((d) => d.status === "active").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Doctors</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {departments.reduce((sum, d) => sum + d.doctorCount, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Patients</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {departments.reduce((sum, d) => sum + d.patientCount, 0)}
          </p>
        </div>
      </div>

      {/* Department cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏥</span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  dept.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {dept.status.charAt(0).toUpperCase() + dept.status.slice(1)}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {dept.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
              {dept.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">👤</span>
                <span className="text-gray-600">Head: {dept.head}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">📍</span>
                <span className="text-gray-600">{dept.floor}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">📞</span>
                <span className="text-gray-600">{dept.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 py-3 border-t border-b border-gray-100">
              <div className="flex-1 text-center">
                <p className="text-lg font-bold text-blue-600">
                  {dept.doctorCount}
                </p>
                <p className="text-xs text-gray-500">Doctors</p>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex-1 text-center">
                <p className="text-lg font-bold text-purple-600">
                  {dept.patientCount}
                </p>
                <p className="text-xs text-gray-500">Patients</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">
                Services:
              </p>
              <div className="flex flex-wrap gap-1">
                {dept.services.slice(0, 3).map((service, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                  >
                    {service}
                  </span>
                ))}
                {dept.services.length > 3 && (
                  <span className="px-2 py-0.0.5 bg-gray-100 text-gray-600 rounded text-xs">
                    +{dept.services.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenDialog(dept)}
                className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => toggleStatus(dept.id)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  dept.status === "active"
                    ? "text-red-600 hover:text-red-700 bg-red-50"
                    : "text-green-600 hover:text-green-700 bg-green-50"
                }`}
              >
                {dept.status === "active" ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingDept ? "Edit Department" : "Add New Department"}
              </h3>
              <button
                onClick={() => setShowDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Cardiology"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  placeholder="Brief description of the department..."
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Head
                </label>
                <input
                  type="text"
                  value={formData.head}
                  onChange={(e) =>
                    setFormData({ ...formData, head: e.target.value })
                  }
                  placeholder="Dr. John Smith"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Floor / Location
                  </label>
                  <input
                    type="text"
                    value={formData.floor}
                    onChange={(e) =>
                      setFormData({ ...formData, floor: e.target.value })
                    }
                    placeholder="3rd Floor, Wing A"
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="(555) 000-0000"
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Services (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.services}
                  onChange={(e) =>
                    setFormData({ ...formData, services: e.target.value })
                  }
                  placeholder="ECG, Echocardiogram, Cardiac Surgery"
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingDept ? "Save Changes" : "Add Department"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
