import { z } from 'zod';

export const createAppointmentSchema = z.object({
  doctorId: z.string().min(1, 'Please select a doctor'),
  departmentId: z.string().min(1, 'Please select a department'),
  date: z.string().min(1, 'Please select a date').refine((val) => {
    const date = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, 'Appointment date must be today or in the future'),
  time: z.string().min(1, 'Please select a time slot'),
  duration: z.number().min(15, 'Minimum duration is 15 minutes').max(120, 'Maximum duration is 120 minutes').default(30),
  type: z.enum(['CONSULTATION', 'FOLLOW_UP', 'CHECK_UP', 'EMERGENCY', 'PROCEDURE'], {
    errorMap: () => ({ message: 'Please select an appointment type' }),
  }),
  reason: z.string().min(3, 'Please provide a reason for your visit').max(500, 'Reason must be less than 500 characters'),
  notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional(),
});

export const updateAppointmentSchema = z.object({
  date: z.string().optional(),
  time: z.string().optional(),
  duration: z.number().min(15).max(120).optional(),
  status: z.enum(['SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW']).optional(),
  type: z.enum(['CONSULTATION', 'FOLLOW_UP', 'CHECK_UP', 'EMERGENCY', 'PROCEDURE']).optional(),
  reason: z.string().min(3).max(500).optional(),
  notes: z.string().max(1000).optional(),
});

export const appointmentFilterSchema = z.object({
  patientId: z.string().optional(),
  doctorId: z.string().optional(),
  departmentId: z.string().optional(),
  status: z.enum(['SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW']).optional(),
  type: z.enum(['CONSULTATION', 'FOLLOW_UP', 'CHECK_UP', 'EMERGENCY', 'PROCEDURE']).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
export type AppointmentFilterInput = z.infer<typeof appointmentFilterSchema>;
