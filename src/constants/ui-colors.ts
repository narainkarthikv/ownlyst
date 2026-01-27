/**
 * Unified UI Color Classes
 * 
 * Semantic, consistent color system used across ALL views:
 * - Notes (grid)
 * - Kanban (cards)
 * - Table (cells)
 * - Roadmap (timeline)
 * 
 * Rules:
 * - Surface colors remain neutral (light gray background, border)
 * - Status badges use semantic colors (green/blue/cyan)
 * - Priority indicators use semantic colors
 * - No arbitrary decorative colors per note/item type
 */

// ============= SURFACE (Content Container) =============
export const SURFACE_CLASSES = {
  base: 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700',
  elevated: 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm',
  hover: 'hover:shadow-md dark:hover:shadow-lg hover:border-gray-300 dark:hover:border-slate-600 transition-all',
  interactive: 'cursor-pointer transition-all duration-200',
};

// ============= STATUS BADGES (Semantic: todo, in-progress, done) =============
export const STATUS_CLASSES = {
  todo: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-800',
  'in-progress': 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-200 border border-amber-200 dark:border-amber-800',
  done: 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-200 border border-green-200 dark:border-green-800',
};

// ============= PRIORITY BADGES (Semantic: low, medium, high) =============
export const PRIORITY_CLASSES = {
  low: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-800',
  medium: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-200 border border-amber-200 dark:border-amber-800',
  high: 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-800',
};

// ============= TEXT HIERARCHY =============
export const TEXT_CLASSES = {
  primary: 'text-gray-900 dark:text-gray-50',
  secondary: 'text-gray-600 dark:text-gray-300',
  muted: 'text-gray-500 dark:text-gray-400',
  tertiary: 'text-gray-400 dark:text-gray-500',
};

// ============= BUTTON STYLES =============
export const BUTTON_CLASSES = {
  primary: 'px-3 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 dark:active:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-colors font-medium text-sm',
  secondary: 'px-3 py-2 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 active:bg-gray-300 dark:active:bg-slate-500 disabled:bg-gray-200 dark:disabled:bg-slate-800 transition-colors font-medium text-sm',
  tertiary: 'px-3 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 active:bg-gray-200 dark:active:bg-slate-600 disabled:text-gray-400 dark:disabled:text-gray-500 transition-colors font-medium text-sm',
  ghost: 'p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors',
};

// ============= ICON BUTTON STYLES =============
export const ICON_BUTTON_CLASSES = {
  default: 'p-1 rounded-md bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-gray-900 dark:hover:text-gray-200 shadow-sm transition-all text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none',
  pinned: 'p-1 rounded-md bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-600 shadow-sm transition-all text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none',
  delete: 'p-1 rounded-md bg-white dark:bg-slate-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-red-600 dark:hover:text-red-400 shadow-sm transition-all text-xs focus:ring-2 focus:ring-red-500 focus:outline-none',
};

// ============= BORDER STYLES =============
export const BORDER_CLASSES = {
  primary: 'border-gray-200 dark:border-slate-700',
  subtle: 'border-gray-100 dark:border-slate-800',
  focus: 'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
};

// ============= BACKGROUND STYLES =============
export const BG_CLASSES = {
  page: 'bg-gray-50 dark:bg-slate-900',
  surface: 'bg-white dark:bg-slate-800',
  elevated: 'bg-white dark:bg-slate-700',
  muted: 'bg-gray-100 dark:bg-slate-700',
  overlay: 'bg-black/50 dark:bg-black/70',
};

// ============= UTILITIES =============
export const UTILITY_CLASSES = {
  groupBg: 'bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700',
  divider: 'border-gray-200 dark:border-slate-700',
  input: 'px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
};

// ============= COLOR PICKER STYLES =============
export const COLOR_PICKER_CLASSES = {
  container: 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg',
  header: 'text-sm font-medium text-gray-900 dark:text-gray-100',
  closeButton: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors',
  colorLabel: 'text-[10px] font-medium text-gray-600 dark:text-gray-400',
  selectedRing: 'ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400 dark:ring-offset-slate-800',
  hoverRing: 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 dark:hover:ring-gray-600 dark:hover:ring-offset-slate-800',
};

// ============= MODAL STYLES =============
export const MODAL_CLASSES = {
  backdrop: 'bg-black/50 backdrop-blur-sm',
  container: 'bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700',
  header: 'border-b border-gray-200 dark:border-slate-700',
  title: 'text-xl font-bold text-gray-900 dark:text-white',
  closeButton: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
};

// ============= HEADER & NAVIGATION STYLES =============
export const HEADER_CLASSES = {
  container: 'bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700',
  title: 'text-gray-900 dark:text-white',
  link: 'text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200 transition-colors',
  tabContainer: 'bg-gray-100 dark:bg-slate-700 rounded-lg',
};

// ============= FOOTER STYLES =============
export const FOOTER_CLASSES = {
  container: 'border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800',
  text: 'text-gray-600 dark:text-gray-400',
};
