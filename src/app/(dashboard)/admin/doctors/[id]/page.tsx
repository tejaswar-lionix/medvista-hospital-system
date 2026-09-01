"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface DoctorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  specialization: string;
  bio: string;
  education: string[];
  experience: number;
  consultationFee: number;
  status: "active" | "on-leave" | "inactive";
  availability: {
    [key: string]: { start: string; end: string; available: boolean };
  };
}

const defaultDoctor: DoctorProfile = {
  id: "DOC-001",
  name: "Dr. Michael Chen",
  email: "m.chen@healthcare.com",
  phone: "(555) 123-4567",
  department: "Cardiology",
  specialization: "Interventional Cardiology",
  bio: "Board-certified cardiologist with over 15 years of experience in interventional procedures. Specializes in coronary angioplasty and stenting.",
  education: [
    "MD - Harvard Medical School (2008)",
    "Residency - Massachusetts General Hospital (2011)",
    "Fellowship - Cleveland Clinic (2013)",
  ],
  experience: 15,
  consultationFee: 250,
  status: "active",
  availability: {
    Monday: { start: "09:00", end: "17:00", available: true },
    Tuesday: { start: "09:00", end: "17:00", available: true },
    Wednesday: { start: "09:00", end: "13:00", available: true },
    Thursday: { start: "09:00", end: "17:00", available: true },
    Friday: { start: "09:00", end: "15:00", available: true },
    Saturday: { start: "10:00", end: "14:00", available: false },
    Sunday: { start: "00:00", end: "00:00", available: false },
  },
};

export default function DoctorDetailPage() {
  const params = useParams();
  const doctorId = params.id as string;

  const [doctor, setDoctor] = useState<DoctorProfile>(defaultDoctor);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDoctor, setEditedDoctor] =
    useState<DoctorProfile>(defaultDoctor);
  const [activeTab, setActiveTab] = useState<"profile" | "availability">(
    "profile"
  );

  const handleSave = () => {
    setDoctor(editedDoctor);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDoctor(doctor);
    setIsEditing(false);
  };

  const toggleAvailability = (day: string) => {
    setEditedDoctor({
      ...editedDoctor,
      availability: {
        ...editedDoctor.availability,
        [day]: {
          ...editedDoctor.availability[day],
          available: !editedDoctor.availability[day].available,
        },
      },
    });
  };

  const updateAvailabilityTime = (
    day: string,
    field: "start" | "end",
    value: string
  ) => {
    setEditedDoctor({
      ...editedDoctor,
      availability: {
        ...editedDoctor.availability,
        [day]: {
          ...editedDoctor.availability[day],
          [field]: value,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/doctors"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ←
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {doctor.name}
            </h1>
            <p className="text-sm text-gray-500">
              {doctor.department} • {doctor.specialization}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "profile"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Profile Details
          </button>
          <button
            onClick={() => setActiveTab("availability")}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "availability"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Availability Schedule
          </button>
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedDoctor.name}
                      onChange={(e) =>
                        setEditedDoctor({
                          ...editedDoctor,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2.5">
                      {doctor.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedDoctor.email}
                      onChange={(e) =>
                        setEditedDoctor({
                          ...editedDoctor,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2.5">
                      {doctor.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedDoctor.phone}
                      onChange={(e) =>
                        setEditedDoctor({
                          ...editedDoctor,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2.5">
                      {doctor.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  {isEditing ? (
                    <select
                      value={editedDoctor.department}
                      onChange={(e) =>
                        setEditedDoctor({
                          ...editedDoctor,
                          department: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Emergency Medicine">
                        Emergency Medicine
                      </option>
                      <option value="Dermatology">Dermatology</option>
                    </select>
                  ) : (
                    <p className="text-sm text-gray-900 py-2.5">
                      {doctor.department}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialization
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedDoctor.specialization}
                      onChange={(e) =>
                        setEditedDoctor({
                          ...editedDoctor,
                          specialization: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2.5">
                      {doctor.specialization}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Consultation Fee ($)
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedDoctor.consultationFee}
                      onChange={(e) =>
                        setEditedDoctor({
                          ...editedDoctor,
                          consultationFee: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 py-2.5">
                      ${doctor.consultationFee}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={editedDoctor.bio}
                    onChange={(e) =>
                      setEditedDoctor({ ...editedDoctor, bio: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-600 py-2.5">{doctor.bio}</p>
                )}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Education & Experience
              </h2>
              <div className="space-y-3">
                {doctor.education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-blue-500 mt-0.5">🎓</span>
                    <span className="text-sm text-gray-700">{edu}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Experience:</span>{" "}
                  {doctor.experience} years
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Status
              </h2>
              {isEditing ? (
                <select
                  value={editedDoctor.status}
                  onChange={(e) =>
                    setEditedDoctor({
                      ...editedDoctor,
                      status: e.target.value as DoctorProfile["status"],
                    })
                  }
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
              ) : (
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    doctor.status === "active"
                      ? "bg-green-100 text-green-800"
                      : doctor.status === "on-leave"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {doctor.status
                    .split("-")
                    .map(
                      (word) => word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </span>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Total Patients</span>
                  <span className="text-sm font-semibold text-gray-900">
                    234
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">
                    Appointments Today
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    8
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">
                    Avg. Rating
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-semibold text-gray-900">
                      4.8
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Availability Tab */}
      {activeTab === "availability" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Weekly Schedule
          </h2>
          <div className="space-y-4">
            {Object.entries(
              isEditing
                ? editedDoctor.availability
                : doctor.availability
            ).map(([day, schedule]) => (
              <div
                key={day}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  schedule.available
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="w-24">
                  <span className="text-sm font-medium text-gray-900">
                    {day}
                  </span>
                </div>

                <div className="flex-1 flex items-center gap-4">
                  {isEditing ? (
                    <>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={schedule.available}
                          onChange={() => toggleAvailability(day)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Available</span>
                      </label>
                      {schedule.available && (
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={schedule.start}
                            onChange={(e) =>
                              updateAvailabilityTime(
                                day,
                                "start",
                                e.target.value
                              )
                            }
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={schedule.end}
                            onChange={(e) =>
                              updateAvailabilityTime(
                                day,
                                "end",
                                e.target.value
                              )
                            }
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {schedule.available ? (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-sm text-gray-700">
                            {schedule.start} - {schedule.end}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">
                          Not available
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Note:</span> Changes to
                availability will affect upcoming appointment bookings.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
