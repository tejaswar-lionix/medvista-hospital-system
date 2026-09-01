"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

const doctors = [
  { id: "DOC001", name: "Dr. Sarah Johnson", department: "Cardiology" },
  { id: "DOC002", name: "Dr. Michael Chen", department: "Neurology" },
  { id: "DOC003", name: "Dr. Emily Rodriguez", department: "Orthopedics" },
  { id: "DOC004", name: "Dr. James Wilson", department: "Pediatrics" },
  { id: "DOC005", name: "Dr. Lisa Brown", department: "Dermatology" },
  { id: "DOC006", name: "Dr. David Kim", department: "Oncology" },
  { id: "DOC007", name: "Dr. Rachel Green", department: "General Medicine" },
  { id: "DOC008", name: "Dr. Robert Taylor", department: "ENT" },
];

interface Service {
  name: string;
  description: string;
  fee: string;
}

interface WorkingDay {
  day: string;
  enabled: boolean;
  openTime: string;
  closeTime: string;
}

const initialWorkingDays: WorkingDay[] = [
  { day: "Monday", enabled: true, openTime: "08:00", closeTime: "20:00" },
  { day: "Tuesday", enabled: true, openTime: "08:00", closeTime: "20:00" },
  { day: "Wednesday", enabled: true, openTime: "08:00", closeTime: "20:00" },
  { day: "Thursday", enabled: true, openTime: "08:00", closeTime: "20:00" },
  { day: "Friday", enabled: true, openTime: "08:00", closeTime: "20:00" },
  { day: "Saturday", enabled: true, openTime: "09:00", closeTime: "14:00" },
  { day: "Sunday", enabled: false, openTime: "00:00", closeTime: "00:00" },
];

export default function AddDepartmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    headDoctor: "",
    phone: "",
    email: "",
    location: "",
    floor: "",
    capacity: "",
  });

  const [services, setServices] = useState<Service[]>([
    { name: "", description: "", fee: "" },
  ]);

  const [workingDays, setWorkingDays] = useState<WorkingDay[]>(initialWorkingDays);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleServiceChange = (index: number, field: keyof Service, value: string) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const addService = () => {
    setServices([...services, { name: "", description: "", fee: "" }]);
  };

  const removeService = (index: number) => {
    if (services.length > 1) {
      setServices(services.filter((_, i) => i !== index));
    }
  };

  const handleWorkingDayToggle = (index: number) => {
    const updated = [...workingDays];
    updated[index].enabled = !updated[index].enabled;
    setWorkingDays(updated);
  };

  const handleWorkingDayTime = (index: number, field: "openTime" | "closeTime", value: string) => {
    const updated = [...workingDays];
    updated[index][field] = value;
    setWorkingDays(updated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Department name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.headDoctor) newErrors.headDoctor = "Head doctor must be assigned";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const departmentData = {
        ...formData,
        services: services.filter((s) => s.name.trim()),
        workingDays: workingDays.filter((d) => d.enabled),
        image: imagePreview,
      };
      console.log("Department data submitted:", departmentData);
      alert("Department added successfully!");
    } catch {
      alert("Error adding department");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/admin/departments" className="text-blue-600 hover:text-blue-800 text-sm">
          ← Back to Departments
        </Link>
        <h1 className="text-2xl font-bold mt-2">Add New Department</h1>
        <p className="text-gray-500 text-sm">Create a new department in the hospital</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Department Image */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Department Image</h2>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-xs text-center">No Image</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-400 mt-1">Recommended: 800x600px. JPG or PNG.</p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Cardiology Department"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Brief description of the department..."
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Head Doctor *</label>
                <select
                  name="headDoctor"
                  value={formData.headDoctor}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.headDoctor ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select Head Doctor</option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} ({doc.department})
                    </option>
                  ))}
                </select>
                {errors.headDoctor && <p className="text-red-500 text-xs mt-1">{errors.headDoctor}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location / Wing</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Building A, Wing B"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                <input
                  type="text"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  placeholder="e.g. 3rd Floor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bed Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Services Offered */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Services Offered</h2>
            <button
              type="button"
              onClick={addService}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              + Add Service
            </button>
          </div>
          {services.map((service, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 p-3 bg-gray-50 rounded-md">
              <input
                type="text"
                placeholder="Service name"
                value={service.name}
                onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={service.description}
                onChange={(e) => handleServiceChange(index, "description", e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Fee ($)"
                value={service.fee}
                onChange={(e) => handleServiceChange(index, "fee", e.target.value)}
                min="0"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {services.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Working Hours */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Working Hours</h2>
          <div className="space-y-3">
            {workingDays.map((day, index) => (
              <div key={day.day} className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
                <label className="flex items-center gap-2 w-32">
                  <input
                    type="checkbox"
                    checked={day.enabled}
                    onChange={() => handleWorkingDayToggle(index)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="font-medium text-sm">{day.day}</span>
                </label>
                {day.enabled ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={day.openTime}
                      onChange={(e) => handleWorkingDayTime(index, "openTime", e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      value={day.closeTime}
                      onChange={(e) => handleWorkingDayTime(index, "closeTime", e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <Link
            href="/admin/departments"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Department..." : "Create Department"}
          </button>
        </div>
      </form>
    </div>
  );
}
