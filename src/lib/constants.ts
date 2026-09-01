export const TIME_SLOTS = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00',
];

export const DAYS_OF_WEEK = [
  { value: 'Monday', label: 'Monday', short: 'Mon' },
  { value: 'Tuesday', label: 'Tuesday', short: 'Tue' },
  { value: 'Wednesday', label: 'Wednesday', short: 'Wed' },
  { value: 'Thursday', label: 'Thursday', short: 'Thu' },
  { value: 'Friday', label: 'Friday', short: 'Fri' },
  { value: 'Saturday', label: 'Saturday', short: 'Sat' },
  { value: 'Sunday', label: 'Sunday', short: 'Sun' },
];

export const APPOINTMENT_STATUSES = {
  SCHEDULED: { label: 'Scheduled', color: 'bg-blue-100 text-blue-800', dotColor: 'bg-blue-500' },
  CONFIRMED: { label: 'Confirmed', color: 'bg-green-100 text-green-800', dotColor: 'bg-green-500' },
  IN_PROGRESS: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800', dotColor: 'bg-yellow-500' },
  COMPLETED: { label: 'Completed', color: 'bg-gray-100 text-gray-800', dotColor: 'bg-gray-500' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-800', dotColor: 'bg-red-500' },
  NO_SHOW: { label: 'No Show', color: 'bg-orange-100 text-orange-800', dotColor: 'bg-orange-500' },
} as const;

export const APPOINTMENT_TYPES = {
  CONSULTATION: { label: 'Consultation', color: 'bg-purple-100 text-purple-800' },
  FOLLOW_UP: { label: 'Follow-up', color: 'bg-indigo-100 text-indigo-800' },
  CHECK_UP: { label: 'Check-up', color: 'bg-teal-100 text-teal-800' },
  EMERGENCY: { label: 'Emergency', color: 'bg-red-100 text-red-800' },
  PROCEDURE: { label: 'Procedure', color: 'bg-amber-100 text-amber-800' },
} as const;

export const BILL_STATUSES = {
  PENDING: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', dotColor: 'bg-yellow-500' },
  PARTIALLY_PAID: { label: 'Partially Paid', color: 'bg-orange-100 text-orange-800', dotColor: 'bg-orange-500' },
  PAID: { label: 'Paid', color: 'bg-green-100 text-green-800', dotColor: 'bg-green-500' },
  OVERDUE: { label: 'Overdue', color: 'bg-red-100 text-red-800', dotColor: 'bg-red-500' },
  CANCELLED: { label: 'Cancelled', color: 'bg-gray-100 text-gray-800', dotColor: 'bg-gray-500' },
} as const;

export const PAYMENT_METHODS = {
  CASH: { label: 'Cash', icon: 'BanknotesIcon' },
  CARD: { label: 'Card', icon: 'CreditCardIcon' },
  UPI: { label: 'UPI', icon: 'DevicePhoneMobileIcon' },
  NET_BANKING: { label: 'Net Banking', icon: 'BuildingLibraryIcon' },
  INSURANCE: { label: 'Insurance', icon: 'ShieldCheckIcon' },
} as const;

export const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Oncology',
  'Dermatology',
  'General Medicine',
  'Emergency',
] as const;

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

export const GENDERS = {
  MALE: { label: 'Male', icon: 'UserIcon' },
  FEMALE: { label: 'Female', icon: 'UserIcon' },
  OTHER: { label: 'Other', icon: 'UserIcon' },
} as const;

export const NAVIGATION_LINKS = {
  admin: [
    { href: '/dashboard', label: 'Dashboard', icon: 'HomeIcon' },
    { href: '/doctors', label: 'Doctors', icon: 'UserGroupIcon' },
    { href: '/patients', label: 'Patients', icon: 'UsersIcon' },
    { href: '/appointments', label: 'Appointments', icon: 'CalendarIcon' },
    { href: '/departments', label: 'Departments', icon: 'BuildingOfficeIcon' },
    { href: '/billing', label: 'Billing', icon: 'CurrencyRupeeIcon' },
    { href: '/reports', label: 'Reports', icon: 'ChartBarIcon' },
    { href: '/settings', label: 'Settings', icon: 'Cog6ToothIcon' },
  ],
  doctor: [
    { href: '/dashboard', label: 'Dashboard', icon: 'HomeIcon' },
    { href: '/appointments', label: 'Appointments', icon: 'CalendarIcon' },
    { href: '/patients', label: 'My Patients', icon: 'UsersIcon' },
    { href: '/records', label: 'Medical Records', icon: 'DocumentTextIcon' },
    { href: '/schedule', label: 'My Schedule', icon: 'ClockIcon' },
    { href: '/profile', label: 'Profile', icon: 'UserCircleIcon' },
  ],
  patient: [
    { href: '/dashboard', label: 'Dashboard', icon: 'HomeIcon' },
    { href: '/appointments', label: 'My Appointments', icon: 'CalendarIcon' },
    { href: '/doctors', label: 'Find Doctors', icon: 'UserGroupIcon' },
    { href: '/records', label: 'Medical Records', icon: 'DocumentTextIcon' },
    { href: '/billing', label: 'My Bills', icon: 'CurrencyRupeeIcon' },
    { href: '/profile', label: 'Profile', icon: 'UserCircleIcon' },
  ],
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  DOCTORS: {
    LIST: '/doctors',
    DETAIL: (id: string) => `/doctors/${id}`,
    CREATE: '/doctors/new',
    EDIT: (id: string) => `/doctors/${id}/edit`,
  },
  PATIENTS: {
    LIST: '/patients',
    DETAIL: (id: string) => `/patients/${id}`,
    CREATE: '/patients/new',
    EDIT: (id: string) => `/patients/${id}/edit`,
  },
  APPOINTMENTS: {
    LIST: '/appointments',
    DETAIL: (id: string) => `/appointments/${id}`,
    BOOK: '/appointments/book',
    EDIT: (id: string) => `/appointments/${id}/edit`,
  },
  DEPARTMENTS: {
    LIST: '/departments',
    DETAIL: (id: string) => `/departments/${id}`,
  },
  BILLING: {
    LIST: '/billing',
    DETAIL: (id: string) => `/billing/${id}`,
    CREATE: '/billing/new',
  },
  RECORDS: {
    LIST: '/records',
    DETAIL: (id: string) => `/records/${id}`,
    CREATE: '/records/new',
  },
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
    REFRESH: '/api/auth/refresh',
  },
  DOCTORS: '/api/doctors',
  PATIENTS: '/api/patients',
  APPOINTMENTS: '/api/appointments',
  DEPARTMENTS: '/api/departments',
  BILLING: '/api/billing',
  RECORDS: '/api/records',
  PAYMENTS: '/api/payments',
  DASHBOARD: '/api/dashboard',
  REPORTS: '/api/reports',
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy hh:mm a',
  INPUT: 'yyyy-MM-dd',
  API: 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'',
} as const;
