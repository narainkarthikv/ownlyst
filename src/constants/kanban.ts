/**
 * Kanban board column definitions
 * Used in KanbanView component
 */

import {
  STATUS_LABELS,
  STATUS_DESCRIPTIONS,
  type NoteStatus,
} from './statuses';

export interface KanbanColumn {
  id: NoteStatus;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const KANBAN_COLUMNS: KanbanColumn[] = [
  {
    id: 'todo',
    title: STATUS_LABELS.todo,
    description: STATUS_DESCRIPTIONS.todo,
    icon: '📋',
    color:
      'bg-indigo-50/80 dark:bg-indigo-900/40 border-indigo-200 dark:border-indigo-600/50 text-black dark:text-white shadow-sm',
  },
  {
    id: 'in-progress',
    title: STATUS_LABELS['in-progress'],
    description: STATUS_DESCRIPTIONS['in-progress'],
    icon: '⚡',
    color:
      'bg-blue-50/80 dark:bg-blue-900/40 border-blue-200 dark:border-blue-600/50 text-black dark:text-white shadow-sm',
  },
  {
    id: 'done',
    title: STATUS_LABELS.done,
    description: STATUS_DESCRIPTIONS.done,
    icon: '✅',
    color:
      'bg-cyan-50/80 dark:bg-cyan-900/40 border-cyan-200 dark:border-cyan-600/50 text-black dark:text-white shadow-sm',
  },
];
