import { z } from 'zod';

// Authentication Configuration
export const AuthConfig = {
  JWT_SECRET: process.env.JWT_SECRET || 'your_default_secret',
  JWT_EXPIRATION: '1h',
};

// Email Validation Schema
export const EmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      'Password must include uppercase, lowercase, number, and special character')
});

export type EmailLoginCredentials = z.infer<typeof EmailSchema>;