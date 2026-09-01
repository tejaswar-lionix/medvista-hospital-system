import { z } from 'zod';

export const createBillSchema = z.object({
  patientId: z.string().min(1, 'Please select a patient'),
  appointmentId: z.string().optional(),
  amount: z.number().min(1, 'Amount must be greater than 0').max(10000000, 'Amount seems too high'),
  description: z.string().min(3, 'Description is required').max(500, 'Description must be less than 500 characters'),
  dueDate: z.string().min(1, 'Due date is required').refine((val) => {
    const date = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, 'Due date must be today or in the future'),
});

export const updateBillSchema = z.object({
  amount: z.number().min(1).max(10000000).optional(),
  status: z.enum(['PENDING', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'CANCELLED']).optional(),
  description: z.string().min(3).max(500).optional(),
  dueDate: z.string().optional(),
});

export const paymentSchema = z.object({
  billId: z.string().min(1, 'Bill ID is required'),
  amount: z.number().min(1, 'Payment amount must be greater than 0'),
  method: z.enum(['CASH', 'CARD', 'UPI', 'NET_BANKING', 'INSURANCE'], {
    errorMap: () => ({ message: 'Please select a payment method' }),
  }),
  transactionId: z.string().optional(),
});

export const billFilterSchema = z.object({
  patientId: z.string().optional(),
  status: z.enum(['PENDING', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'CANCELLED']).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  minAmount: z.number().min(0).optional(),
  maxAmount: z.number().min(0).optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export type CreateBillInput = z.infer<typeof createBillSchema>;
export type UpdateBillInput = z.infer<typeof updateBillSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
export type BillFilterInput = z.infer<typeof billFilterSchema>;
