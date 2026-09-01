"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  placeholder?: string;
  className?: string;
  maxDate?: Date;
  minDate?: Date;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Select date range",
  className = "",
  maxDate,
  minDate,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isDateInRange = (date: Date) => {
    if (!value.start || !value.end) return false;
    return date >= value.start && date <= value.end;
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (selecting === "start") {
      onChange({ start: date, end: null });
      setSelecting("end");
    } else {
      if (value.start && date < value.start) {
        onChange({ start: date, end: value.start });
      } else {
        onChange({ start: value.start, end: date });
      }
      setSelecting("start");
      setIsOpen(false);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isStart = value.start?.toDateString() === date.toDateString();
      const isEnd = value.end?.toDateString() === date.toDateString();
      const isInRange = isDateInRange(date);
      const isDisabled = isDateDisabled(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateClick(date)}
          disabled={isDisabled}
          className={`w-8 h-8 rounded-full text-sm transition-colors duration-150 ${
            isDisabled
              ? "text-gray-300 cursor-not-allowed"
              : isStart || isEnd
              ? "bg-blue-600 text-white font-medium"
              : isInRange
              ? "bg-blue-100 text-blue-900"
              : isToday
              ? "border border-blue-600 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const clearRange = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange({ start: null, end: null });
    setSelecting("start");
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 w-full px-3 py-2 text-sm border rounded-lg transition-colors duration-150 ${
          isOpen
            ? "border-blue-300 ring-2 ring-blue-500"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <Calendar className="h-4 w-4 text-gray-400" />
        <span className={value.start ? "text-gray-900" : "text-gray-500"}>
          {value.start
            ? `${formatDate(value.start)} - ${formatDate(value.end) || "Select end"}`
            : placeholder}
        </span>
        {value.start && (
          <X
            className="h-4 w-4 text-gray-400 hover:text-gray-600 ml-auto"
            onClick={clearRange}
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                )
              }
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h3 className="text-sm font-medium text-gray-900">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                )
              }
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
            <p className="text-xs text-gray-500">
              {selecting === "start" ? "Select start date" : "Select end date"}
            </p>
            <button
              type="button"
              onClick={() => {
                onChange({ start: null, end: null });
                setSelecting("start");
              }}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
