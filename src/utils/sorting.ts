/**
 * Sorting utilities for notes
 * Handles various sorting strategies used across views
 */

import { Note } from '../types/Note';
import { PRIORITY_ORDER } from '../constants/priorities';

export type SortField = 'title' | 'status' | 'priority' | 'createdAt' | 'dueDate';
export type SortDirection = 'asc' | 'desc';

/**
 * Sort notes by a specific field and direction
 */
export function sortNotes(
  notes: Note[],
  field: SortField,
  direction: SortDirection = 'desc'
): Note[] {
  const sorted = [...notes].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (field) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'priority':
        aValue = PRIORITY_ORDER[a.priority];
        bValue = PRIORITY_ORDER[b.priority];
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      case 'dueDate':
        aValue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        bValue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        break;
      default:
        return 0;
    }

    if (direction === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  return sorted;
}

/**
 * Sort notes by priority (high to low)
 */
export function sortByPriority(notes: Note[]): Note[] {
  return sortNotes(notes, 'priority', 'desc');
}

/**
 * Sort notes by creation date (newest first)
 */
export function sortByDate(notes: Note[]): Note[] {
  return sortNotes(notes, 'createdAt', 'desc');
}

/**
 * Sort notes by pinned status first, then by creation date
 */
export function sortByPinnedAndDate(notes: Note[]): Note[] {
  return [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/**
 * Toggle sort direction
 */
export function toggleSortDirection(
  direction: SortDirection
): SortDirection {
  return direction === 'asc' ? 'desc' : 'asc';
}
