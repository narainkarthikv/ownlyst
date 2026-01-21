/**
 * ColorBadge Component - Pure UI Component
 * 
 * Displays a colored badge representing a note's color.
 * Pure presentation component with no business logic.
 */

import { ACTIVE_COLOR_CLASSES } from '../../constants/colors';
import type { NoteColor } from '../../models/note.model';

/**
 * Props for ColorBadge component
 */
interface ColorBadgeProps {
  /** Color value to display */
  color: NoteColor;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Size CSS classes mapping
 */
const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-6 w-6',
};

/**
 * ColorBadge - Displays a color indicator
 * 
 * Simple, memoized component for displaying note colors.
 * Used in badges, status indicators, and color selectors.
 */
export default function ColorBadge({
  color,
  size = 'md',
}: ColorBadgeProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-2 ${ACTIVE_COLOR_CLASSES[color]}`}
      aria-label={`Color: ${color}`}
    />
  );
}
