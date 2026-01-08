/**
 * Centralized priority definitions and configurations
 */

export const PRIORITY_VALUES = ['low', 'medium', 'high'] as const;

export type NotePriority = (typeof PRIORITY_VALUES)[number];

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
