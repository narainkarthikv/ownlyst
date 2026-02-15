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
  base: 'bg-white dark:bg-[#121B26] border border-gray-200 dark:border-[#1E2C3C]',
  elevated:
    'bg-white dark:bg-[#121B26] border border-gray-200 dark:border-[#1E2C3C] shadow-sm',
  hover:
    'hover:shadow-md dark:hover:shadow-lg hover:border-gray-300 dark:hover:border-[#2B3B50] transition-all',
  interactive: 'cursor-pointer transition-all duration-200',
};

// ============= STATUS BADGES (Semantic: todo, in-progress, done) =============
export const STATUS_CLASSES = {
  todo: 'bg-blue-50 dark:bg-[rgba(59,130,246,0.18)] text-blue-700 dark:text-[#EAF2F6] border border-blue-200 dark:border-[#3B82F6]',
  'in-progress':
    'bg-amber-50 dark:bg-[rgba(245,158,11,0.2)] text-amber-700 dark:text-[#EAF2F6] border border-amber-200 dark:border-[#F59E0B]',
  done: 'bg-green-50 dark:bg-[rgba(34,197,94,0.2)] text-green-700 dark:text-[#EAF2F6] border border-green-200 dark:border-[#22C55E]',
};

// ============= PRIORITY BADGES (Semantic: low, medium, high) =============
export const PRIORITY_CLASSES = {
  low: 'bg-blue-50 dark:bg-[rgba(59,130,246,0.18)] text-blue-700 dark:text-[#EAF2F6] border border-blue-200 dark:border-[#3B82F6]',
  medium:
    'bg-amber-50 dark:bg-[rgba(245,158,11,0.2)] text-amber-700 dark:text-[#EAF2F6] border border-amber-200 dark:border-[#F59E0B]',
  high: 'bg-red-50 dark:bg-[rgba(239,68,68,0.2)] text-red-700 dark:text-[#EAF2F6] border border-red-200 dark:border-[#EF4444]',
};

// ============= TEXT HIERARCHY =============
export const TEXT_CLASSES = {
  primary: 'text-gray-900 dark:text-[#EAF2F6]',
  secondary: 'text-gray-600 dark:text-[#9FB0C3]',
  muted: 'text-gray-500 dark:text-[rgba(234,242,246,0.65)]',
  tertiary: 'text-gray-400 dark:text-[rgba(234,242,246,0.45)]',
};

// ============= BUTTON STYLES =============
export const BUTTON_CLASSES = {
  primary:
    'px-3 py-2 bg-blue-600 dark:bg-[#3B82F6] text-white rounded-md hover:bg-blue-700 dark:hover:bg-[#2563EB] active:bg-blue-800 dark:active:bg-[#1E4FBF] disabled:bg-gray-300 dark:disabled:bg-[#1F2C3B] transition-colors font-medium text-sm',
  secondary:
    'px-3 py-2 bg-gray-100 dark:bg-[#1F2C3B] text-gray-900 dark:text-[#EAF2F6] rounded-md hover:bg-gray-200 dark:hover:bg-[#2B3B50] active:bg-gray-300 dark:active:bg-[#1E2C3C] disabled:bg-gray-200 dark:disabled:bg-[#0F1822] transition-colors font-medium text-sm',
  tertiary:
    'px-3 py-2 text-gray-700 dark:text-[#9FB0C3] rounded-md hover:bg-gray-100 dark:hover:bg-[#1F2C3B] active:bg-gray-200 dark:active:bg-[#0F1822] disabled:text-gray-400 dark:disabled:text-[rgba(234,242,246,0.45)] transition-colors font-medium text-sm',
  ghost:
    'p-2 text-gray-600 dark:text-[rgba(234,242,246,0.65)] hover:bg-gray-100 dark:hover:bg-[#1F2C3B] rounded-md transition-colors',
};

