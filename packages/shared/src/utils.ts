import { CURRENCY, DATE_FORMATS } from './constants';

/**
 * Format currency amount with proper symbol and decimal places
 */
export const formatCurrency = (
  amount: number,
  currency: string = CURRENCY.DEFAULT
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: CURRENCY.DECIMAL_PLACES,
    maximumFractionDigits: CURRENCY.DECIMAL_PLACES,
  }).format(amount);
};

/**
 * Format date for display
 */
export const formatDate = (
  date: Date | string,
  format: string = DATE_FORMATS.DISPLAY
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case DATE_FORMATS.DISPLAY:
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
    case DATE_FORMATS.MONTH_YEAR:
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      });
    case DATE_FORMATS.FULL:
      return dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      });
    default:
      return dateObj.toISOString().split('T')[0];
  }
};

/**
 * Calculate percentage with proper rounding
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100 * 100) / 100; // Round to 2 decimal places
};

/**
 * Generate a random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | undefined;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay) as any;
  };
};

/**
 * Check if a date is in the current month
 */
export const isCurrentMonth = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  return (
    dateObj.getMonth() === now.getMonth() &&
    dateObj.getFullYear() === now.getFullYear()
  );
};

/**
 * Get start and end dates for a given month/year
 */
export const getMonthDateRange = (
  month: number,
  year: number
): { startDate: Date; endDate: Date } => {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);
  return { startDate, endDate };
};

/**
 * Sanitize string for safe display
 */
export const sanitizeString = (str: string): string => {
  return str.replace(/[<>]/g, '');
};

/**
 * Check if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate color variations for charts
 */
export const generateColorPalette = (baseColors: string[]): string[] => {
  const variations = ['', '80', '60', '40', '20'];
  const palette: string[] = [];
  
  baseColors.forEach((color) => {
    variations.forEach((opacity) => {
      if (opacity) {
        palette.push(`${color}${opacity}`);
      } else {
        palette.push(color);
      }
    });
  });
  
  return palette;
};

/**
 * Calculate budget status based on spent amount and budget limit
 */
export const getBudgetStatus = (
  spent: number,
  budget: number
): 'on-track' | 'close-to-limit' | 'over-budget' => {
  const percentage = spent / budget;
  
  if (percentage >= 1) return 'over-budget';
  if (percentage >= 0.8) return 'close-to-limit';
  return 'on-track';
};

/**
 * Deep clone an object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Format number with abbreviations (K, M, B)
 */
export const formatNumberAbbreviation = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
