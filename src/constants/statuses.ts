/**
 * Centralized status definitions and configurations
 */

import type { NoteStatus } from '../models/note.model';

export const STATUS_VALUES = ['todo', 'in-progress', 'done'] as const satisfies readonly NoteStatus[];
export type { NoteStatus };

export const STATUS_LABELS: Record<NoteStatus, string> = {
  todo: 'To-Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

export const STATUS_DESCRIPTIONS: Record<NoteStatus, string> = {
  todo: 'Task not yet started',
  'in-progress': 'Currently working on this',
  done: 'Task completed',
};
