/**
 * StatusBadge Component - Pure UI Component
 * 
 * Displays a badge indicating note workflow status.
 * Pure presentation component with no business logic.
 */

import { STATUS_LABELS } from '../../models/enums';
import type { NoteStatus } from '../../models/note.model';

/**
 * Status badge color classes
 * Maps status values to Tailwind color utilities
 */
const statusColors: Record<NoteStatus, string> = {
  'todo': 'bg-indigo-100 dark:bg-indigo-900/60 border-indigo-200 dark:border-indigo-600 text-gray-900 dark:text-white shadow-sm',
  'in-progress':
    'bg-blue-100 dark:bg-blue-900/60 border-blue-200 dark:border-blue-600 text-gray-900 dark:text-white shadow-sm',
  'done':
    'bg-cyan-100 dark:bg-cyan-900/60 border-cyan-200 dark:border-cyan-600 text-gray-900 dark:text-white shadow-sm',
};

/**
 * Props for StatusBadge component
 */
interface StatusBadgeProps {
  /** Status value to display */
  status: NoteStatus;
  /** Size variant */
  size?: 'sm' | 'md';
}

/**
 * Size CSS classes mapping
 */
const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

/**
 * StatusBadge - Displays status indicator
 * 
 * Simple component for showing note workflow status.
 * Used in note cards, lists, and Kanban views.
 */
export default function StatusBadge({
  status,
  size = 'md',
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full font-medium border ${statusColors[status]} ${sizeClasses[size]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