// ============= ICON BUTTON STYLES =============
export const ICON_BUTTON_CLASSES = {
  default:
    'p-1 rounded-md bg-white dark:bg-[#1F2C3B] text-gray-600 dark:text-[rgba(234,242,246,0.65)] hover:bg-gray-100 dark:hover:bg-[#2B3B50] hover:text-gray-900 dark:hover:text-[#EAF2F6] shadow-sm transition-all text-xs focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6] focus:outline-none',
  pinned:
    'p-1 rounded-md bg-white dark:bg-[#1F2C3B] text-blue-600 dark:text-[#60A5FA] hover:bg-gray-100 dark:hover:bg-[#2B3B50] shadow-sm transition-all text-xs focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6] focus:outline-none',
  delete:
    'p-1 rounded-md bg-white dark:bg-[#1F2C3B] text-gray-500 dark:text-[rgba(234,242,246,0.65)] hover:bg-gray-100 dark:hover:bg-[#2B3B50] hover:text-red-600 dark:hover:text-[#EF4444] shadow-sm transition-all text-xs focus:ring-2 focus:ring-red-500 focus:outline-none',
};

// ============= BORDER STYLES =============
export const BORDER_CLASSES = {
  primary: 'border-gray-200 dark:border-[#1E2C3C]',
  subtle: 'border-gray-100 dark:border-[#0F1822]',
  focus:
    'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-[#3B82F6] dark:focus-visible:ring-offset-[#0B1118]',
};

// ============= BACKGROUND STYLES =============
export const BG_CLASSES = {
  page: 'bg-gray-50 dark:bg-[#0B1118]',
  surface: 'bg-white dark:bg-[#121B26]',
  elevated: 'bg-white dark:bg-[#1F2C3B]',
  muted: 'bg-gray-100 dark:bg-[#0F1822]',
  overlay: 'bg-black/50 dark:bg-[rgba(2,10,18,0.65)]',
};

// ============= UTILITIES =============
export const UTILITY_CLASSES = {
  groupBg:
    'bg-gray-50 dark:bg-[rgba(18,27,38,0.6)] border border-gray-200 dark:border-[#1E2C3C]',
  divider: 'border-gray-200 dark:border-[#1E2C3C]',
  input:
    'px-3 py-2 bg-white dark:bg-[#0F1822] border border-gray-300 dark:border-[#1E2C3C] text-gray-900 dark:text-[#EAF2F6] placeholder-gray-400 dark:placeholder-[rgba(234,242,246,0.6)] rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6] focus:border-transparent transition-all',
};

// ============= COLOR PICKER STYLES =============
export const COLOR_PICKER_CLASSES = {
  container:
    'bg-white dark:bg-[#121B26] border border-gray-200 dark:border-[#1E2C3C] rounded-lg shadow-lg',
  header: 'text-sm font-medium text-gray-900 dark:text-[#EAF2F6]',
  closeButton:
    'text-gray-600 dark:text-[#9FB0C3] hover:text-gray-900 dark:hover:text-[#EAF2F6] transition-colors',
  colorLabel: 'text-[10px] font-medium text-gray-600 dark:text-[#9FB0C3]',
  selectedRing:
    'ring-2 ring-offset-2 ring-blue-500 dark:ring-[#3B82F6] dark:ring-offset-[#121B26]',
  hoverRing:
    'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 dark:hover:ring-[#2B3B50] dark:hover:ring-offset-[#121B26]',
};

// ============= MODAL STYLES =============
export const MODAL_CLASSES = {
  backdrop: 'bg-black/50 dark:bg-[rgba(2,10,18,0.65)] backdrop-blur-sm',
  container:
    'bg-white dark:bg-[#121B26] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#1E2C3C]',
  header: 'border-b border-gray-200 dark:border-[#1E2C3C]',
  title: 'text-xl font-bold text-gray-900 dark:text-[#EAF2F6]',
  closeButton:
    'text-gray-600 dark:text-[#9FB0C3] hover:text-gray-900 dark:hover:text-[#EAF2F6]',
};

// ============= HEADER & NAVIGATION STYLES =============
export const HEADER_CLASSES = {
  container:
    'bg-white dark:bg-[#121B26] border-b border-gray-200 dark:border-[#1E2C3C]',
  title: 'text-gray-900 dark:text-[#EAF2F6]',
  link: 'text-gray-900 dark:text-[#EAF2F6] hover:text-gray-700 dark:hover:text-[#9FB0C3] transition-colors',
  tabContainer: 'bg-gray-100 dark:bg-[#1F2C3B] rounded-lg',
};

// ============= FOOTER STYLES =============
export const FOOTER_CLASSES = {
  container:
    'border-t border-gray-200 dark:border-[#1E2C3C] bg-white dark:bg-[#121B26]',
  text: 'text-gray-600 dark:text-[#9FB0C3]',
};
