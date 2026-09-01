"use client";

import { Phone, MapPin, AlertTriangle } from "lucide-react";

interface EmergencyBannerProps {
  phone?: string;
  address?: string;
}

export default function EmergencyBanner({
  phone = "911",
  address = "123 Medical Center Dr, Suite 100",
}: EmergencyBannerProps) {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <AlertTriangle className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-white font-semibold">Emergency Services Available 24/7</h3>
            <div className="flex items-center gap-4 text-red-100 text-sm mt-1">
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {address}
              </span>
            </div>
          </div>
        </div>
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-red-50 transition-colors"
        >
          <Phone size={20} />
          Call {phone}
        </a>
      </div>
    </div>
  );
}
