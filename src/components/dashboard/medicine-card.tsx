import { useState } from 'react';

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: number;
  duration: string;
  instructions: string;
  timing: {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
  };
  status: 'active' | 'completed' | 'discontinued';
  startDate: string;
  endDate: string;
  refillDate: string;
  sideEffects: string[];
}

interface MedicineCardProps {
  medicine: Medicine;
  onStatusChange?: (id: string, status: string) => void;
}

export function MedicineCard({ medicine, onStatusChange }: MedicineCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>;
      case 'completed': return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Completed</span>;
      case 'discontinued': return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Discontinued</span>;
      default: return null;
    }
  };

  const getTimingIcon = (period: string, active: boolean) => {
    const icons: Record<string, string> = {
      morning: '🌅',
      afternoon: '☀️',
      night: '🌙'
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${active ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-400'}`}>
        {icons[period]} {period.charAt(0).toUpperCase() + period.slice(1)}
      </span>
    );
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-5 border transition-all ${medicine.status === 'active' ? 'border-green-200' : 'border-gray-100'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-lg font-semibold text-gray-900">{medicine.name}</h4>
            {getStatusBadge(medicine.status)}
          </div>
          <p className="text-sm text-gray-500">{medicine.genericName}</p>
        </div>
        <button onClick={() => setExpanded(!expanded)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <svg className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="bg-blue-50 rounded-lg p-2 text-center">
          <div className="text-xs text-gray-500 mb-1">Dosage</div>
          <div className="font-semibold text-blue-900">{medicine.dosage}</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-2 text-center">
          <div className="text-xs text-gray-500 mb-1">Frequency</div>
          <div className="font-semibold text-purple-900">{medicine.frequency}x/day</div>
        </div>
        <div className="bg-green-50 rounded-lg p-2 text-center">
          <div className="text-xs text-gray-500 mb-1">Duration</div>
          <div className="font-semibold text-green-900">{medicine.duration}</div>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-xs text-gray-500 mb-2">Timing</div>
        <div className="flex gap-2">
          {getTimingIcon('morning', medicine.timing.morning)}
          {getTimingIcon('afternoon', medicine.timing.afternoon)}
          {getTimingIcon('night', medicine.timing.night)}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 pt-3 mt-3 space-y-3">
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">Instructions</div>
            <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{medicine.instructions}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Start Date: </span>
              <span className="font-medium">{new Date(medicine.startDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-gray-500">End Date: </span>
              <span className="font-medium">{new Date(medicine.endDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="text-sm">
            <span className="text-gray-500">Next Refill: </span>
            <span className="font-medium text-orange-600">{new Date(medicine.refillDate).toLocaleDateString()}</span>
          </div>

          {medicine.sideEffects.length > 0 && (
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">Possible Side Effects</div>
              <div className="flex flex-wrap gap-1">
                {medicine.sideEffects.map((effect, i) => (
                  <span key={i} className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-xs">{effect}</span>
                ))}
              </div>
            </div>
          )}

          {medicine.status === 'active' && (
            <div className="flex gap-2 pt-2">
              <button onClick={() => onStatusChange?.(medicine.id, 'completed')} className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                Mark Complete
              </button>
              <button onClick={() => onStatusChange?.(medicine.id, 'discontinued')} className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                Discontinue
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
