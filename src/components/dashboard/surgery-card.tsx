"use client";

import { Calendar, Clock, User, MapPin, AlertCircle, CheckCircle, FileText } from "lucide-react";

interface SurgeryCardProps {
  surgery: {
    id: number;
    patient: string;
    procedure: string;
    type: string;
    surgeon: string;
    date: string;
    time: string;
    duration: string;
    status: string;
    room: string;
    preOpInstructions?: string;
    preOpChecklist?: string[];
    notes?: string;
  };
  onAction?: () => void;
}

const statusConfig = {
  scheduled: {
    color: "bg-blue-100 text-blue-700",
    icon: Calendar,
    label: "Scheduled",
  },
  "in-progress": {
    color: "bg-amber-100 text-amber-700",
    icon: Clock,
    label: "In Progress",
  },
  completed: {
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
    label: "Completed",
  },
  cancelled: {
    color: "bg-red-100 text-red-700",
    icon: AlertCircle,
    label: "Cancelled",
  },
};

export default function SurgeryCard({ surgery, onAction }: SurgeryCardProps) {
  const status = statusConfig[surgery.status as keyof typeof statusConfig];
  const StatusIcon = status?.icon || Calendar;

  const completedItems = surgery.preOpChecklist?.filter((item) => item.includes("complete")).length || 0;
  const totalItems = surgery.preOpChecklist?.length || 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{surgery.procedure}</h3>
            <p className="text-sm text-gray-500">{surgery.type}</p>
          </div>
          <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${status?.color}`}>
            <StatusIcon size={14} />
            {status?.label}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User size={16} className="text-gray-400" />
            <span>{surgery.surgeon}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} className="text-gray-400" />
            <span>{surgery.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} className="text-gray-400" />
            <span>{surgery.time} ({surgery.duration})</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="text-gray-400" />
            <span>Room {surgery.room}</span>
          </div>
        </div>

        {surgery.preOpInstructions && (
          <div className="p-3 bg-amber-50 rounded-lg mb-4">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-amber-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-amber-700 mb-1">Pre-op Instructions</p>
                <p className="text-sm text-amber-800">{surgery.preOpInstructions}</p>
              </div>
            </div>
          </div>
        )}

        {surgery.preOpChecklist && surgery.preOpChecklist.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">Pre-op Checklist</p>
              <span className="text-xs text-gray-500">
                {completedItems}/{totalItems} complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${(completedItems / totalItems) * 100}%` }}
              />
            </div>
          </div>
        )}

        {surgery.notes && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-2">
              <FileText size={16} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Notes</p>
                <p className="text-sm text-gray-700">{surgery.notes}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {onAction && (
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onAction}
            className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
}
