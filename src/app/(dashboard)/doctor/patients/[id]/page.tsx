"use client";

import { useState } from "react";
import Link from "next/link";

const patientData = {
  id: "PAT001",
  name: "John Doe",
  age: 40,
  gender: "Male",
  phone: "+1 (555) 123-4567",
  email: "john.doe@email.com",
  dateOfBirth: "1985-06-15",
  bloodGroup: "O+",
  address: "123 Main Street, New York, NY 10001",
  emergencyContact: "Jane Doe - +1 (555) 987-6543",
  insuranceProvider: "Blue Cross Blue Shield",
  allergies: ["Penicillin", "Sulfa drugs"],
  chronicConditions: ["Hypercholesterolemia"],
  registeredDate: "2023-01-15",
};

const medicalHistory = [
  {
    id: "MH001",
    date: "2026-01-15",
    type: "Consultation",
    title: "Follow-up - Cholesterol Management",
    doctor: "Dr. Sarah Johnson",
    description: "LDL improved from 160 to 130 mg/dL. Continue current medication and lifestyle modifications.",
    status: "completed",
  },
  {
    id: "MH002",
    date: "2025-12-10",
    type: "Visit",
    title: "Annual Checkup",
    doctor: "Dr. Sarah Johnson",
    description: "Routine annual physical examination. All vitals normal. Blood work ordered.",
    status: "completed",
  },
  {
    id: "MH003",
    date: "2025-11-05",
    type: "Lab Result",
    title: "Blood Work Results",
    doctor: "Dr. Sarah Johnson",
    description: "CBC, Lipid Panel, Metabolic Panel. Cholesterol slightly elevated at 210 mg/dL.",
    status: "completed",
  },
  {
    id: "MH004",
    date: "2025-09-20",
    type: "Prescription",
    title: "Antibiotic Course",
    doctor: "Dr. Michael Chen",
    description: "Prescribed Amoxicillin 500mg for 10 days for sinus infection.",
    status: "completed",
  },
];

