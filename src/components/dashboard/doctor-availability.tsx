import { useState } from 'react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DoctorSchedule {
  doctorId: string;
  doctorName: string;
  specialty: string;
  weeklySchedule: {
    [key: string]: TimeSlot[];
  };
  nextAvailable: string;
  consultationFee: number;
}

interface DoctorAvailabilityProps {
  doctor: DoctorSchedule;
  onBookAppointment?: (doctorId: string, slot: string, day: string) => void;
}

export function DoctorAvailability({ doctor, onBookAppointment }: DoctorAvailabilityProps) {
  const [selectedDay, setSelectedDay] = useState<string>(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = new Date().getDay();
    return days[today === 0 ? 6 : today - 1];
  });
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  const getAvailableCount = (day: string) => {
    return doctor.weeklySchedule[day]?.filter(slot => slot.available).length || 0;
  };

  const handleBook = () => {
    if (selectedSlot) {
      onBookAppointment?.(doctor.doctorId, selectedSlot, selectedDay);
      setSelectedSlot(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{doctor.doctorName}</h3>
          <p className="text-sm text-gray-500">{doctor.specialty}</p>
          <p className="text-sm text-green-600 font-medium mt-1">Consultation: ${doctor.consultationFee}</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Next Available</div>
          <div className="text-sm font-medium text-green-600">{new Date(doctor.nextAvailable).toLocaleDateString()}</div>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Weekly Schedule</h4>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {days.map((day, index) => {
            const available = getAvailableCount(day);
            const isToday = index === todayIndex;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-center transition-all ${selectedDay === day ? 'bg-blue-600 text-white' : isToday ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <div className="text-xs font-medium">{day.slice(0, 3)}</div>
                <div className={`text-xs mt-0.5 ${available === 0 ? 'text-red-500' : 'text-green-500'}`}>{available} slots</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-5">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Available Time Slots - {selectedDay}</h4>
        <div className="grid grid-cols-4 gap-2">
          {doctor.weeklySchedule[selectedDay]?.map((slot) => (
            <button
              key={slot.time}
              disabled={!slot.available}
              onClick={() => slot.available && setSelectedSlot(slot.time)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${!slot.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through' : selectedSlot === slot.time ? 'bg-blue-600 text-white ring-2 ring-blue-300' : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'}`}
            >
              {slot.time}
            </button>
          ))}
          {(!doctor.weeklySchedule[selectedDay] || doctor.weeklySchedule[selectedDay].length === 0) && (
            <div className="col-span-4 text-center py-4 text-gray-500 text-sm">No slots available on {selectedDay}</div>
          )}
        </div>
      </div>

      {selectedSlot && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-blue-900">Selected Slot</div>
              <div className="text-lg font-bold text-blue-700">{selectedDay} at {selectedSlot}</div>
            </div>
            <button onClick={handleBook} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md">
              Book Appointment
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-50 border border-green-200 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-100 rounded"></div>
          <span>Unavailable</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
}
