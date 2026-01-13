/**
 * StatusBadge Component
 * Displays note status with visual styling
 */

import { STATUS_BADGE_COLORS, type NoteStatus } from '../../constants/colors';
import { STATUS_LABELS } from '../../constants/statuses';

interface StatusBadgeProps {
  status: NoteStatus;
  size?: 'sm' | 'md';
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

export default function StatusBadge({
  status,
  size = 'md',
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full font-medium border ${STATUS_BADGE_COLORS[status]} ${sizeClasses[size]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
