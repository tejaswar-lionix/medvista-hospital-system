import { z } from 'zod';

export const createPatientSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  ),
  dateOfBirth: z.string().min(1, 'Date of birth is required').refine((val) => {
    const date = new Date(val);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age >= 0 && age <= 120;
  }, 'Please enter a valid date of birth'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
    errorMap: () => ({ message: 'Please select a gender' }),
  }),
  phone: z.string().regex(/^\+?[\d\s-]{10,15}$/, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Address must be at least 5 characters').max(500, 'Address must be less than 500 characters'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  emergencyContact: z.string().regex(/^\+?[\d\s-]{10,15}$/, 'Please enter a valid emergency contact number').optional(),
  emergencyContactName: z.string().max(100, 'Name must be less than 100 characters').optional(),
  insuranceProvider: z.string().max(100, 'Provider name must be less than 100 characters').optional(),
  insurancePolicyNumber: z.string().max(50, 'Policy number must be less than 50 characters').optional(),
  medicalHistory: z.string().max(2000, 'Medical history must be less than 2000 characters').optional(),
});

export const updatePatientSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  dateOfBirth: z.string().refine((val) => {
    const date = new Date(val);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age >= 0 && age <= 120;
  }, 'Please enter a valid date of birth').optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  phone: z.string().regex(/^\+?[\d\s-]{10,15}$/).optional(),
  address: z.string().min(5).max(500).optional(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  emergencyContact: z.string().regex(/^\+?[\d\s-]{10,15}$/).optional(),
  emergencyContactName: z.string().max(100).optional(),
  insuranceProvider: z.string().max(100).optional(),
  insurancePolicyNumber: z.string().max(50).optional(),
  medicalHistory: z.string().max(2000).optional(),
});

export const patientFilterSchema = z.object({
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  search: z.string().optional(),
  ageFrom: z.number().min(0).optional(),
  ageTo: z.number().min(0).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;
export type PatientFilterInput = z.infer<typeof patientFilterSchema>;
