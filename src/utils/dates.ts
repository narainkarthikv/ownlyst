/**
 * Date formatting and utility functions
 * Handles consistent date handling across the application
 */

/**
 * Format a date to a short string (e.g., "Jan 15")
 */
export function formatDateShort(date: Date | string): string {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return '-';
  }
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Format a date to full string (e.g., "January 15, 2026")
 */
export function formatDateFull(date: Date | string): string {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return '-';
  }
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Format a date for HTML input[type="date"]
 */
export function formatDateForInput(date: Date | string | undefined): string {
  if (!date) return '';
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  return dateObj.toISOString().split('T')[0];
}

/**
 * Check if a date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = new Date(date);
  const today = new Date();
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date | string): boolean {
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dateObj < today;
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: Date | string): boolean {
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return dateObj > today;
}

/**
 * Check if a due date is overdue
 */
export function isOverdue(dueDate: Date | string | undefined): boolean {
  if (!dueDate) return false;
  return isPast(dueDate) && !isToday(dueDate);
}

/**
 * Check if a due date is due today
 */
export function isDueToday(dueDate: Date | string | undefined): boolean {
  if (!dueDate) return false;
  return isToday(dueDate);
}

/**
 * Get relative time string (e.g., "2 days ago", "in 3 hours")
 */
export function getRelativeTime(date: Date | string): string {
  const dateObj = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

/**
 * Parse a date string that may come from localStorage
 */
export function parseDate(value: Date | string | undefined): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? undefined : parsed;
}
