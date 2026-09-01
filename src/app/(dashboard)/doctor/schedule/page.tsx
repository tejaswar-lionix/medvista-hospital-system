"use client";

import { useState } from "react";

type DaySchedule = {
  enabled: boolean;
  slots: { start: string; end: string }[];
};

type WeekSchedule = Record<string, DaySchedule>;

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DEFAULT_SCHEDULE: WeekSchedule = {
  Monday: {
    enabled: true,
    slots: [
      { start: "09:00", end: "12:00" },
      { start: "14:00", end: "17:00" },
    ],
  },
  Tuesday: {
    enabled: true,
    slots: [
      { start: "09:00", end: "12:00" },
      { start: "14:00", end: "17:00" },
    ],
  },
  Wednesday: {
    enabled: true,
    slots: [{ start: "09:00", end: "13:00" }],
  },
  Thursday: {
    enabled: true,
    slots: [
      { start: "09:00", end: "12:00" },
      { start: "14:00", end: "17:00" },
    ],
  },
  Friday: {
    enabled: true,
    slots: [
      { start: "09:00", end: "12:00" },
      { start: "14:00", end: "16:00" },
    ],
  },
  Saturday: {
    enabled: false,
    slots: [{ start: "09:00", end: "12:00" }],
  },
  Sunday: {
    enabled: false,
    slots: [{ start: "09:00", end: "12:00" }],
  },
};

export default function DoctorSchedule() {
  const [schedule, setSchedule] = useState<WeekSchedule>(DEFAULT_SCHEDULE);
  const [isSaved, setIsSaved] = useState(false);

  const toggleDay = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
      },
    }));
  };

  const addSlot = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { start: "09:00", end: "17:00" }],
      },
    }));
  };

  const removeSlot = (day: string, index: number) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index),
      },
    }));
  };

  const updateSlot = (
    day: string,
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot, i) =>
          i === index ? { ...slot, [field]: value } : slot
        ),
      },
    }));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const totalTimeSlots = () => {
    let count = 0;
    Object.values(schedule).forEach((day) => {
      if (day.enabled) {
        count += day.slots.length;
      }
    });
    return count;
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Manage Availability
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Set your weekly schedule and time slots for patient appointments
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isSaved
              ? "bg-green-50 text-green-600 border border-green-200"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isSaved ? "Saved!" : "Save Schedule"}
        </button>
      </div>

      {/* Summary */}
      <div className="flex gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
          <p className="text-xs text-gray-500">Active Days</p>
          <p className="text-lg font-semibold text-gray-900">
            {Object.values(schedule).filter((d) => d.enabled).length}/7
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
          <p className="text-xs text-gray-500">Total Slots</p>
          <p className="text-lg font-semibold text-gray-900">
            {totalTimeSlots()}
          </p>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="space-y-4">
        {DAYS.map((day) => {
          const daySchedule = schedule[day];
          return (
            <div
              key={day}
              className={`bg-white border rounded-lg p-5 transition-colors ${
                daySchedule.enabled
                  ? "border-gray-200"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleDay(day)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      daySchedule.enabled ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        daySchedule.enabled ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                  <h3
                    className={`font-medium ${
                      daySchedule.enabled ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {day}
                  </h3>
                </div>
                {daySchedule.enabled && (
                  <button
                    onClick={() => addSlot(day)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Slot
                  </button>
                )}
              </div>

              {daySchedule.enabled && (
                <div className="space-y-3">
                  {daySchedule.slots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) =>
                            updateSlot(day, index, "start", e.target.value)
                          }
                          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-400 text-sm">to</span>
                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) =>
                            updateSlot(day, index, "end", e.target.value)
                          }
                          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      {daySchedule.slots.length > 1 && (
                        <button
                          onClick={() => removeSlot(day, index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {!daySchedule.enabled && (
                <p className="text-sm text-gray-400 italic">
                  Not available on {day}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
