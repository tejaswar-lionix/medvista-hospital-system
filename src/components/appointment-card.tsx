import { Calendar, Clock, MapPin } from "lucide-react";

interface AppointmentCardProps {
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  location?: string;
  onCancel?: () => void;
  onReschedule?: () => void;
}

const statusStyles = {
  confirmed: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function AppointmentCard({
  doctorName,
  specialty,
  date,
  time,
  status,
  location,
  onCancel,
  onReschedule,
}: AppointmentCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-600">
              {doctorName.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{doctorName}</h3>
            <p className="text-xs text-gray-500">{specialty}</p>
          </div>
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyles[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {date}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {time}
        </div>
        {location && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
        )}
      </div>

      {(onCancel || onReschedule) && (
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          {onReschedule && (
            <button
              onClick={onReschedule}
              className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Reschedule
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}