const pastPrescriptions = [
  {
    id: "RX001",
    date: "2026-01-15",
    doctor: "Dr. Sarah Johnson",
    medicines: [
      { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily (evening)", duration: "3 months" },
    ],
    notes: "Continue current dosage. Recheck lipid panel in 3 months.",
  },
  {
    id: "RX002",
    date: "2025-12-10",
    doctor: "Dr. Sarah Johnson",
    medicines: [
      { name: "Vitamin D3", dosage: "1000 IU", frequency: "Once daily", duration: "3 months" },
      { name: "Fish Oil", dosage: "1000mg", frequency: "Once daily", duration: "3 months" },
    ],
    notes: "Continue healthy diet and regular exercise.",
  },
  {
    id: "RX003",
    date: "2025-09-20",
    doctor: "Dr. Michael Chen",
    medicines: [
      { name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", duration: "10 days" },
      { name: "Pseudoephedrine", dosage: "30mg", frequency: "Every 6 hours", duration: "7 days" },
    ],
    notes: "Complete the full course of antibiotics.",
  },
];

const appointmentHistory = [
  { id: "APT001", date: "2026-01-15", time: "10:00 AM", type: "Follow-up", status: "completed", notes: "Cholesterol follow-up" },
  { id: "APT002", date: "2025-12-10", time: "10:00 AM", type: "Checkup", status: "completed", notes: "Annual checkup" },
  { id: "APT003", date: "2025-11-05", time: "02:30 PM", type: "Follow-up", status: "completed", notes: "Lab results review" },
  { id: "APT004", date: "2026-03-15", time: "09:00 AM", type: "Follow-up", status: "scheduled", notes: "Lipid panel recheck" },
];

const vitalsHistory = [
  { date: "2026-01-15", bp: "128/82", hr: 72, temp: 98.6, weight: 178, bmi: 25.5 },
  { date: "2025-12-10", bp: "132/85", hr: 75, temp: 98.4, weight: 180, bmi: 25.8 },
  { date: "2025-11-05", bp: "130/84", hr: 74, temp: 98.5, weight: 181, bmi: 25.9 },
  { date: "2025-09-20", bp: "126/80", hr: 70, temp: 99.2, weight: 179, bmi: 25.6 },
];

export default function DoctorPatientDetailPage() {
  const [activeTab, setActiveTab] = useState<"history" | "prescriptions" | "appointments" | "vitals">("history");

  const tabs = [
    { key: "history", label: "Medical History" },
    { key: "prescriptions", label: "Past Prescriptions" },
    { key: "appointments", label: "Appointments" },
    { key: "vitals", label: "Vitals Trend" },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/doctor/patients" className="text-blue-600 hover:text-blue-800 text-sm">
          ← Back to Patients
        </Link>
        <h1 className="text-2xl font-bold mt-2">Patient Profile</h1>
      </div>

      {/* Patient Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold flex-shrink-0">
            {patientData.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="font-semibold">{patientData.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Patient ID</p>
              <p className="font-semibold">{patientData.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Date of Birth</p>
              <p className="font-semibold">{patientData.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Blood Group</p>
              <p className="font-semibold">{patientData.bloodGroup}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-semibold">{patientData.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-semibold text-sm">{patientData.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Insurance</p>
              <p className="font-semibold text-sm">{patientData.insuranceProvider}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Registered</p>
              <p className="font-semibold">{patientData.registeredDate}</p>
            </div>
          </div>
        </div>

        {/* Medical Alerts */}
        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-red-600 mb-1">⚠ Allergies</p>
            <div className="flex flex-wrap gap-1">
              {patientData.allergies.map((allergy, i) => (
                <span key={i} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                  {allergy}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-orange-600 mb-1">⚡ Chronic Conditions</p>
            <div className="flex flex-wrap gap-1">
              {patientData.chronicConditions.map((condition, i) => (
                <span key={i} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded border border-orange-200">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Medical History */}
          {activeTab === "history" && (
            <div className="space-y-4">
              {medicalHistory.map((entry) => (
                <div key={entry.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                          entry.type === "Visit" ? "bg-blue-100 text-blue-700" :
                          entry.type === "Lab Result" ? "bg-purple-100 text-purple-700" :
                          entry.type === "Prescription" ? "bg-green-100 text-green-700" :
                          "bg-teal-100 text-teal-700"
                        }`}>
                          {entry.type}
                        </span>
                        <h3 className="font-semibold">{entry.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{entry.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{entry.doctor}</p>
                    </div>
                    <span className="text-sm text-gray-500">{entry.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past Prescriptions */}
          {activeTab === "prescriptions" && (
            <div className="space-y-6">
              {pastPrescriptions.map((rx) => (
                <div key={rx.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">Prescription #{rx.id}</h3>
                      <p className="text-sm text-gray-500">{rx.doctor} · {rx.date}</p>
                    </div>
                  </div>
                  <table className="w-full text-sm mb-3">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium text-gray-500">Medicine</th>
                        <th className="text-left py-2 font-medium text-gray-500">Dosage</th>
                        <th className="text-left py-2 font-medium text-gray-500">Frequency</th>
                        <th className="text-left py-2 font-medium text-gray-500">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rx.medicines.map((med, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-2 font-medium">{med.name}</td>
                          <td className="py-2">{med.dosage}</td>
                          <td className="py-2">{med.frequency}</td>
                          <td className="py-2">{med.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-sm text-gray-600 italic">{rx.notes}</p>
                </div>
              ))}
            </div>
          )}

          {/* Appointments */}
          {activeTab === "appointments" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Time</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Type</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Notes</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentHistory.map((apt) => (
                    <tr key={apt.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2">{apt.date}</td>
                      <td className="py-3 px-2">{apt.time}</td>
                      <td className="py-3 px-2">{apt.type}</td>
                      <td className="py-3 px-2 text-gray-600">{apt.notes}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          apt.status === "completed" ? "bg-green-100 text-green-700" :
                          apt.status === "scheduled" ? "bg-blue-100 text-blue-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Vitals Trend */}
          {activeTab === "vitals" && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-500">Blood Pressure</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-500">Heart Rate</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-500">Temperature</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-500">Weight</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-500">BMI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vitalsHistory.map((v, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2 font-medium">{v.date}</td>
                        <td className="py-3 px-2">
                          <span className={`font-medium ${
                            parseInt(v.bp.split("/")[0]) > 130 ? "text-red-600" : "text-green-600"
                          }`}>
                            {v.bp} mmHg
                          </span>
                        </td>
                        <td className="py-3 px-2">{v.hr} bpm</td>
                        <td className="py-3 px-2">{v.temp}°F</td>
                        <td className="py-3 px-2">{v.weight} lbs</td>
                        <td className="py-3 px-2">
                          <span className={`font-medium ${
                            v.bmi > 25 ? "text-orange-600" : "text-green-600"
                          }`}>
                            {v.bmi}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Visual Trend (Simplified Bar Chart) */}
              <div>
                <h3 className="text-md font-semibold mb-4">Weight Trend</h3>
                <div className="flex items-end gap-2 h-40">
                  {vitalsHistory.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-1">{v.weight}</span>
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${((v.weight - 170) / 15) * 100}%`, minHeight: "20px" }}
                      />
                      <span className="text-xs text-gray-400 mt-1">{v.date.split("-").slice(1).join("/")}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-4">Blood Pressure Trend (Systolic)</h3>
                <div className="flex items-end gap-2 h-40">
                  {vitalsHistory.map((v, i) => {
                    const systolic = parseInt(v.bp.split("/")[0]);
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <span className="text-xs text-gray-500 mb-1">{systolic}</span>
                        <div
                          className={`w-full rounded-t ${systolic > 130 ? "bg-red-400" : "bg-green-400"}`}
                          style={{ height: `${((systolic - 120) / 20) * 100}%`, minHeight: "20px" }}
                        />
                        <span className="text-xs text-gray-400 mt-1">{v.date.split("-").slice(1).join("/")}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
