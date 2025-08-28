export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  userId: string;
  type: 'income' | 'expense';
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  category?: Category;
  userId: string;
  type: 'income' | 'expense';
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  categoryId: string;
  category?: Category;
  userId: string;
  period: 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'alert' | 'info';
  userId: string;
  read: boolean;
  scheduledFor?: Date;
  createdAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser extends User {
  tokens: AuthTokens;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  period: string;
}

export interface CategorySummary {
  categoryId: string;
  categoryName: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyReport {
  month: string;
  year: number;
  summary: TransactionSummary;
  categories: CategorySummary[];
  budgetPerformance: BudgetPerformance[];
}

export interface BudgetPerformance {
  budgetId: string;
  budgetName: string;
  allocated: number;
  spent: number;
  remaining: number;
  percentage: number;
  status: 'on-track' | 'over-budget' | 'close-to-limit';
}

export type TransactionType = 'income' | 'expense';
export type BudgetPeriod = 'monthly' | 'yearly';
export type NotificationType = 'reminder' | 'alert' | 'info';
export type BudgetStatus = 'on-track' | 'over-budget' | 'close-to-limit';
