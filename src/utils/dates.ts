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
  // If already a YYYY-MM-DD date string, return directly to avoid timezone shift on parsing
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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

/**
 * Check if two dates represent the same calendar day
 */
export function isSameDay(
  date1: Date | string | undefined,
  date2: Date | string | undefined
): boolean {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * Get total number of days in a given month of a year
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of the week for the 1st of a given month (0 = Sunday, 6 = Saturday)
 */
export function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Calendar day cell representation for monthly grid
 */
export interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  dateString: string;
}

/**
 * Generate full grid of calendar days for a given month and year,
 * including trailing days from previous month and leading days for next month.
 */
export function getCalendarGridDays(
  year: number,
  month: number
): CalendarDay[] {
  const days: CalendarDay[] = [];
  const startDayOfWeek = new Date(year, month, 1).getDay();
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Previous month's trailing days
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const date = new Date(year, month - 1, d);
    days.push({
      date,
      dayOfMonth: d,
      isCurrentMonth: false,
      isToday: isToday(date),
      dateString: formatDateForInput(date),
    });
  }

  // Current month's days
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const date = new Date(year, month, d);
    days.push({
      date,
      dayOfMonth: d,
      isCurrentMonth: true,
      isToday: isToday(date),
      dateString: formatDateForInput(date),
    });
  }

  // Next month's leading days (pad to complete week rows: multiple of 7)
  const totalCells = Math.ceil(days.length / 7) * 7;
  const remaining = totalCells - days.length;
  for (let d = 1; d <= remaining; d++) {
    const date = new Date(year, month + 1, d);
    days.push({
      date,
      dayOfMonth: d,
      isCurrentMonth: false,
      isToday: isToday(date),
      dateString: formatDateForInput(date),
    });
  }

  return days;
}

/**
 * Navigate months by adding or subtracting an offset
 */
export function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}
