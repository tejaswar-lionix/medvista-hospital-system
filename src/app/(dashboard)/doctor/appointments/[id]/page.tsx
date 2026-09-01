"use client";

import { useState } from "react";
import Link from "next/link";

const appointmentData = {
  id: "APT001",
  date: "2026-01-15",
  time: "10:00 AM",
  type: "Follow-up",
  reason: "Follow-up for cholesterol management and review of recent blood work results",
  status: "in-progress",
};

const patientData = {
  id: "PAT001",
  name: "John Doe",
  age: 40,
  gender: "Male",
  phone: "+1 (555) 123-4567",
  email: "john.doe@email.com",
  bloodGroup: "O+",
  allergies: ["Penicillin", "Sulfa drugs"],
  chronicConditions: ["Hypercholesterolemia"],
  insuranceProvider: "Blue Cross Blue Shield",
  lastVisit: "2025-12-10",
};

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface Vitals {
  bloodPressureSystolic: string;
  bloodPressureDiastolic: string;
  heartRate: string;
  temperature: string;
  weight: string;
  heightFeet: string;
  heightInches: string;
  oxygenSaturation: string;
}

export default function DoctorConsultationPage() {
  const [diagnosis, setDiagnosis] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpNotes, setFollowUpNotes] = useState("");

  const [medicines, setMedicines] = useState<Medicine[]>([
    { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
  ]);

  const [vitals, setVitals] = useState<Vitals>({
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
    temperature: "",
    weight: "",
    heightFeet: "",
    heightInches: "",
    oxygenSaturation: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [activeSection, setActiveSection] = useState<"vitals" | "diagnosis" | "prescription" | "notes">("vitals");

  const handleVitalsChange = (field: keyof Vitals, value: string) => {
    setVitals((prev) => ({ ...prev, [field]: value }));
  };

  const handleMedicineChange = (index: number, field: keyof Medicine, value: string) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", frequency: "", duration: "", instructions: "" }]);
  };

  const removeMedicine = (index: number) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((_, i) => i !== index));
    }
  };

  const calculateBMI = (): string => {
    if (vitals.weight && vitals.heightFeet) {
      const weightKg = parseFloat(vitals.weight) * 0.453592;
      const heightM = (parseFloat(vitals.heightFeet) * 12 + parseFloat(vitals.heightInches || "0")) * 0.0254;
      if (heightM > 0) {
        return (weightKg / (heightM * heightM)).toFixed(1);
      }
    }
    return "--";
  };

  const handleSaveProgress = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    alert("Progress saved successfully!");
  };

  const handleCompleteAppointment = async () => {
    if (!diagnosis.trim()) {
      alert("Please enter a diagnosis before completing the appointment.");
      return;
    }
    setIsCompleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsCompleting(false);
    alert("Appointment completed successfully! Medical record has been created.");
    window.location.href = "/doctor/appointments";
  };

  const sections = [
    { key: "vitals", label: "Vitals" },
    { key: "diagnosis", label: "Diagnosis" },
    { key: "prescription", label: "Prescription" },
    { key: "notes", label: "Notes" },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/doctor/appointments" className="text-blue-600 hover:text-blue-800 text-sm">
          ← Back to Appointments
        </Link>
        <div className="flex justify-between items-start mt-2">
          <div>
            <h1 className="text-2xl font-bold">Consultation - {patientData.name}</h1>
            <p className="text-gray-500 text-sm">
              Appointment #{appointmentData.id} · {appointmentData.date} at {appointmentData.time}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSaveProgress}
              disabled={isSaving}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Progress"}
            </button>
            <button
              onClick={handleCompleteAppointment}
              disabled={isCompleting}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium disabled:opacity-50"
            >
              {isCompleting ? "Completing..." : "Complete Appointment"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Patient Info */}
        <div className="space-y-6">
          {/* Patient Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                {patientData.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold text-lg">{patientData.name}</p>
                <p className="text-sm text-gray-500">{patientData.id}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Age / Gender</span>
                <span className="font-medium">{patientData.age} / {patientData.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Blood Group</span>
                <span className="font-medium">{patientData.bloodGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span className="font-medium">{patientData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Visit</span>
                <span className="font-medium">{patientData.lastVisit}</span>
              </div>
            </div>
          </div>

          {/* Allergies & Conditions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Medical Alerts</h2>
            <div className="space-y-3">
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

          {/* Appointment Reason */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Reason for Visit</h2>
            <p className="text-gray-700">{appointmentData.reason}</p>
          </div>
        </div>

        {/* Right Column - Consultation Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section Tabs */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b">
              <div className="flex">
                {sections.map((section) => (
                  <button
                    key={section.key}
                    onClick={() => setActiveSection(section.key)}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeSection === section.key
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {/* Vitals Section */}
              {activeSection === "vitals" && (
                <div className="space-y-4">
                  <h3 className="text-md font-semibold mb-4">Record Patient Vitals</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">BP Systolic (mmHg)</label>
                      <input
                        type="number"
                        value={vitals.bloodPressureSystolic}
                        onChange={(e) => handleVitalsChange("bloodPressureSystolic", e.target.value)}
                        placeholder="120"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">BP Diastolic (mmHg)</label>
                      <input
                        type="number"
                        value={vitals.bloodPressureDiastolic}
                        onChange={(e) => handleVitalsChange("bloodPressureDiastolic", e.target.value)}
                        placeholder="80"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate (bpm)</label>
                      <input
                        type="number"
                        value={vitals.heartRate}
                        onChange={(e) => handleVitalsChange("heartRate", e.target.value)}
                        placeholder="72"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°F)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={vitals.temperature}
                        onChange={(e) => handleVitalsChange("temperature", e.target.value)}
                        placeholder="98.6"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
                      <input
                        type="number"
                        value={vitals.weight}
                        onChange={(e) => handleVitalsChange("weight", e.target.value)}
                        placeholder="170"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Height (ft)</label>
                      <input
                        type="number"
                        value={vitals.heightFeet}
                        onChange={(e) => handleVitalsChange("heightFeet", e.target.value)}
                        placeholder="5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Height (in)</label>
                      <input
                        type="number"
                        value={vitals.heightInches}
                        onChange={(e) => handleVitalsChange("heightInches", e.target.value)}
                        placeholder="10"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">O2 Saturation (%)</label>
                      <input
                        type="number"
                        value={vitals.oxygenSaturation}
                        onChange={(e) => handleVitalsChange("oxygenSaturation", e.target.value)}
                        placeholder="98"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm font-medium text-gray-700">
                      Calculated BMI: <span className="text-lg font-bold">{calculateBMI()}</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Diagnosis Section */}
              {activeSection === "diagnosis" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis *</label>
                    <input
                      type="text"
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      placeholder="Enter primary diagnosis"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
                    <textarea
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      rows={3}
                      placeholder="List symptoms observed or reported by patient"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Prescription Section */}
              {activeSection === "prescription" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold">Prescriptions</h3>
                    <button
                      onClick={addMedicine}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      + Add Medicine
                    </button>
                  </div>
                  {medicines.map((med, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">Medicine #{index + 1}</span>
                        {medicines.length > 1 && (
                          <button
                            onClick={() => removeMedicine(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Medicine Name</label>
                          <input
                            type="text"
                            value={med.name}
                            onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                            placeholder="e.g. Amoxicillin"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Dosage</label>
                          <input
                            type="text"
                            value={med.dosage}
                            onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                            placeholder="e.g. 500mg"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Frequency</label>
                          <select
                            value={med.frequency}
                            onChange={(e) => handleMedicineChange(index, "frequency", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select frequency</option>
                            <option value="Once daily">Once daily</option>
                            <option value="Twice daily">Twice daily</option>
                            <option value="Three times daily">Three times daily</option>
                            <option value="Every 4 hours">Every 4 hours</option>
                            <option value="Every 6 hours">Every 6 hours</option>
                            <option value="Every 8 hours">Every 8 hours</option>
                            <option value="As needed">As needed</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Duration</label>
                          <input
                            type="text"
                            value={med.duration}
                            onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                            placeholder="e.g. 7 days"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Special Instructions</label>
                        <input
                          type="text"
                          value={med.instructions}
                          onChange={(e) => handleMedicineChange(index, "instructions", e.target.value)}
                          placeholder="e.g. Take with food"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Notes Section */}
              {activeSection === "notes" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={5}
                      placeholder="Enter detailed clinical notes about the consultation..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold mb-3">Follow-up</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                        <input
                          type="date"
                          value={followUpDate}
                          onChange={(e) => setFollowUpDate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Notes</label>
                        <input
                          type="text"
                          value={followUpNotes}
                          onChange={(e) => setFollowUpNotes(e.target.value)}
                          placeholder="e.g. Bring lab results"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
