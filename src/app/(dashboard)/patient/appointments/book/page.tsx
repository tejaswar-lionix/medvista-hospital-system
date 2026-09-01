"use client";

import { useState } from "react";

const departments = [
  { id: "card", name: "Cardiology", icon: "❤️", desc: "Heart and cardiovascular system care", doctors: 12 },
  { id: "neuro", name: "Neurology", icon: "🧠", desc: "Brain, spine, and nervous system", doctors: 8 },
  { id: "ortho", name: "Orthopedics", icon: "🦴", desc: "Bones, joints, and muscles", doctors: 10 },
  { id: "ped", name: "Pediatrics", icon: "👶", desc: "Healthcare for children", doctors: 15 },
  { id: "onco", name: "Oncology", icon: "🎗️", desc: "Cancer diagnosis and treatment", doctors: 9 },
  { id: "derma", name: "Dermatology", icon: "🧴", desc: "Skin, hair, and nail conditions", doctors: 6 },
  { id: "ent", name: "ENT", icon: "👂", desc: "Ear, nose, and throat care", doctors: 7 },
  { id: "general", name: "General", icon: "🩺", desc: "Primary and preventive care", doctors: 20 },
];

const doctorsByDept: Record<string, Array<{ id: string; name: string; rating: number; fee: number; experience: number; available: boolean }>> = {
  card: [
    { id: "d1", name: "Dr. Sarah Smith", rating: 4.9, fee: 250, experience: 15, available: true },
    { id: "d2", name: "Dr. Vikram Singh", rating: 4.8, fee: 280, experience: 14, available: true },
  ],
  neuro: [
    { id: "d3", name: "Dr. Raj Patel", rating: 4.8, fee: 300, experience: 12, available: true },
    { id: "d4", name: "Dr. Rachel Wilson", rating: 4.6, fee: 290, experience: 9, available: false },
  ],
  ortho: [
    { id: "d5", name: "Dr. James Lee", rating: 4.7, fee: 275, experience: 10, available: true },
  ],
  ped: [
    { id: "d6", name: "Dr. Fatima Khan", rating: 4.9, fee: 200, experience: 8, available: true },
  ],
  onco: [
    { id: "d7", name: "Dr. Amit Sharma", rating: 4.8, fee: 350, experience: 18, available: false },
  ],
  derma: [
    { id: "d8", name: "Dr. Emily Chen", rating: 4.6, fee: 225, experience: 7, available: true },
  ],
  ent: [
    { id: "d9", name: "Dr. Michael Gupta", rating: 4.7, fee: 260, experience: 11, available: true },
  ],
  general: [
    { id: "d10", name: "Dr. Lisa Jones", rating: 4.9, fee: 180, experience: 20, available: true },
  ],
};

const timeSlots = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM",
];

const bookedSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "03:00 PM", "04:30 PM"];

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const [currentMonth] = useState(0);
  const currentYear = 2024;

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const selectedDeptData = departments.find((d) => d.id === selectedDept);
  const selectedDoctorData = doctorsByDept[selectedDept || ""]?.find((d) => d.id === selectedDoctor);

  const progress = (step / 4) * 100;

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked!</h2>
          <p className="text-gray-500 mb-8">
            Your appointment has been confirmed. A confirmation email has been sent to your registered email address.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 text-left max-w-sm mx-auto mb-8">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Doctor</span>
                <span className="font-medium text-gray-900">{selectedDoctorData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Department</span>
                <span className="font-medium text-gray-900">{selectedDeptData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-medium text-gray-900">January {selectedDate}, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time</span>
                <span className="font-medium text-gray-900">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fee</span>
                <span className="font-medium text-gray-900">${selectedDoctorData?.fee}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <a
              href="/patient"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </a>
            <button
              onClick={() => { setSuccess(false); setStep(1); setSelectedDept(null); setSelectedDoctor(null); setSelectedDate(null); setSelectedTime(null); }}
              className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Book an Appointment</h1>
        <p className="text-gray-500 text-sm">Follow the steps below to schedule your visit.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {["Select Department", "Choose Doctor", "Pick Date & Time", "Confirm"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
                step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className={`text-sm font-medium hidden md:inline ${step === i + 1 ? "text-blue-600" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step 1: Department Selection */}
      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select a Department</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`p-6 rounded-xl border-2 text-left transition hover:shadow-md ${
                  selectedDept === dept.id
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="text-3xl mb-3">{dept.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{dept.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{dept.desc}</p>
                <span className="text-xs text-blue-600 font-medium">{dept.doctors} doctors available</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Doctor Selection */}
      {step === 2 && selectedDept && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose a Doctor — {selectedDeptData?.name}</h2>
          <div className="space-y-4">
            {doctorsByDept[selectedDept]?.map((doc) => (
              <button
                key={doc.id}
                onClick={() => doc.available && setSelectedDoctor(doc.id)}
                disabled={!doc.available}
                className={`w-full p-6 rounded-xl border-2 text-left transition flex items-center gap-6 ${
                  !doc.available
                    ? "border-gray-200 opacity-50 cursor-not-allowed"
                    : selectedDoctor === doc.id
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {doc.name.split(" ").slice(1).map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.experience} years experience</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium text-gray-900">{doc.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${doc.fee}</div>
                  <div className="text-sm text-gray-500">per visit</div>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    doc.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {doc.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Date & Time */}
      {step === 3 && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select a Date</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-center font-semibold text-gray-900 mb-4">January 2024</div>
              <div className="grid grid-cols-7 gap-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div key={i} className="text-center text-xs font-medium text-gray-400 py-2">{d}</div>
                ))}
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isPast = day < 15;
                  const isSunday = new Date(currentYear, currentMonth, day).getDay() === 0;
                  return (
                    <button
                      key={day}
                      onClick={() => !isPast && !isSunday && setSelectedDate(day)}
                      disabled={isPast || isSunday}
                      className={`aspect-square rounded-lg text-sm font-medium transition ${
                        isPast || isSunday
                          ? "text-gray-300 cursor-not-allowed"
                          : selectedDate === day
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select a Time</h2>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                return (
                  <button
                    key={slot}
                    onClick={() => !isBooked && setSelectedTime(slot)}
                    disabled={isBooked}
                    className={`py-3 rounded-lg text-sm font-medium transition ${
                      isBooked
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                        : selectedTime === slot
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Confirm Your Appointment</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  {selectedDeptData?.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedDoctorData?.name}</h3>
                  <p className="text-blue-200">{selectedDeptData?.name} Department</p>
                </div>
              </div>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Date</div>
                  <div className="font-medium text-gray-900">January {selectedDate}, 2024</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Time</div>
                  <div className="font-medium text-gray-900">{selectedTime}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Consultation Fee</div>
                  <div className="font-medium text-gray-900">${selectedDoctorData?.fee}</div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Reason for Visit / Symptoms</label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe your symptoms or reason for visit..."
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm resize-none h-28 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50"
        >
          ← Back
        </button>
        <div>
          {step < 4 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={
                (step === 1 && !selectedDept) ||
                (step === 2 && !selectedDoctor) ||
                (step === 3 && (!selectedDate || !selectedTime))
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Booking...
                </span>
              ) : (
                "Confirm Booking"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
