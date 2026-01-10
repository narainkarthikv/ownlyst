/**
 * PriorityBadge Component
 * Displays note priority with visual styling
 */

import { PRIORITY_BADGE_COLORS, type NotePriority } from '../../constants/colors';
import { PRIORITY_LABELS } from '../../constants/priorities';

interface PriorityBadgeProps {
  priority: NotePriority;
  size?: 'sm' | 'md';
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

export default function PriorityBadge({
  priority,
  size = 'md',
}: PriorityBadgeProps) {
  return (
    <span
      className={`inline-block font-medium ${PRIORITY_BADGE_COLORS[priority]} ${sizeClasses[size]}`}>
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
