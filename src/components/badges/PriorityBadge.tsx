/**
 * PriorityBadge Component - Pure UI Component
 * 
 * Displays a badge indicating note priority level.
 * Pure presentation component with no business logic.
 */

import { PRIORITY_LABELS } from '../../models/enums';
import type { NotePriority } from '../../models/note.model';

/**
 * Priority badge color classes
 * Maps priority levels to Tailwind color utilities
 */
const priorityColors: Record<NotePriority, string> = {
  low: 'text-indigo-600 dark:text-indigo-400',
  medium: 'text-blue-600 dark:text-blue-400',
  high: 'text-cyan-700 dark:text-cyan-500',
};

/**
 * Props for PriorityBadge component
 */
interface PriorityBadgeProps {
  /** Priority level to display */
  priority: NotePriority;
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
 * PriorityBadge - Displays priority indicator
 * 
 * Simple component for showing note priority levels.
 * Used in note cards, lists, and detail views.
 */
export default function PriorityBadge({
  priority,
  size = 'md',
}: PriorityBadgeProps) {
  return (
    <span
      className={`inline-block font-medium ${priorityColors[priority]} ${sizeClasses[size]}`}>
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
