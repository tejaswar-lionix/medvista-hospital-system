export function calculateAge(dateOfBirth: Date | string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

interface BillItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export function calculateBillTotal(items: BillItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function calculateTax(amount: number, taxRate: number = 18): number {
  return Math.round(amount * taxRate) / 100;
}

export function calculateDiscount(amount: number, discountPercent: number): number {
  return Math.round(amount * discountPercent) / 100;
}

interface RevenueRecord {
  amount: number;
  date: string;
}

export function calculateRevenue(records: RevenueRecord[], startDate: string, endDate: string): number {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return records
    .filter((r) => {
      const d = new Date(r.date).getTime();
      return d >= start && d <= end;
    })
    .reduce((sum, r) => sum + r.amount, 0);
}

export function getAppointmentDuration(type: string): number {
  const durations: Record<string, number> = {
    consultation: 30,
    followup: 15,
    surgery: 120,
    emergency: 60,
    'lab-test': 45,
    vaccination: 20,
  };
  return durations[type.toLowerCase()] || 30;
}

export function getNextAvailableSlot(
  existingSlots: { start: Date; end: Date }[],
  durationMinutes: number,
  workStart = 9,
  workEnd = 17
): Date | null {
  const now = new Date();
  const slotDate = new Date(now);
  slotDate.setHours(workStart, 0, 0, 0);

  while (slotDate.getDay() === 0 || slotDate.getDay() === 6) {
    slotDate.setDate(slotDate.getDate() + 1);
    slotDate.setHours(workStart, 0, 0, 0);
  }

  while (slotDate.getHours() < workEnd) {
    const slotEnd = new Date(slotDate.getTime() + durationMinutes * 60000);
    const hasConflict = existingSlots.some(
      (s) => slotDate < s.end && slotEnd > s.start
    );
    if (!hasConflict && slotDate > now) {
      return new Date(slotDate);
    }
    slotDate.setMinutes(slotDate.getMinutes() + 30);
    if (slotDate.getHours() >= workEnd) {
      slotDate.setDate(slotDate.getDate() + 1);
      slotDate.setHours(workStart, 0, 0, 0);
    }
  }

  return null;
}
