/**
 * ColorBadge Component
 * Displays note color with visual styling
 */

import { DISPLAY_COLOR_CLASSES, type NoteColor } from '../../constants/colors';

interface ColorBadgeProps {
  color: NoteColor;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-6 w-6',
};

export default function ColorBadge({
  color,
  size = 'md',
}: ColorBadgeProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-2 ${DISPLAY_COLOR_CLASSES[color]}`}
      aria-label={`Color: ${color}`}
    />
  );
}
