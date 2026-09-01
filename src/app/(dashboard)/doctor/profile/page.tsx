"use client";

import { useState } from "react";

export default function DoctorProfile() {
  const [isSaved, setIsSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<"personal" | "qualifications" | "settings">("personal");

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Robert",
    lastName: "Williams",
    email: "r.williams@hospital.com",
    phone: "(555) 100-2000",
    dateOfBirth: "1975-03-15",
    gender: "Male",
    address: "123 Medical Center Dr, Suite 400",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
  });

  const [qualifications, setQualifications] = useState({
    licenseNumber: "MED-2024-12345",
    licenseState: "Illinois",
    licenseExpiry: "2028-12-31",
    npiNumber: "1234567890",
    boardCertifications: "Internal Medicine, Cardiology",
    medicalSchool: "Johns Hopkins University",
    residency: "Massachusetts General Hospital",
    fellowship: "Cleveland Clinic - Cardiology",
    yearsOfExperience: 15,
  });

  const [settings, setSettings] = useState({
    specialization: "Cardiology",
    consultationFee: "250",
    followUpFee: "150",
    appointmentDuration: "30",
    maxPatientsPerDay: "20",
    notifyNewAppointment: true,
    notifyCancellation: true,
    notifyReminder: true,
  });

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const sections = [
    { key: "personal" as const, label: "Personal Info" },
    { key: "qualifications" as const, label: "Qualifications" },
    { key: "settings" as const, label: "Practice Settings" },
  ];

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Profile Settings
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your account and practice information
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isSaved
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isSaved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeSection === section.key
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Personal Info */}
      {activeSection === "personal" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-semibold text-blue-700">RW</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Dr. {personalInfo.firstName} {personalInfo.lastName}
              </h2>
              <p className="text-gray-500">{settings.specialization}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                value={personalInfo.firstName}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, firstName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                value={personalInfo.lastName}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, lastName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                value={personalInfo.dateOfBirth}
                onChange={(e) =>
                  setPersonalInfo({
                    ...personalInfo,
                    dateOfBirth: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Gender
              </label>
              <select
                value={personalInfo.gender}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, gender: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1.5">
                Address
              </label>
              <input
                type="text"
                value={personalInfo.address}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, address: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">City</label>
              <input
                type="text"
                value={personalInfo.city}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, city: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  State
                </label>
                <input
                  type="text"
                  value={personalInfo.state}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, state: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  ZIP
                </label>
                <input
                  type="text"
                  value={personalInfo.zipCode}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      zipCode: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Qualifications */}
      {activeSection === "qualifications" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                License Number
              </label>
              <input
                type="text"
                value={qualifications.licenseNumber}
                onChange={(e) =>
                  setQualifications({
                    ...qualifications,
                    licenseNumber: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                License State
              </label>
              <input
                type="text"
                value={qualifications.licenseState}
                onChange={(e) =>
                  setQualifications({
                    ...qualifications,
                    licenseState: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                License Expiry
              </label>
              <input
                type="date"
                value={qualifications.licenseExpiry}
                onChange={(e) =>
                  setQualifications({
                    ...qualifications,
                    licenseExpiry: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                NPI Number
              </label>
              <input
                type="text"
                value={qualifications.npiNumber}
                onChange={(e) =>
                  setQualifications({
                    ...qualifications,
                    npiNumber: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1.5">
                Board Certifications
              </label>
              <input
                type="text"
                value={qualifications.boardCertifications}
                onChange={(e) =>
                  setQualifications({
                    ...qualifications,
                    boardCertifications: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1.5">
                Medical School
              </label>
              <input
                type="text"
                value={qualifications.medicalSchool}
                onChange={(e) =>
                  setQualifications({
                    ...qualifications,
                    medicalSchool: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1.5">
                Residency
              </label>
              <input
                type="text"
                value={qualifications.residency}
                onChange={(e) =>
                  setQualifications({
                    ...qualifications,
                    residency: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1.5">
                Fellowship
              </label>
              <input
                type="text"
                value={qualifications.fellowship}
                onChange={(e) =>
                  setQualifications({
                    ...qualifications,
                    fellowship: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">
                Years of Experience
              </label>
              <input
                type="number"
                value={qualifications.yearsOfExperience}
                onChange={(e) =>
                  setQualifications({
                    ...qualifications,
                    yearsOfExperience: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Practice Settings */}
      {activeSection === "settings" && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Specialization & Fees
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Specialization
                </label>
                <select
                  value={settings.specialization}
                  onChange={(e) =>
                    setSettings({ ...settings, specialization: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Cardiology</option>
                  <option>Dermatology</option>
                  <option>Endocrinology</option>
                  <option>General Practice</option>
                  <option>Internal Medicine</option>
                  <option>Neurology</option>
                  <option>Oncology</option>
                  <option>Orthopedics</option>
                  <option>Pediatrics</option>
                  <option>Pulmonology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Consultation Fee ($)
                </label>
                <input
                  type="number"
                  value={settings.consultationFee}
                  onChange={(e) =>
                    setSettings({ ...settings, consultationFee: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Follow-up Fee ($)
                </label>
                <input
                  type="number"
                  value={settings.followUpFee}
                  onChange={(e) =>
                    setSettings({ ...settings, followUpFee: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Appointment Duration (min)
                </label>
                <select
                  value={settings.appointmentDuration}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      appointmentDuration: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">
                  Max Patients Per Day
                </label>
                <input
                  type="number"
                  value={settings.maxPatientsPerDay}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maxPatientsPerDay: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-4">
              {[
                {
                  key: "notifyNewAppointment",
                  label: "New appointment booked",
                  desc: "Get notified when a patient books an appointment",
                },
                {
                  key: "notifyCancellation",
                  label: "Appointment cancelled",
                  desc: "Get notified when a patient cancels",
                },
                {
                  key: "notifyReminder",
                  label: "Daily schedule reminder",
                  desc: "Receive a summary of tomorrow's appointments",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      setSettings({
                        ...settings,
                        [item.key]: !settings[item.key as keyof typeof settings],
                      })
                    }
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      settings[item.key as keyof typeof settings]
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        settings[item.key as keyof typeof settings]
                          ? "translate-x-5"
                          : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
