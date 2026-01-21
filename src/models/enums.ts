/**
 * Enums and Constants for Note Model
 * 
 * Centralized definitions for all enumerable values used across the application.
 * Prevents duplication and ensures consistency.
 */

import type { NoteColor, NotePriority, NoteStatus } from './note.model';

/**
 * All available note colors
 * Used for validation and iteration
 */
export const NOTE_COLORS: ReadonlyArray<NoteColor> = [
  'indigo',
  'emerald',
  'sky',
  'rose',
  'violet',
  'amber',
  'slate',
  'cyan',
  'lime',
  'orange',
  'teal',
];

/**
 * Human-readable labels for note colors
 */
export const COLOR_LABELS: Record<NoteColor, string> = {
  indigo: 'Indigo',
  emerald: 'Emerald',
  sky: 'Sky',
  rose: 'Rose',
  violet: 'Violet',
  amber: 'Amber',
  slate: 'Slate',
  cyan: 'Cyan',
  lime: 'Lime',
  orange: 'Orange',
  teal: 'Teal',
};

/**
 * All available priority levels
 * Used for validation and ordering
 */
export const NOTE_PRIORITIES: ReadonlyArray<NotePriority> = [
  'low',
  'medium',
  'high',
];

/**
 * Human-readable labels for priorities
 */
export const PRIORITY_LABELS: Record<NotePriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

/**
 * Priority order for sorting (ascending)
 * Used to sort notes by importance
 */
export const PRIORITY_ORDER: Record<NotePriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

/**
 * Descriptions for each priority level
 * Used in UI for user guidance
 */
export const PRIORITY_DESCRIPTIONS: Record<NotePriority, string> = {
  low: 'Nice to have, can be deferred',
  medium: 'Important, should be done soon',
  high: 'Critical, needs immediate attention',
};

/**
 * All available workflow statuses
 * Used for validation and filtering
 */
export const NOTE_STATUSES: ReadonlyArray<NoteStatus> = [
  'todo',
  'in-progress',
  'done',
];

/**
 * Human-readable labels for status values
 */
export const STATUS_LABELS: Record<NoteStatus, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

/**
 * Order of statuses for Kanban board display
 */
export const STATUS_ORDER: Record<NoteStatus, number> = {
  'todo': 1,
  'in-progress': 2,
  'done': 3,
};
