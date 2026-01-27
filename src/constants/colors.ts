/**
 * Unified Color System - Priority-Based, Minimal, Consistent
 * 
 * CRITICAL RULES:
 * - ALL note cards/items use priority-based colors (low = blue, medium = amber, high = red)
 * - Priority colors communicate importance and urgency
 * - Status badges (todo, in-progress, done) use semantic colors
 * - NO arbitrary decorative colors
 * - Color communicates: state, priority, status — NOT decoration
 * 
 * This ensures:
 * - Visual consistency across all views (Notes, Kanban, Table, Roadmap)
 * - Minimal, calm appearance
 * - Accessible contrast ratios (WCAG AA)
 * - Priority-driven visual hierarchy
 */

/**
 * PRIORITY-BASED COLORS - Core visual system
 * Low = Blue, Medium = Amber, High = Red
 */
export type NotePriority = 'low' | 'medium' | 'high';

/**
 * Priority color classes for note cards and containers
 * Used across all views for consistent priority visualization
 */
export const PRIORITY_CARD_CLASSES: Record<NotePriority, string> = {
  low: 'bg-white dark:bg-slate-800 border-l-4 border-l-blue-500 dark:border-l-blue-400 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white shadow-sm',
  medium: 'bg-white dark:bg-slate-800 border-l-4 border-l-amber-500 dark:border-l-amber-400 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white shadow-sm',
  high: 'bg-white dark:bg-slate-800 border-l-4 border-l-red-500 dark:border-l-red-400 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white shadow-sm',
};

/**
 * Priority indicator dots/badges
 * Small colored indicators for priority in compact layouts
 */
export const PRIORITY_INDICATOR_CLASSES: Record<NotePriority, string> = {
  low: 'bg-blue-500 dark:bg-blue-400',
  medium: 'bg-amber-500 dark:bg-amber-400',
  high: 'bg-red-500 dark:bg-red-400',
};

/**
 * Priority badge colors for text labels
 * Used in table cells and inline priority displays
 */
export const PRIORITY_BADGE_COLORS: Record<NotePriority, string> = {
  low: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700',
  medium: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700',
  high: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700',
};

/**
 * Priority text colors for inline text
 */
export const PRIORITY_TEXT_COLORS: Record<NotePriority, string> = {
  low: 'text-blue-600 dark:text-blue-400',
  medium: 'text-amber-600 dark:text-amber-400',
  high: 'text-red-600 dark:text-red-400',
};

/**
 * SEMANTIC STATUS COLORS - Communicate task state
 * todo = Blue, in-progress = Amber, done = Green
 */
export type NoteStatus = 'todo' | 'in-progress' | 'done';

export const STATUS_COLOR_CLASSES: Record<NoteStatus, string> = {
  todo: 'bg-blue-50/80 dark:bg-blue-900/40 border-blue-200 dark:border-blue-600/50 text-gray-900 dark:text-white shadow-sm',
  'in-progress': 'bg-amber-50/80 dark:bg-amber-900/40 border-amber-200 dark:border-amber-600/50 text-gray-900 dark:text-white shadow-sm',
  done: 'bg-green-50/80 dark:bg-green-900/40 border-green-200 dark:border-green-600/50 text-gray-900 dark:text-white shadow-sm',
};

/**
 * STATUS BADGE BACKGROUND - Used in status badge displays
 */
export const STATUS_BADGE_COLORS: Record<NoteStatus, string> = {
  todo: 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700',
  'in-progress': 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700',
  done: 'bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700',
};

/**
 * Status badge text colors
 */
export const STATUS_TEXT_COLORS: Record<NoteStatus, string> = {
  todo: 'text-blue-600 dark:text-blue-400',
  'in-progress': 'text-amber-600 dark:text-amber-400',
  done: 'text-green-600 dark:text-green-400',
};

// Legacy type exports for backward compatibility - to be removed
export type NoteColor = NotePriority;

