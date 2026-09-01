"use client";

import { useState } from "react";
import Link from "next/link";

const recordData = {
  id: "MR001",
  date: "2026-01-15",
  time: "10:30 AM",
  doctor: {
    name: "Dr. Sarah Johnson",
    designation: "Senior Consultant",
    department: "General Medicine",
  },
  patient: {
    id: "PAT001",
    name: "John Doe",
    age: 40,
    gender: "Male",
    bloodGroup: "O+",
  },
  appointmentId: "APT001",
  visitType: "Follow-up",
};

const diagnosisData = {
  primary: "Hypercholesterolemia - Improved",
  secondary: "Mild hypertension - Stable",
  notes: "Patient has been following dietary recommendations. LDL cholesterol improved from 160 to 130 mg/dL. Blood pressure well controlled with current medication. Continue current treatment plan.",
};

const symptomsList = [
  "No acute symptoms reported",
  "Feeling well overall",
  "Mild occasional headache (improved)",
  "Good energy levels",
];

const vitals = {
  bloodPressure: "128/82 mmHg",
  heartRate: "72 bpm",
  temperature: "98.6°F",
  weight: "178 lbs",
  height: "5'10\"",
  bmi: "25.5",
  respiratoryRate: "16 breaths/min",
  oxygenSaturation: "98%",
};

const prescriptions = [
  {
    name: "Atorvastatin",
    dosage: "20mg",
    form: "Tablet",
    frequency: "Once daily (evening)",
    duration: "3 months",
    quantity: 90,
    instructions: "Take with dinner",
    refills: 2,
  },
  {
    name: "Vitamin D3",
    dosage: "1000 IU",
    form: "Softgel",
    frequency: "Once daily",
    duration: "3 months",
    quantity: 90,
    instructions: "Take with breakfast",
    refills: 2,
  },
];

const doctorNotes = "Patient responding well to treatment. LDL cholesterol has improved significantly. Continue Atorvastatin 20mg daily. Maintain current diet and exercise regimen. Patient advised to reduce sodium intake further. Next lipid panel in 3 months.";

const followUpInfo = {
  date: "2026-04-15",
  time: "10:00 AM",
  doctor: "Dr. Sarah Johnson",
  department: "General Medicine",
  reason: "Lipid panel recheck and blood pressure review",
  instructions: "Fast for 12 hours before appointment. Bring lab results from primary care if available.",
};

