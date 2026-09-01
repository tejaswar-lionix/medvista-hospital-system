'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

interface AppointmentDetail {
  id: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  doctor: {
    name: string;
    specialty: string;
    image: string;
  };
  department: string;
  reason: string;
  notes?: string;
  medicalRecord?: {
    diagnosis: string;
    prescription: string[];
    followUp?: string;
    notes: string;
  };
  timeline: {
    status: string;
    timestamp: string;
    description: string;
  }[];
}

const mockAppointment: AppointmentDetail = {
  id: 'APT-12345',
  date: '2024-01-20',
  time: '10:00 AM',
  status: 'scheduled',
  doctor: {
    name: 'Sarah Johnson',
    specialty: 'Cardiologist',
    image: '/doctors/sarah-johnson.jpg',
  },
  department: 'Cardiology',
  reason: 'Annual heart checkup and blood pressure monitoring',
  timeline: [
    {
      status: 'scheduled',
      timestamp: '2024-01-15T14:30:00',
      description: 'Appointment booked',
    },
    {
      status: 'confirmed',
      timestamp: '2024-01-16T09:00:00',
      description: 'Appointment confirmed by clinic',
    },
  ],
};

export default function PatientAppointmentDetailPage() {
  const params = useParams();
  const [appointment] = useState<AppointmentDetail>(mockAppointment);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancel = () => {
    alert(`Appointment cancelled. Reason: ${cancelReason}`);
    setShowCancelModal(false);
    setCancelReason('');
  };

  const handleReschedule = () => {
    alert(`Appointment rescheduled to ${rescheduleDate} at ${rescheduleTime}`);
    setShowRescheduleModal(false);
    setRescheduleDate('');
    setRescheduleTime('');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="text-blue-600 hover:text-blue-800 mb-2 flex items-center gap-1"
        >
          ← Back to Appointments
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Appointment Details</h1>
        <p className="text-gray-600 mt-1">Appointment #{appointment.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Appointment Information</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{appointment.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{appointment.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Reason</p>
                <p className="font-medium">{appointment.reason}</p>
              </div>
            </div>

            {appointment.notes && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-500">Notes</p>
                <p className="mt-1">{appointment.notes}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Status Timeline</h2>
            <div className="space-y-4">
              {appointment.timeline.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    {index < appointment.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 mt-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="font-medium">{event.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {appointment.status === 'completed' && appointment.medicalRecord && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Medical Record</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Diagnosis</p>
                  <p className="font-medium">{appointment.medicalRecord.diagnosis}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prescription</p>
                  <ul className="list-disc list-inside mt-1">
                    {appointment.medicalRecord.prescription.map((med, index) => (
                      <li key={index}>{med}</li>
                    ))}
                  </ul>
                </div>
                {appointment.medicalRecord.followUp && (
                  <div>
                    <p className="text-sm text-gray-500">Follow-up</p>
                    <p className="font-medium">{appointment.medicalRecord.followUp}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Doctor's Notes</p>
                  <p className="mt-1">{appointment.medicalRecord.notes}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Doctor Information</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <div>
                <p className="font-semibold">Dr. {appointment.doctor.name}</p>
                <p className="text-sm text-gray-500">{appointment.doctor.specialty}</p>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              View Doctor Profile
            </button>
          </div>

          {appointment.status === 'scheduled' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setShowRescheduleModal(true)}
                  className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  Reschedule Appointment
                </button>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
            <p className="text-gray-600 text-sm mb-4">
              Have questions about your appointment? Contact our support team.
            </p>
            <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Cancel Appointment</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for cancellation</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Please provide a reason..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Reschedule Appointment</h3>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Date</label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Time</label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a time</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                disabled={!rescheduleDate || !rescheduleTime}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
