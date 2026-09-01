"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowUpDown, Check, ChevronDown } from "lucide-react";

interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  direction?: "asc" | "desc";
  onDirectionChange?: (direction: "asc" | "desc") => void;
  className?: string;
}

export function SortDropdown({
  options,
  value,
  onChange,
  direction = "asc",
  onDirectionChange,
  className = "",
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium border rounded-lg transition-colors duration-150 ${
            isOpen
              ? "border-blue-300 ring-2 ring-blue-500"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          <span className="text-gray-700">
            {selectedOption?.label || "Sort by"}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform duration-150 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {onDirectionChange && (
          <button
            type="button"
            onClick={() => onDirectionChange(direction === "asc" ? "desc" : "asc")}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title={direction === "asc" ? "Ascending" : "Descending"}
          >
            <ArrowUpDown
              className={`h-4 w-4 transition-transform duration-150 ${
                direction === "desc" ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm text-left transition-colors ${
                  option.value === value
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{option.label}</span>
                {option.value === value && (
                  <Check className="h-4 w-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