export default function MedicalRecordDetailPage() {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 500);
  };

  const handleDownload = () => {
    const content = `
MEDICAL RECORD - ${recordData.id}
Date: ${recordData.date} at ${recordData.time}
Doctor: ${recordData.doctor.name} (${recordData.doctor.designation})
Department: ${recordData.doctor.department}
Patient: ${recordData.patient.name} (${recordData.patient.id})

DIAGNOSIS:
Primary: ${diagnosisData.primary}
Secondary: ${diagnosisData.secondary}
Notes: ${diagnosisData.notes}

VITALS:
Blood Pressure: ${vitals.bloodPressure}
Heart Rate: ${vitals.heartRate}
Temperature: ${vitals.temperature}
Weight: ${vitals.weight}
Height: ${vitals.height}
BMI: ${vitals.bmi}

PRESCRIPTIONS:
${prescriptions.map(p => `${p.name} ${p.dosage} - ${p.frequency} for ${p.duration}`).join('\n')}

FOLLOW-UP:
Date: ${followUpInfo.date}
Reason: ${followUpInfo.reason}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `medical-record-${recordData.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 print:hidden">
        <Link href="/patient/records" className="text-blue-600 hover:text-blue-800 text-sm">
          ← Back to Records
        </Link>
        <div className="flex justify-between items-start mt-2">
          <h1 className="text-2xl font-bold">Medical Record</h1>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              disabled={isPrinting}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
            >
              🖨 Print
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium flex items-center gap-2"
            >
              ⬇ Download
            </button>
          </div>
        </div>
      </div>

      {/* Record Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Record ID: {recordData.id}</p>
            <h2 className="text-xl font-bold mt-1">{recordData.visitType} Visit</h2>
            <p className="text-gray-600">{recordData.date} at {recordData.time}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-semibold">{recordData.doctor.department}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">Doctor</p>
            <p className="font-medium text-sm">{recordData.doctor.name}</p>
            <p className="text-xs text-gray-400">{recordData.doctor.designation}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Patient</p>
            <p className="font-medium text-sm">{recordData.patient.name}</p>
            <p className="text-xs text-gray-400">{recordData.patient.age} / {recordData.patient.gender}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Patient ID</p>
            <p className="font-medium text-sm">{recordData.patient.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Blood Group</p>
            <p className="font-medium text-sm">{recordData.patient.bloodGroup}</p>
          </div>
        </div>
      </div>

      {/* Diagnosis */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Diagnosis</h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Primary Diagnosis</p>
            <p className="font-semibold text-lg">{diagnosisData.primary}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Secondary Diagnosis</p>
            <p className="font-medium">{diagnosisData.secondary}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Clinical Notes</p>
            <p className="text-gray-700">{diagnosisData.notes}</p>
          </div>
        </div>
      </div>

      {/* Symptoms */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Symptoms</h2>
        <div className="flex flex-wrap gap-2">
          {symptomsList.map((symptom, i) => (
            <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-md">
              {symptom}
            </span>
          ))}
        </div>
      </div>

      {/* Vitals */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Vitals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">Blood Pressure</p>
            <p className="font-semibold">{vitals.bloodPressure}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">Heart Rate</p>
            <p className="font-semibold">{vitals.heartRate}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">Temperature</p>
            <p className="font-semibold">{vitals.temperature}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">O2 Saturation</p>
            <p className="font-semibold">{vitals.oxygenSaturation}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">Weight</p>
            <p className="font-semibold">{vitals.weight}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">Height</p>
            <p className="font-semibold">{vitals.height}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">BMI</p>
            <p className="font-semibold">{vitals.bmi}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">Respiratory Rate</p>
            <p className="font-semibold">{vitals.respiratoryRate}</p>
          </div>
        </div>
      </div>

      {/* Prescriptions */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Prescription Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium text-gray-500">Medicine</th>
                <th className="text-left py-3 px-2 font-medium text-gray-500">Dosage</th>
                <th className="text-left py-3 px-2 font-medium text-gray-500">Form</th>
                <th className="text-left py-3 px-2 font-medium text-gray-500">Frequency</th>
                <th className="text-left py-3 px-2 font-medium text-gray-500">Duration</th>
                <th className="text-left py-3 px-2 font-medium text-gray-500">Qty</th>
                <th className="text-left py-3 px-2 font-medium text-gray-500">Instructions</th>
                <th className="text-left py-3 px-2 font-medium text-gray-500">Refills</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((rx, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">{rx.name}</td>
                  <td className="py-3 px-2">{rx.dosage}</td>
                  <td className="py-3 px-2">{rx.form}</td>
                  <td className="py-3 px-2">{rx.frequency}</td>
                  <td className="py-3 px-2">{rx.duration}</td>
                  <td className="py-3 px-2">{rx.quantity}</td>
                  <td className="py-3 px-2 text-gray-600">{rx.instructions}</td>
                  <td className="py-3 px-2">{rx.refills}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Follow-up */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Follow-up Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="font-semibold">{followUpInfo.date} at {followUpInfo.time}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Doctor</p>
            <p className="font-semibold">{followUpInfo.doctor}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-semibold">{followUpInfo.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Reason</p>
            <p className="font-semibold">{followUpInfo.reason}</p>
          </div>
          <div className="md:col-span-2 bg-yellow-50 p-4 rounded-md">
            <p className="text-sm font-medium text-yellow-800 mb-1">⚠ Instructions</p>
            <p className="text-sm text-yellow-700">{followUpInfo.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
