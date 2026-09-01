export function isValidAadhaar(aadhaar: string): boolean {
  const cleaned = aadhaar.replace(/\s/g, '');
  return /^\d{12}$/.test(cleaned);
}

export function isValidPAN(pan: string): boolean {
  return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase());
}

export function isValidIndianPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(digits);
}

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export function isValidBloodGroup(bloodGroup: string): boolean {
  return BLOOD_GROUPS.includes(bloodGroup.toUpperCase());
}

export function isValidInsuranceNumber(number: string): boolean {
  const cleaned = number.replace(/[\s-]/g, '');
  return /^[A-Z0-9]{8,20}$/i.test(cleaned);
}
