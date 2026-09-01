import { Star, MapPin } from "lucide-react";

interface DoctorCardProps {
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  fee: number;
  location?: string;
  available?: boolean;
  onBook?: () => void;
}

export default function DoctorCard({
  name,
  specialty,
  rating,
  reviewCount,
  fee,
  location,
  available = true,
  onBook,
}: DoctorCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Avatar section */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 px-6 pt-6 pb-8 text-center">
        <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 flex items-center justify-center shadow-sm border border-gray-100">
          <span className="text-xl font-bold text-rose-500">{initials}</span>
        </div>
        <h3 className="text-base font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{specialty}</p>
      </div>

      {/* Info section */}
      <div className="px-6 py-4">
        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">({reviewCount})</span>
        </div>

        {/* Location */}
        {location && (
          <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-3">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
        )}

        {/* Fee */}
        <div className="text-center mb-4">
          <span className="text-2xl font-bold text-gray-900">${fee}</span>
          <span className="text-sm text-gray-500 ml-1">/ consultation</span>
        </div>

        {/* Status & Book button */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
              available
                ? "bg-green-50 text-green-700"
                : "bg-gray-50 text-gray-500"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                available ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            {available ? "Available" : "Unavailable"}
          </div>
          <button
            onClick={onBook}
            disabled={!available}
            className="flex-1 px-4 py-2 text-sm font-medium bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
