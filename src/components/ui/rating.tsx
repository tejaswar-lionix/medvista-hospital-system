"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Rating({
  value = 0,
  onChange,
  readonly = false,
  size = "md",
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  function handleClick(starIndex: number, isHalf: boolean) {
    if (readonly || !onChange) return;
    const newValue = isHalf ? starIndex - 0.5 : starIndex;
    onChange(newValue);
  }

  function handleMouseMove(
    e: React.MouseEvent<HTMLButtonElement>,
    starIndex: number
  ) {
    if (readonly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    setHoverValue(isLeftHalf ? starIndex - 0.5 : starIndex);
  }

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const fillPercentage = Math.min(
          Math.max((displayValue - (starIndex - 1)) * 100, 0),
          100
        );

        return (
          <button
            key={starIndex}
            type="button"
            disabled={readonly}
            className={cn(
              "relative focus:outline-none",
              !readonly && "cursor-pointer hover:scale-110 transition-transform",
              readonly && "cursor-default"
            )}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              handleClick(starIndex, x < rect.width / 2);
            }}
            onMouseMove={(e) => handleMouseMove(e, starIndex)}
            onMouseLeave={() => !readonly && setHoverValue(null)}
          >
            <Star
              className={cn(
                sizeMap[size],
                "text-gray-200 fill-gray-200"
              )}
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star
                className={cn(
                  sizeMap[size],
                  "text-amber-400 fill-amber-400"
                )}
              />
            </div>
          </button>
        );
      })}
      {readonly && (
        <span className="ml-1.5 text-sm text-muted-foreground">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
