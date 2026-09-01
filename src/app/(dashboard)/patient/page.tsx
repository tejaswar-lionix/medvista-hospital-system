"use client";

import { useState } from "react";

const patientProfile = {
  name: "John Smith",
  id: "PAT-2024-001",
  dob: "1985-06-15",
  bloodType: "O+",
  allergies: "Penicillin",
};

const healthSummary = {
  bloodPressure: "120/80",
  heartRate: "72 bpm",
  temperature: "98.6°F",
  weight: "175 lbs",
  cholesterol: "195 mg/dL",
  bloodSugar: "95 mg/dL",
  lastCheckup: "Jan 10, 2024",
  nextCheckup: "Feb 10, 2024",
};

const upcomingAppointments = [
  { id: 1, doctor: "Dr. Sarah Smith", specialty: "Cardiology", date: "Jan 20, 2024", time: "09:00 AM", type: "Follow-up", status: "confirmed" },
  { id: 2, doctor: "Dr. James Lee", specialty: "Orthopedics", date: "Jan 28, 2024", time: "02:30 PM", type: "Consultation", status: "confirmed" },
  { id: 3, doctor: "Dr. Emily Chen", specialty: "General", date: "Feb 10, 2024", time: "11:00 AM", type: "Annual Checkup", status: "pending" },
];

const recentPrescriptions = [
  { id: 1, medication: "Lisinopril 10mg", dosage: "Once daily", prescribedBy: "Dr. Smith", date: "Jan 10, 2024", status: "active" },
  { id: 2, medication: "Aspirin 81mg", dosage: "Once daily", prescribedBy: "Dr. Smith", date: "Jan 10, 2024", status: "active" },
  { id: 3, medication: "Ibuprofen 400mg", dosage: "As needed", prescribedBy: "Dr. Lee", date: "Dec 15, 2023", status: "completed" },
  { id: 4, medication: "Vitamin D 2000IU", dosage: "Once daily", prescribedBy: "Dr. Chen", date: "Nov 20, 2023", status: "active" },
];

const healthTips = [
  { title: "Stay Hydrated", desc: "Drink at least 8 glasses of water daily for optimal health.", icon: "💧" },
  { title: "Regular Exercise", desc: "30 minutes of moderate exercise can reduce heart disease risk.", icon: "🏃" },
  { title: "Balanced Diet", desc: "Include more fruits, vegetables, and whole grains in your meals.", icon: "🥗" },
  { title: "Quality Sleep", desc: "Aim for 7-9 hours of sleep each night for better recovery.", icon: "😴" },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  active: "bg-blue-100 text-blue-700",
  completed: "bg-gray-100 text-gray-600",
};

export default function PatientDashboard() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = () => {
    if (rating > 0) {
      setSubmitted(true);
      setTimeout(() => {
        setFeedbackOpen(false);
        setSubmitted(false);
        setRating(0);
        setFeedbackText("");
      }, 2000);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back, {patientProfile.name}!</h1>
            <p className="text-green-100">
              Patient ID: {patientProfile.id} &bull; Blood Type: {patientProfile.bloodType}
            </p>
            <p className="text-green-200 text-sm mt-2">
              Your next appointment is on Jan 20, 2024 at 09:00 AM.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="text-center bg-white/10 rounded-xl px-6 py-4">
              <div className="text-3xl font-bold">3</div>
              <div className="text-sm text-green-200">Upcoming</div>
            </div>
            <div className="text-center bg-white/10 rounded-xl px-6 py-4">
              <div className="text-3xl font-bold">4</div>
              <div className="text-sm text-green-200">Active Rx</div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Summary Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Health Summary</h3>
            <span className="text-sm text-gray-400">Last updated: Jan 15, 2024</span>
          </div>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { label: "Blood Pressure", value: healthSummary.bloodPressure, icon: "❤️", color: "text-red-500" },
            { label: "Heart Rate", value: healthSummary.heartRate, icon: "💓", color: "text-pink-500" },
            { label: "Temperature", value: healthSummary.temperature, icon: "🌡️", color: "text-orange-500" },
            { label: "Weight", value: healthSummary.weight, icon: "⚖️", color: "text-blue-500" },
            { label: "Cholesterol", value: healthSummary.cholesterol, icon: "🩸", color: "text-purple-500" },
            { label: "Blood Sugar", value: healthSummary.bloodSugar, icon: "🔬", color: "text-green-500" },
          ].map((item) => (
            <div key={item.label} className="text-center p-4 rounded-xl bg-gray-50">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
              <div className="text-xs text-gray-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="px-6 pb-6 flex items-center gap-8 text-sm text-gray-500">
          <span>Last Checkup: <strong className="text-gray-700">{healthSummary.lastCheckup}</strong></span>
          <span>Next Checkup: <strong className="text-gray-700">{healthSummary.nextCheckup}</strong></span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Upcoming Appointments</h3>
              <a href="/patient/appointments/book" className="text-sm text-blue-600 font-medium hover:text-blue-800">
                + Book New
              </a>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {apt.doctor.split(" ").slice(-1)[0][0]}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{apt.doctor}</div>
                  <div className="text-sm text-gray-500">{apt.specialty} &bull; {apt.type}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{apt.date}</div>
                  <div className="text-xs text-gray-400">{apt.time}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[apt.status]}`}>
                  {apt.status}
                </span>
                <div className="flex gap-2">
                  <button className="text-sm text-blue-600 hover:text-blue-800">Reschedule</button>
                  <button className="text-sm text-red-500 hover:text-red-700">Cancel</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions + Feedback */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { icon: "📅", label: "Book Appointment", color: "bg-blue-50 text-blue-600", href: "/patient/appointments/book" },
                { icon: "📋", label: "Medical Records", color: "bg-green-50 text-green-600", href: "#" },
                { icon: "💰", label: "View Bills", color: "bg-purple-50 text-purple-600", href: "#" },
                { icon: "💊", label: "Pharmacy", color: "bg-orange-50 text-orange-600", href: "#" },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-lg`}>
                    {action.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Feedback Prompt */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
            <div className="text-2xl mb-2">⭐</div>
            <h3 className="font-semibold text-gray-900 mb-1">Rate Your Visit</h3>
            <p className="text-sm text-gray-500 mb-4">
              You had an appointment with Dr. Smith on Jan 10. How was your experience?
            </p>
            <button
              onClick={() => setFeedbackOpen(true)}
              className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition"
            >
              Leave Feedback
            </button>
          </div>
        </div>
      </div>

      {/* Recent Prescriptions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Recent Prescriptions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-100">
                <th className="px-6 py-3">Medication</th>
                <th className="px-6 py-3">Dosage</th>
                <th className="px-6 py-3">Prescribed By</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentPrescriptions.map((rx) => (
                <tr key={rx.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{rx.medication}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{rx.dosage}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{rx.prescribedBy}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{rx.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[rx.status]}`}>
                      {rx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Health Tips */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Health Tips For You</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthTips.map((tip) => (
            <div key={tip.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="text-3xl mb-3">{tip.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Modal */}
      {feedbackOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-500">Your feedback has been submitted successfully.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Rate Your Experience</h3>
                <p className="text-gray-500 text-sm mb-6">Appointment with Dr. Smith on Jan 10, 2024</p>
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-3xl transition hover:scale-110"
                    >
                      {star <= rating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Tell us about your experience..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm resize-none h-28 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-4"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setFeedbackOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFeedback}
                    disabled={rating === 0}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Submit Feedback
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
