/**
 * Centralized status definitions and configurations
 */

export const STATUS_VALUES = ['todo', 'in-progress', 'done'] as const;

export type NoteStatus = (typeof STATUS_VALUES)[number];

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
