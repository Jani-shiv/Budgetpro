import { z } from 'zod';
import { VALIDATION_RULES } from './constants';

// Auth validations
export const registerSchema = z.object({
  name: z
    .string()
    .min(VALIDATION_RULES.NAME_MIN_LENGTH, 'Name must be at least 2 characters')
    .max(VALIDATION_RULES.NAME_MAX_LENGTH, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(VALIDATION_RULES.PASSWORD_MIN_LENGTH, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z
    .string()
    .min(VALIDATION_RULES.PASSWORD_MIN_LENGTH, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
});

// User validations
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(VALIDATION_RULES.NAME_MIN_LENGTH, 'Name must be at least 2 characters')
    .max(VALIDATION_RULES.NAME_MAX_LENGTH, 'Name must be less than 50 characters')
    .optional(),
  email: z.string().email('Invalid email address').optional(),
});

// Transaction validations
export const createTransactionSchema = z.object({
  amount: z
    .number()
    .min(VALIDATION_RULES.AMOUNT_MIN, 'Amount must be greater than 0')
    .max(VALIDATION_RULES.AMOUNT_MAX, 'Amount is too large'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(VALIDATION_RULES.DESCRIPTION_MAX_LENGTH, 'Description is too long'),
  categoryId: z.string().min(1, 'Category is required'),
  type: z.enum(['income', 'expense']),
  date: z.date().or(z.string().transform((str) => new Date(str))),
});

export const updateTransactionSchema = createTransactionSchema.partial();

// Category validations
export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .max(VALIDATION_RULES.NAME_MAX_LENGTH, 'Category name is too long'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format'),
  icon: z.string().optional(),
  type: z.enum(['income', 'expense']),
});

export const updateCategorySchema = createCategorySchema.partial();

// Budget validations
export const createBudgetSchema = z.object({
  name: z
    .string()
    .min(1, 'Budget name is required')
    .max(VALIDATION_RULES.NAME_MAX_LENGTH, 'Budget name is too long'),
  amount: z
    .number()
    .min(VALIDATION_RULES.AMOUNT_MIN, 'Amount must be greater than 0')
    .max(VALIDATION_RULES.AMOUNT_MAX, 'Amount is too large'),
  categoryId: z.string().min(1, 'Category is required'),
  period: z.enum(['monthly', 'yearly']),
  startDate: z.date().or(z.string().transform((str) => new Date(str))),
  endDate: z.date().or(z.string().transform((str) => new Date(str))),
});

export const updateBudgetSchema = createBudgetSchema.partial();

// Query parameter validations
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export const transactionQuerySchema = paginationSchema.extend({
  type: z.enum(['income', 'expense']).optional(),
  categoryId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  search: z.string().optional(),
});

export const budgetQuerySchema = paginationSchema.extend({
  period: z.enum(['monthly', 'yearly']).optional(),
  status: z.enum(['on-track', 'close-to-limit', 'over-budget']).optional(),
});

export const reportQuerySchema = z.object({
  month: z.coerce.number().min(1).max(12).optional(),
  year: z.coerce.number().min(2000).max(2100).optional(),
  categoryId: z.string().optional(),
});

// Export types for TypeScript
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileData = z.infer<typeof updateProfileSchema>;
export type CreateTransactionData = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionData = z.infer<typeof updateTransactionSchema>;
export type CreateCategoryData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;
export type CreateBudgetData = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetData = z.infer<typeof updateBudgetSchema>;
export type PaginationQuery = z.infer<typeof paginationSchema>;
export type TransactionQuery = z.infer<typeof transactionQuerySchema>;
export type BudgetQuery = z.infer<typeof budgetQuerySchema>;
export type ReportQuery = z.infer<typeof reportQuerySchema>;
