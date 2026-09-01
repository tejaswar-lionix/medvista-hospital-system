"use client";

import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react";

interface PharmacyOrderProps {
  order: {
    id: string;
    items: string[];
    total: number;
    date: string;
    status: string;
    deliveryDate?: string;
    estimatedDelivery?: string;
  };
  onTrack?: () => void;
}

const statusConfig = {
  delivered: {
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
    label: "Delivered",
  },
  "in-transit": {
    color: "bg-blue-100 text-blue-700",
    icon: Truck,
    label: "In Transit",
  },
  processing: {
    color: "bg-amber-100 text-amber-700",
    icon: Clock,
    label: "Processing",
  },
};

export default function PharmacyOrder({ order, onTrack }: PharmacyOrderProps) {
  const status = statusConfig[order.status as keyof typeof statusConfig];
  const StatusIcon = status?.icon || Package;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{order.id}</h3>
          <p className="text-sm text-gray-500">Ordered {order.date}</p>
        </div>
        <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${status?.color}`}>
          <StatusIcon size={12} />
          {status?.label}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
            <Package size={14} className="text-gray-400" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</div>
        {order.status === "in-transit" && (
          <button
            onClick={onTrack}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            <MapPin size={14} />
            Track
          </button>
        )}
        {order.status === "delivered" && order.deliveryDate && (
          <span className="text-sm text-gray-500">Delivered {order.deliveryDate}</span>
        )}
        {order.status === "processing" && order.estimatedDelivery && (
          <span className="text-sm text-gray-500">Est. {order.estimatedDelivery}</span>
        )}
      </div>
    </div>
  );
}
