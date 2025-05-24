import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

export const bookingSchema = z.object({
  sacco_id: z.string().min(1, 'Please select a Sacco'),
  matatu_id: z.string().min(1, 'Please select a Matatu'),
  seat_number: z.string().min(1, 'Please select a seat'),
  travel_date: z.date({
    required_error: 'Please select a date',
    invalid_type_error: 'Invalid date format'
  }),
  travel_time: z.string().min(1, 'Please select a time')
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;