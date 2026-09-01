"use client";

import { useState } from "react";
import {
  Video,
  Phone,
  Calendar,
  Clock,
  User,
  Play,
  CheckCircle,
  XCircle,
  MessageSquare,
  Monitor,
  Mic,
  MicOff,
  VideoOff,
  Settings,
  ScreenShare,
} from "lucide-react";

const upcomingCalls = [
  {
    id: 1,
    doctor: "Dr. Sarah Mitchell",
    specialty: "Cardiology",
    date: "2024-01-20",
    time: "10:00 AM",
    type: "Follow-up Consultation",
    status: "confirmed",
    duration: "30 min",
  },
  {
    id: 2,
    doctor: "Dr. Emily Chen",
    specialty: "Neurology",
    date: "2024-01-22",
    time: "2:30 PM",
    type: "Initial Consultation",
    status: "pending",
    duration: "45 min",
  },
  {
    id: 3,
    doctor: "Dr. Lisa Anderson",
    specialty: "General Practice",
    date: "2024-01-25",
    time: "11:00 AM",
    type: "Prescription Review",
    status: "confirmed",
    duration: "15 min",
  },
];

const pastCalls = [
  {
    id: 4,
    doctor: "Dr. James Wilson",
    specialty: "Orthopedics",
    date: "2024-01-10",
    time: "9:00 AM",
    type: "Post-surgery Follow-up",
    status: "completed",
    duration: "25 min",
    notes: "Reviewed X-ray results, prescribed physical therapy exercises.",
  },
  {
    id: 5,
    doctor: "Dr. Sarah Mitchell",
    specialty: "Cardiology",
    date: "2024-01-05",
    time: "3:00 PM",
    type: "Lab Results Review",
    status: "completed",
    duration: "20 min",
    notes: "Cholesterol levels improved, continue current medication.",
  },
  {
    id: 6,
    doctor: "Dr. Michael Brown",
    specialty: "Oncology",
    date: "2023-12-28",
    time: "10:30 AM",
    type: "Treatment Discussion",
    status: "completed",
    duration: "40 min",
    notes: "Discussed treatment plan options and next steps.",
  },
];

export default function TelemedicinePage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  const joinCall = (call) => {
    setSelectedCall(call);
    setIsInCall(true);
  };

  const endCall = () => {
    setIsInCall(false);
    setSelectedCall(null);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  if (isInCall) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            <div className="flex-1 bg-gray-800 rounded-2xl flex items-center justify-center relative">
              {isVideoOff ? (
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="text-gray-400" size={48} />
                  </div>
                  <p className="text-gray-400">Camera is off</p>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Monitor size={64} className="mx-auto mb-4" />
                  <p>Video feed placeholder</p>
                  <p className="text-sm mt-2">Connecting to {selectedCall?.doctor}...</p>
                </div>
              )}
              <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                <Clock size={14} className="inline mr-1" />
                12:34
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full ${isMuted ? "bg-red-500" : "bg-gray-700"} text-white hover:opacity-80`}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-4 rounded-full ${isVideoOff ? "bg-red-500" : "bg-gray-700"} text-white hover:opacity-80`}
              >
                {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
              </button>
              <button className="p-4 rounded-full bg-gray-700 text-white hover:opacity-80">
                <ScreenShare size={24} />
              </button>
              <button className="p-4 rounded-full bg-gray-700 text-white hover:opacity-80">
                <MessageSquare size={24} />
              </button>
              <button className="p-4 rounded-full bg-gray-700 text-white hover:opacity-80">
                <Settings size={24} />
              </button>
              <button
                onClick={endCall}
                className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <Phone size={24} className="rotate-[135deg]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Telemedicine</h1>
          <p className="text-gray-500 mt-1">Virtual consultations with your healthcare providers</p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Next Consultation</h2>
              <p className="text-blue-100">Dr. Sarah Mitchell - Cardiology</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="flex items-center gap-1 text-blue-100">
                  <Calendar size={16} /> January 20, 2024
                </span>
                <span className="flex items-center gap-1 text-blue-100">
                  <Clock size={16} /> 10:00 AM
                </span>
              </div>
            </div>
            <button
              onClick={() => joinCall(upcomingCalls[0])}
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              <Video size={20} />
              Join Now
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "upcoming" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "past" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Past Sessions
          </button>
        </div>

        {activeTab === "upcoming" && (
          <div className="space-y-4">
            {upcomingCalls.map((call) => (
              <div key={call.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{call.doctor}</h3>
                      <p className="text-sm text-gray-500">{call.specialty}</p>
                      <p className="text-sm text-gray-600 mt-1">{call.type}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      call.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {call.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {call.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {call.time}
                    </span>
                    <span>{call.duration}</span>
                  </div>
                  <button
                    onClick={() => joinCall(call)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <Video size={16} />
                    Join Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "past" && (
          <div className="space-y-4">
            {pastCalls.map((call) => (
              <div key={call.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="text-gray-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{call.doctor}</h3>
                      <p className="text-sm text-gray-500">{call.specialty}</p>
                      <p className="text-sm text-gray-600 mt-1">{call.type}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    <CheckCircle size={12} /> Completed
                  </span>
                </div>
                {call.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Notes:</span> {call.notes}
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {call.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {call.time}
                    </span>
                    <span>{call.duration}</span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                    <Video size={16} />
                    Rejoin
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
// Telemedicine module
