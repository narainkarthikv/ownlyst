/**
 * Centralized color definitions and Tailwind CSS classes
 * Used across all note components (NotesView, KanbanView, TableView, RoadmapView, etc.)
 */

export const COLOR_NAMES = [
  'indigo',
  'emerald',
  'sky',
  'rose',
  'violet',
  'amber',
  'slate',
  'cyan',
  'lime',
  'orange',
  'teal',
] as const;

export type NoteColor = (typeof COLOR_NAMES)[number];

/**
 * Display colors for note cards (muted/pale appearance)
 * Used in NotesView, KanbanView card displays
 */
export const DISPLAY_COLOR_CLASSES: Record<NoteColor, string> = {
  indigo:
    'bg-indigo-100 dark:bg-indigo-900/60 border-indigo-200 dark:border-indigo-600 text-gray-900 dark:text-white shadow-sm',
  emerald:
    'bg-emerald-100 dark:bg-emerald-900/60 border-emerald-200 dark:border-emerald-600 text-gray-900 dark:text-white shadow-sm',
  sky: 'bg-sky-100 dark:bg-sky-900/60 border-sky-200 dark:border-sky-600 text-gray-900 dark:text-white shadow-sm',
  rose: 'bg-rose-100 dark:bg-rose-900/60 border-rose-200 dark:border-rose-600 text-gray-900 dark:text-white shadow-sm',
  violet:
    'bg-violet-100 dark:bg-violet-900/60 border-violet-200 dark:border-violet-600 text-gray-900 dark:text-white shadow-sm',
  amber:
    'bg-amber-100 dark:bg-amber-900/60 border-amber-200 dark:border-amber-600 text-gray-900 dark:text-white shadow-sm',
  slate:
    'bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-600 text-gray-900 dark:text-white shadow-sm',
  cyan: 'bg-cyan-100 dark:bg-cyan-900/60 border-cyan-200 dark:border-cyan-600 text-gray-900 dark:text-white shadow-sm',
  lime: 'bg-lime-100 dark:bg-lime-900/60 border-lime-200 dark:border-lime-600 text-gray-900 dark:text-white shadow-sm',
  orange:
    'bg-orange-100 dark:bg-orange-900/60 border-orange-200 dark:border-orange-600 text-gray-900 dark:text-white shadow-sm',
  teal: 'bg-teal-100 dark:bg-teal-900/60 border-teal-200 dark:border-teal-600 text-gray-900 dark:text-white shadow-sm',
};

/**
 * Lighter variant colors for table/list displays
 * Used in TableView and other dense layouts
 */
export const LIGHT_COLOR_CLASSES: Record<NoteColor, string> = {
  indigo:
    'bg-indigo-200 dark:bg-indigo-800/50 border-indigo-300 dark:border-indigo-600 shadow-sm',
  emerald:
    'bg-emerald-200 dark:bg-emerald-800/50 border-emerald-300 dark:border-emerald-600 shadow-sm',
  sky: 'bg-sky-200 dark:bg-sky-800/50 border-sky-300 dark:border-sky-600 shadow-sm',
  rose: 'bg-rose-200 dark:bg-rose-900/50 border-rose-300 dark:border-rose-700 shadow-sm',
  violet:
    'bg-violet-200 dark:bg-violet-900/50 border-violet-300 dark:border-violet-700 shadow-sm',
  amber:
    'bg-amber-200 dark:bg-amber-900/50 border-amber-300 dark:border-amber-700 shadow-sm',
  slate:
    'bg-slate-200 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700 shadow-sm',
  cyan: 'bg-cyan-200 dark:bg-cyan-900/50 border-cyan-300 dark:border-cyan-700 shadow-sm',
  lime: 'bg-lime-200 dark:bg-lime-900/50 border-lime-300 dark:border-lime-700 shadow-sm',
  orange:
    'bg-orange-200 dark:bg-orange-900/50 border-orange-300 dark:border-orange-700 shadow-sm',
  teal: 'bg-teal-200 dark:bg-teal-900/50 border-teal-300 dark:border-teal-700 shadow-sm',
};

