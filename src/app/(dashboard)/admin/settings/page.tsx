"use client";

import { useState } from "react";

interface HospitalInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  registrationNumber: string;
}

interface WorkingHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  appointmentReminders: boolean;
  billingAlerts: boolean;
  feedbackNotifications: boolean;
  systemUpdates: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"hospital" | "hours" | "notifications">("hospital");

  const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo>({
    name: "HealthCare Plus Hospital",
    address: "123 Medical Center Drive, Healthcare City, HC 12345",
    phone: "(555) 100-2000",
    email: "admin@healthcareplus.com",
    website: "www.healthcareplus.com",
    registrationNumber: "HCR-2024-001234",
  });

  const [workingHours, setWorkingHours] = useState<WorkingHours[]>([
    { day: "Monday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
    { day: "Tuesday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
    { day: "Wednesday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
    { day: "Thursday", isOpen: true, openTime: "08:00", closeTime: "20:00" },
    { day: "Friday", isOpen: true, openTime: "08:00", closeTime: "18:00" },
    { day: "Saturday", isOpen: true, openTime: "09:00", closeTime: "14:00" },
    { day: "Sunday", isOpen: false, openTime: "00:00", closeTime: "00:00" },
  ]);

  const [notifications, setNotifications] = useState<NotificationPreferences>({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    billingAlerts: true,
    feedbackNotifications: true,
    systemUpdates: false,
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveHospitalInfo = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const toggleWorkingHours = (index: number) => {
    setWorkingHours(
      workingHours.map((wh, i) =>
        i === index ? { ...wh, isOpen: !wh.isOpen } : wh
      )
    );
  };

  const updateTime = (index: number, field: "openTime" | "closeTime", value: string) => {
    setWorkingHours(
      workingHours.map((wh, i) =>
        i === index ? { ...wh, [field]: value } : wh
      )
    );
  };

  const toggleNotification = (key: keyof NotificationPreferences) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure hospital settings and preferences
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {[
            { id: "hospital", label: "Hospital Info" },
            { id: "hours", label: "Working Hours" },
            { id: "notifications", label: "Notifications" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "hospital" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Hospital Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hospital Name
              </label>
              <input
                type="text"
                value={hospitalInfo.name}
                onChange={(e) =>
                  setHospitalInfo({ ...hospitalInfo, name: e.target.value })
                }
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number
              </label>
              <input
                type="text"
                value={hospitalInfo.registrationNumber}
                onChange={(e) =>
                  setHospitalInfo({
                    ...hospitalInfo,
                    registrationNumber: e.target.value,
                  })
                }
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                value={hospitalInfo.address}
                onChange={(e) =>
                  setHospitalInfo({ ...hospitalInfo, address: e.target.value })
                }
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={hospitalInfo.phone}
                onChange={(e) =>
                  setHospitalInfo({ ...hospitalInfo, phone: e.target.value })
                }
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={hospitalInfo.email}
                onChange={(e) =>
                  setHospitalInfo({ ...hospitalInfo, email: e.target.value })
                }
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="url"
                value={hospitalInfo.website}
                onChange={(e) =>
                  setHospitalInfo({ ...hospitalInfo, website: e.target.value })
                }
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleSaveHospitalInfo}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            {isSaved && (
              <span className="text-sm text-green-600 font-medium">
                Changes saved successfully!
              </span>
            )}
          </div>
        </div>
      )}

      {activeTab === "hours" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Working Hours Configuration
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Set the hospital operating hours for each day of the week.
          </p>
          <div className="space-y-4">
            {workingHours.map((schedule, index) => (
              <div
                key={schedule.day}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  schedule.isOpen
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="w-28">
                  <span className="text-sm font-medium text-gray-900">
                    {schedule.day}
                  </span>
                </div>

                <Toggle
                  enabled={schedule.isOpen}
                  onToggle={() => toggleWorkingHours(index)}
                />

                {schedule.isOpen ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="time"
                      value={schedule.openTime}
                      onChange={(e) =>
                        updateTime(index, "openTime", e.target.value)
                      }
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      value={schedule.closeTime}
                      onChange={(e) =>
                        updateTime(index, "closeTime", e.target.value)
                      }
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ) : (
                  <span className="text-sm text-gray-500 italic">
                    Closed
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Save Working Hours
            </button>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Notification Preferences
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Configure how and when notifications are sent to staff and patients.
          </p>
          <div className="space-y-6">
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Delivery Channels
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Email Notifications
                    </p>
                    <p className="text-xs text-gray-500">
                      Receive notifications via email
                    </p>
                  </div>
                  <Toggle
                    enabled={notifications.emailNotifications}
                    onToggle={() => toggleNotification("emailNotifications")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      SMS Notifications
                    </p>
                    <p className="text-xs text-gray-500">
                      Receive notifications via text message
                    </p>
                  </div>
                  <Toggle
                    enabled={notifications.smsNotifications}
                    onToggle={() => toggleNotification("smsNotifications")}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Notification Types
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Appointment Reminders
                    </p>
                    <p className="text-xs text-gray-500">
                      Send reminders 24h before scheduled appointments
                    </p>
                  </div>
                  <Toggle
                    enabled={notifications.appointmentReminders}
                    onToggle={() =>
                      toggleNotification("appointmentReminders")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Billing Alerts
                    </p>
                    <p className="text-xs text-gray-500">
                      Notify when payments are due or overdue
                    </p>
                  </div>
                  <Toggle
                    enabled={notifications.billingAlerts}
                    onToggle={() => toggleNotification("billingAlerts")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Feedback Notifications
                    </p>
                    <p className="text-xs text-gray-500">
                      Get notified when patients submit feedback
                    </p>
                  </div>
                  <Toggle
                    enabled={notifications.feedbackNotifications}
                    onToggle={() =>
                      toggleNotification("feedbackNotifications")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      System Updates
                    </p>
                    <p className="text-xs text-gray-500">
                      Notifications about system maintenance and updates
                    </p>
                  </div>
                  <Toggle
                    enabled={notifications.systemUpdates}
                    onToggle={() => toggleNotification("systemUpdates")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
