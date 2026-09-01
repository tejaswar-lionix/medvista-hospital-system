import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name is too long"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
      errorMap: () => ({ message: "Please select a gender" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const appointmentSchema = z.object({
  doctorId: z.string().min(1, "Please select a doctor"),
  departmentId: z.string().min(1, "Please select a department"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time slot"),
  reason: z
    .string()
    .min(1, "Please describe your reason for visit")
    .max(500, "Reason is too long"),
  notes: z.string().max(1000, "Notes are too long").optional(),
});

export const doctorSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number"),
  departmentId: z.string().min(1, "Please select a department"),
  specialization: z
    .string()
    .min(1, "Specialization is required")
    .max(200, "Specialization is too long"),
  bio: z.string().max(1000, "Bio is too long").optional(),
  qualification: z
    .string()
    .min(1, "Qualification is required")
    .max(300, "Qualification is too long"),
  experience: z
    .number()
    .min(0, "Experience cannot be negative")
    .max(50, "Experience seems too high"),
  consultationFee: z
    .number()
    .min(0, "Fee cannot be negative")
    .max(10000, "Fee seems too high"),
  availableDays: z
    .array(z.string())
    .min(1, "Please select at least one available day"),
  availableTimeSlots: z
    .array(z.string())
    .min(1, "Please select at least one time slot"),
});

export const departmentSchema = z.object({
  name: z
    .string()
    .min(1, "Department name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"),
  location: z.string().min(1, "Location is required").max(200, "Location is too long"),
  headDoctorId: z.string().optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
});

export const medicalRecordSchema = z.object({
  patientId: z.string().min(1, "Please select a patient"),
  doctorId: z.string().min(1, "Doctor is required"),
  appointmentId: z.string().optional(),
  diagnosis: z
    .string()
    .min(1, "Diagnosis is required")
    .max(500, "Diagnosis is too long"),
  symptoms: z
    .string()
    .min(1, "Symptoms are required")
    .max(1000, "Symptoms description is too long"),
  treatment: z
    .string()
    .min(1, "Treatment plan is required")
    .max(1000, "Treatment plan is too long"),
  prescriptions: z
    .array(
      z.object({
        name: z.string().min(1, "Medicine name is required"),
        dosage: z.string().min(1, "Dosage is required"),
        frequency: z.string().min(1, "Frequency is required"),
        duration: z.string().min(1, "Duration is required"),
        notes: z.string().optional(),
      })
    )
    .optional(),
  notes: z.string().max(2000, "Notes are too long").optional(),
  followUpDate: z.string().optional(),
});

export const billSchema = z.object({
  patientId: z.string().min(1, "Please select a patient"),
  appointmentId: z.string().optional(),
  items: z
    .array(
      z.object({
        description: z.string().min(1, "Description is required"),
        category: z.enum(["CONSULTATION", "PROCEDURE", "MEDICATION", "LAB", "OTHER"]),
        amount: z.number().min(0.01, "Amount must be greater than 0"),
        quantity: z.number().min(1, "Quantity must be at least 1").default(1),
      })
    )
    .min(1, "Please add at least one bill item"),
  discount: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%")
    .default(0),
  tax: z
    .number()
    .min(0, "Tax cannot be negative")
    .max(100, "Tax cannot exceed 100%")
    .default(0),
  notes: z.string().max(500, "Notes are too long").optional(),
  dueDate: z.string().min(1, "Due date is required"),
});

export const feedbackSchema = z.object({
  rating: z
    .number()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5"),
  comment: z
    .string()
    .min(1, "Please provide your feedback")
    .max(1000, "Feedback is too long"),
  doctorId: z.string().optional(),
  departmentId: z.string().optional(),
  appointmentId: z.string().optional(),
});

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject is too long"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type DoctorInput = z.infer<typeof doctorSchema>;
export type DepartmentInput = z.infer<typeof departmentSchema>;
export type MedicalRecordInput = z.infer<typeof medicalRecordSchema>;
export type BillInput = z.infer<typeof billSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