/**
 * Active/bright colors for color picker and selection states
 * Used in ColorPicker component
 */
export const ACTIVE_COLOR_CLASSES: Record<NoteColor, string> = {
  indigo: 'bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:bg-indigo-500',
  emerald:
    'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-400 dark:hover:bg-emerald-500',
  sky: 'bg-sky-500 hover:bg-sky-600 dark:bg-sky-400 dark:hover:bg-sky-500',
  rose: 'bg-rose-500 hover:bg-rose-600 dark:bg-rose-400 dark:hover:bg-rose-500',
  violet:
    'bg-violet-500 hover:bg-violet-600 dark:bg-violet-400 dark:hover:bg-violet-500',
  amber: 'bg-amber-500 hover:bg-amber-600 dark:bg-amber-400 dark:hover:bg-amber-500',
  slate: 'bg-slate-500 hover:bg-slate-600 dark:bg-slate-400 dark:hover:bg-slate-500',
  cyan: 'bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-400 dark:hover:bg-cyan-500',
  lime: 'bg-lime-500 hover:bg-lime-600 dark:bg-lime-400 dark:hover:bg-lime-500',
  orange:
    'bg-orange-500 hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500',
  teal: 'bg-teal-500 hover:bg-teal-600 dark:bg-teal-400 dark:hover:bg-teal-500',
};

/**
 * Priority-based color mapping
 * Used in priority badges and visual indicators
 */
export type NotePriority = 'low' | 'medium' | 'high';

export const PRIORITY_COLOR_CLASSES: Record<NotePriority, string> = {
  low: 'bg-indigo-500 dark:bg-indigo-400 text-white shadow-sm',
  medium: 'bg-blue-500 dark:bg-blue-400 text-white shadow-sm',
  high: 'bg-cyan-600 dark:bg-cyan-500 text-white shadow-sm',
};

/**
 * Status-based color mapping
 * Used in status badges and column headers
 */
export type NoteStatus = 'todo' | 'in-progress' | 'done';

export const STATUS_COLOR_CLASSES: Record<NoteStatus, string> = {
  todo: 'bg-indigo-50/80 dark:bg-indigo-900/40 border-indigo-200 dark:border-indigo-600/50 text-black dark:text-white shadow-sm',
  'in-progress':
    'bg-blue-50/80 dark:bg-blue-900/40 border-blue-200 dark:border-blue-600/50 text-black dark:text-white shadow-sm',
  done: 'bg-cyan-50/80 dark:bg-cyan-900/40 border-cyan-200 dark:border-cyan-600/50 text-black dark:text-white shadow-sm',
};

/**
 * Status badge background colors (darker variant)
 * Used in status indicators
 */
export const STATUS_BADGE_COLORS: Record<NoteStatus, string> = {
  todo: 'bg-indigo-100 dark:bg-indigo-900/60 border-indigo-200 dark:border-indigo-600 text-gray-900 dark:text-white shadow-sm',
  'in-progress':
    'bg-blue-100 dark:bg-blue-900/60 border-blue-200 dark:border-blue-600 text-gray-900 dark:text-white shadow-sm',
  done: 'bg-cyan-100 dark:bg-cyan-900/60 border-cyan-200 dark:border-cyan-600 text-gray-900 dark:text-white shadow-sm',
};

/**
 * Priority badge colors
 * Used in priority indicators
 */
export const PRIORITY_BADGE_COLORS: Record<NotePriority, string> = {
  low: 'text-indigo-600 dark:text-indigo-400',
  medium: 'text-blue-600 dark:text-blue-400',
  high: 'text-cyan-700 dark:text-cyan-500',
};

/**
 * Color picker palette definition
 * Used in ColorPicker component to display available colors
 */
export const COLOR_PICKER_PALETTE = COLOR_NAMES.map((color) => ({
  id: color,
  label: color.charAt(0).toUpperCase() + color.slice(1),
  class: ACTIVE_COLOR_CLASSES[color],
}));
