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
  low: 'bg-white dark:bg-[#121B26] border-l-4 border-l-blue-500 dark:border-l-[#3B82F6] border border-gray-200 dark:border-[#1E2C3C] text-gray-900 dark:text-[#EAF2F6] shadow-sm',
  medium:
    'bg-white dark:bg-[#121B26] border-l-4 border-l-amber-500 dark:border-l-[#F59E0B] border border-gray-200 dark:border-[#1E2C3C] text-gray-900 dark:text-[#EAF2F6] shadow-sm',
  high: 'bg-white dark:bg-[#121B26] border-l-4 border-l-red-500 dark:border-l-[#EF4444] border border-gray-200 dark:border-[#1E2C3C] text-gray-900 dark:text-[#EAF2F6] shadow-sm',
};

/**
 * Priority indicator dots/badges
 * Small colored indicators for priority in compact layouts
 */
export const PRIORITY_INDICATOR_CLASSES: Record<NotePriority, string> = {
  low: 'bg-blue-500 dark:bg-[#3B82F6]',
  medium: 'bg-amber-500 dark:bg-[#F59E0B]',
  high: 'bg-red-500 dark:bg-[#EF4444]',
};

/**
 * Priority badge colors for text labels
 * Used in table cells and inline priority displays
 */
export const PRIORITY_BADGE_COLORS: Record<NotePriority, string> = {
  low: 'bg-blue-100 dark:bg-[rgba(59,130,246,0.2)] text-blue-700 dark:text-[#EAF2F6] border border-blue-200 dark:border-[#3B82F6]',
  medium:
    'bg-amber-100 dark:bg-[rgba(245,158,11,0.2)] text-amber-700 dark:text-[#EAF2F6] border border-amber-200 dark:border-[#F59E0B]',
  high: 'bg-red-100 dark:bg-[rgba(239,68,68,0.2)] text-red-700 dark:text-[#EAF2F6] border border-red-200 dark:border-[#EF4444]',
};

/**
 * Priority text colors for inline text
 */
export const PRIORITY_TEXT_COLORS: Record<NotePriority, string> = {
  low: 'text-blue-600 dark:text-[#60A5FA]',
  medium: 'text-amber-600 dark:text-[#F59E0B]',
  high: 'text-red-600 dark:text-[#EF4444]',
};

/**
 * SEMANTIC STATUS COLORS - Communicate task state
 * todo = Blue, in-progress = Amber, done = Green
 */
export type NoteStatus = 'todo' | 'in-progress' | 'done';

export const STATUS_COLOR_CLASSES: Record<NoteStatus, string> = {
  todo: 'bg-blue-50/80 dark:bg-[rgba(59,130,246,0.18)] border-blue-200 dark:border-[#3B82F6] text-gray-900 dark:text-[#EAF2F6] shadow-sm',
  'in-progress':
    'bg-amber-50/80 dark:bg-[rgba(245,158,11,0.2)] border-amber-200 dark:border-[#F59E0B] text-gray-900 dark:text-[#EAF2F6] shadow-sm',
  done: 'bg-green-50/80 dark:bg-[rgba(34,197,94,0.2)] border-green-200 dark:border-[#22C55E] text-gray-900 dark:text-[#EAF2F6] shadow-sm',
};

/**
 * STATUS BADGE BACKGROUND - Used in status badge displays
 */
export const STATUS_BADGE_COLORS: Record<NoteStatus, string> = {
  todo: 'bg-blue-100 dark:bg-[rgba(59,130,246,0.2)] text-blue-700 dark:text-[#EAF2F6] border border-blue-200 dark:border-[#3B82F6]',
  'in-progress':
    'bg-amber-100 dark:bg-[rgba(245,158,11,0.2)] text-amber-700 dark:text-[#EAF2F6] border border-amber-200 dark:border-[#F59E0B]',
  done: 'bg-green-100 dark:bg-[rgba(34,197,94,0.2)] text-green-700 dark:text-[#EAF2F6] border border-green-200 dark:border-[#22C55E]',
};

/**
 * Status badge text colors
 */
export const STATUS_TEXT_COLORS: Record<NoteStatus, string> = {
  todo: 'text-blue-600 dark:text-[#60A5FA]',
  'in-progress': 'text-amber-600 dark:text-[#F59E0B]',
  done: 'text-green-600 dark:text-[#22C55E]',
};

// Legacy type exports for backward compatibility - to be removed
export type NoteColor = NotePriority;
