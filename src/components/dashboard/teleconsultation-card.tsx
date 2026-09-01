"use client";

import { Video, Calendar, Clock, User, CheckCircle, AlertCircle } from "lucide-react";

interface TeleconsultationCardProps {
  consultation: {
    id: number;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
    type: string;
    status: string;
    duration: string;
  };
  onJoin?: () => void;
}

const statusConfig = {
  confirmed: {
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
    label: "Confirmed",
  },
  pending: {
    color: "bg-amber-100 text-amber-700",
    icon: AlertCircle,
    label: "Pending",
  },
  completed: {
    color: "bg-gray-100 text-gray-600",
    icon: CheckCircle,
    label: "Completed",
  },
};

export default function TeleconsultationCard({ consultation, onJoin }: TeleconsultationCardProps) {
  const status = statusConfig[consultation.status as keyof typeof statusConfig];
  const StatusIcon = status?.icon || CheckCircle;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{consultation.doctor}</h3>
            <p className="text-sm text-gray-500">{consultation.specialty}</p>
          </div>
        </div>
        <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${status?.color}`}>
          <StatusIcon size={12} />
          {status?.label}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600">{consultation.type}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {consultation.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {consultation.time}
          </span>
        </div>
      </div>

      {consultation.status !== "completed" && onJoin && (
        <button
          onClick={onJoin}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
        >
          <Video size={16} />
          Join Consultation
        </button>
      )}
    </div>
  );
}
