import { z } from 'zod';

export const createDoctorSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  ),
  specialization: z.string().min(2, 'Specialization is required'),
  departmentId: z.string().min(1, 'Please select a department'),
  qualification: z.string().min(2, 'Qualification is required'),
  experience: z.number().min(0, 'Experience cannot be negative').max(50, 'Experience cannot exceed 50 years'),
  consultationFee: z.number().min(0, 'Fee cannot be negative').max(100000, 'Fee seems too high'),
  availableDays: z.string().min(1, 'Please select available days'),
  availableTimeStart: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  availableTimeEnd: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  phone: z.string().regex(/^\+?[\d\s-]{10,15}$/, 'Please enter a valid phone number').optional(),
  bio: z.string().max(1000, 'Bio must be less than 1000 characters').optional(),
});

export const updateDoctorSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  specialization: z.string().min(2).optional(),
  departmentId: z.string().min(1).optional(),
  qualification: z.string().min(2).optional(),
  experience: z.number().min(0).max(50).optional(),
  consultationFee: z.number().min(0).max(100000).optional(),
  availableDays: z.string().min(1).optional(),
  availableTimeStart: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  availableTimeEnd: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  phone: z.string().regex(/^\+?[\d\s-]{10,15}$/).optional(),
  bio: z.string().max(1000).optional(),
});

export const doctorFilterSchema = z.object({
  departmentId: z.string().optional(),
  specialization: z.string().optional(),
  search: z.string().optional(),
  minExperience: z.number().min(0).optional(),
  maxFee: z.number().min(0).optional(),
  availableDay: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export type CreateDoctorInput = z.infer<typeof createDoctorSchema>;
export type UpdateDoctorInput = z.infer<typeof updateDoctorSchema>;
export type DoctorFilterInput = z.infer<typeof doctorFilterSchema>;
