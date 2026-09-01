function randomDigits(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

function randomAlphanumeric(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export function generateOTP(length = 6): string {
  return randomDigits(length);
}

export function generatePatientId(): string {
  const year = new Date().getFullYear();
  const seq = randomDigits(5);
  return `PAT-${year}-${seq}`;
}

export function generateAppointmentId(): string {
  const year = new Date().getFullYear();
  const seq = randomDigits(5);
  return `APT-${year}-${seq}`;
}

export function generateBillNumber(): string {
  const year = new Date().getFullYear();
  const seq = randomDigits(6);
  return `BILL-${year}-${seq}`;
}

export function generatePrescriptionId(): string {
  const year = new Date().getFullYear();
  const seq = randomDigits(5);
  return `PRESC-${year}-${seq}`;
}
