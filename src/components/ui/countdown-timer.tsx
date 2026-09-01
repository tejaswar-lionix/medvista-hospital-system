"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date | string;
  onComplete?: () => void;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const now = new Date();
  const difference = target.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function CountdownTimer({
  targetDate,
  onComplete,
  className,
}: CountdownTimerProps) {
  const target =
    typeof targetDate === "string" ? new Date(targetDate) : targetDate;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(target)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(target);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [target, onComplete]);

  const isComplete =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isComplete) {
    return (
      <div className={cn("text-center", className)}>
        <p className="text-lg font-semibold text-green-600">Time&apos;s up!</p>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {timeLeft.days > 0 && (
        <TimeUnit value={timeLeft.days} label="Days" />
      )}
      <TimeUnit value={timeLeft.hours} label="Hrs" />
      <span className="text-2xl font-bold text-muted-foreground">:</span>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <span className="text-2xl font-bold text-muted-foreground">:</span>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-lg bg-gray-100 px-3 py-2">
        <span className="text-2xl font-bold tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1 text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
