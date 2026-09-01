export type UserRole = "ADMIN" | "DOCTOR" | "PATIENT" | "RECEPTIONIST";

export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export type BillStatus = "PENDING" | "PAID" | "PARTIALLY_PAID" | "OVERDUE" | "CANCELLED";

export type NotificationType = "APPOINTMENT" | "BILL" | "MESSAGE" | "SYSTEM" | "REMINDER";

export type ContactStatus = "NEW" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  totalRevenue: number;
  appointmentsToday: number;
  pendingBills: number;
  newNotifications: number;
  recentAppointments: AppointmentWithDetails[];
  revenueByMonth: { month: string; amount: number }[];
  appointmentsByStatus: { status: string; count: number }[];
}

export interface DoctorWithUser {
  id: string;
  userId: string;
  specialization: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  bio?: string | null;
  availableDays: string[];
  availableTimeSlots: string[];
  departmentId: string;
  department?: Department;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    image?: string | null;
  };
  _count?: {
    appointments: number;
    medicalRecords: number;
  };
}

export interface PatientWithUser {
  id: string;
  userId: string;
  dateOfBirth?: string | null;
  gender?: string | null;
  bloodGroup?: string | null;
  address?: string | null;
  emergencyContact?: string | null;
  insuranceProvider?: string | null;
  insuranceNumber?: string | null;
  allergies?: string[];
  medicalHistory?: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    image?: string | null;
  };
  _count?: {
    appointments: number;
    medicalRecords: number;
    bills: number;
  };
}

export interface AppointmentWithDetails {
  id: string;
  date: string;
  time: string;
  reason: string;
  notes?: string | null;
  status: AppointmentStatus;
  patientId: string;
  doctorId: string;
  departmentId: string;
  patient?: PatientWithUser;
  doctor?: DoctorWithUser;
  department?: Department;
  createdAt: string;
  updatedAt: string;
}

export interface BillWithDetails {
  id: string;
  billNumber: string;
  totalAmount: number;
  discount: number;
  tax: number;
  finalAmount: number;
  status: BillStatus;
  dueDate: string;
  notes?: string | null;
  patientId: string;
  appointmentId?: string | null;
  patient?: PatientWithUser;
  appointment?: AppointmentWithDetails;
  items: BillItem[];
  payments: Payment[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecordWithDetails {
  id: string;
  diagnosis: string;
  symptoms: string;
  treatment: string;
  prescriptions?: Prescription[];
  notes?: string | null;
  followUpDate?: string | null;
  patientId: string;
  doctorId: string;
  appointmentId?: string | null;
  patient?: PatientWithUser;
  doctor?: DoctorWithUser;
  appointment?: AppointmentWithDetails;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  time: string;
  label: string;
  available: boolean;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  location: string;
  phone?: string | null;
  email?: string | null;
  headDoctorId?: string | null;
}

export interface BillItem {
  id: string;
  description: string;
  category: string;
  amount: number;
  quantity: number;
}

export interface Payment {
  id: string;
  amount: number;
  method: string;
  date: string;
  reference?: string | null;
}

export interface Prescription {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  userId: string;
  link?: string | null;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  image?: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Feedback {
  id: string;
  rating: number;
  comment: string;
  patientId: string;
  doctorId?: string | null;
  departmentId?: string | null;
  appointmentId?: string | null;
  patient?: PatientWithUser;
  doctor?: DoctorWithUser;
  department?: Department;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: ContactStatus;
  reply?: string | null;
  repliedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
