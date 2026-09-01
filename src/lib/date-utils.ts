export function isToday(date: Date | string): boolean {
  const d = new Date(date);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

export function isTomorrow(date: Date | string): boolean {
  const d = new Date(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear()
  );
}

export function isYesterday(date: Date | string): boolean {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  );
}

export function getDaysUntil(date: Date | string): number {
  const target = new Date(date);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getWeekNumber(date: Date | string): number {
  const d = new Date(date);
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

export function isWeekend(date?: Date | string): boolean {
  const d = date ? new Date(date) : new Date();
  return d.getDay() === 0 || d.getDay() === 6;
}

export function isWorkingHour(date?: Date | string, startHour = 9, endHour = 17): boolean {
  const d = date ? new Date(date) : new Date();
  if (isWeekend(d)) return false;
  const hour = d.getHours();
  return hour >= startHour && hour < endHour;
}

export function getNextWorkingDay(date?: Date | string): Date {
  const d = date ? new Date(date) : new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

export function getDaysBetween(date1: Date | string, date2: Date | string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diff = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
