export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
  },
  TRANSACTIONS: {
    LIST: '/transactions',
    CREATE: '/transactions',
    UPDATE: (id: string) => `/transactions/${id}`,
    DELETE: (id: string) => `/transactions/${id}`,
    SUMMARY: '/transactions/summary',
  },
  CATEGORIES: {
    LIST: '/categories',
    CREATE: '/categories',
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,
  },
  BUDGETS: {
    LIST: '/budgets',
    CREATE: '/budgets',
    UPDATE: (id: string) => `/budgets/${id}`,
    DELETE: (id: string) => `/budgets/${id}`,
    PERFORMANCE: '/budgets/performance',
  },
  REPORTS: {
    MONTHLY: '/reports/monthly',
    YEARLY: '/reports/yearly',
    CATEGORY_BREAKDOWN: '/reports/category-breakdown',
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
  },
} as const;

export const DEFAULT_CATEGORIES = {
  INCOME: [
    { name: 'Salary', color: '#10B981', icon: '💼' },
    { name: 'Freelance', color: '#8B5CF6', icon: '💻' },
    { name: 'Investment', color: '#F59E0B', icon: '📈' },
    { name: 'Other Income', color: '#6B7280', icon: '💰' },
  ],
  EXPENSE: [
    { name: 'Food & Dining', color: '#EF4444', icon: '🍽️' },
    { name: 'Transportation', color: '#3B82F6', icon: '🚗' },
    { name: 'Shopping', color: '#EC4899', icon: '🛍️' },
    { name: 'Entertainment', color: '#F97316', icon: '🎬' },
    { name: 'Bills & Utilities', color: '#84CC16', icon: '📋' },
    { name: 'Healthcare', color: '#06B6D4', icon: '🏥' },
    { name: 'Education', color: '#8B5CF6', icon: '📚' },
    { name: 'Travel', color: '#10B981', icon: '✈️' },
    { name: 'Other', color: '#6B7280', icon: '📦' },
  ],
} as const;

export const BUDGET_ALERT_THRESHOLDS = {
  WARNING: 0.8, // 80% of budget
  DANGER: 0.95, // 95% of budget
  OVER_BUDGET: 1.0, // 100% of budget
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const DATE_FORMATS = {
  API: 'YYYY-MM-DD',
  DISPLAY: 'MMM DD, YYYY',
  MONTH_YEAR: 'MMM YYYY',
  FULL: 'MMMM DD, YYYY',
} as const;

export const CURRENCY = {
  DEFAULT: 'USD',
  SYMBOL: '$',
  DECIMAL_PLACES: 2,
} as const;

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 255,
  AMOUNT_MIN: 0.01,
  AMOUNT_MAX: 999999.99,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: '15m',
  REFRESH_TOKEN: '7d',
  RESET_TOKEN: '1h',
} as const;
