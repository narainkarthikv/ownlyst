/**
 * Centralized priority definitions and configurations
 */

import type { NotePriority } from '../models/note.model';

export const PRIORITY_VALUES = ['low', 'medium', 'high'] as const satisfies readonly NotePriority[];
export type { NotePriority };

export const PRIORITY_LABELS: Record<NotePriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const PRIORITY_DESCRIPTIONS: Record<NotePriority, string> = {
  low: 'Nice to have, can be deferred',
  medium: 'Important, should be done soon',
  high: 'Critical, needs immediate attention',
};

/**
 * Priority sort order (for ranking)
 */
export const PRIORITY_ORDER: Record<NotePriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};
