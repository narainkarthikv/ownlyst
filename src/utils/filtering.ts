/**
 * Filtering utilities for notes
 * Handles various filtering strategies used across views
 */

import { Note } from '../types/Note';
import { type NoteStatus } from '../constants/statuses';
import { type NotePriority } from '../constants/priorities';

/**
 * Filter notes by status
 */
export function filterByStatus(
  notes: Note[],
  status: NoteStatus | 'all'
): Note[] {
  if (status === 'all') return notes;
  return notes.filter((note) => note.status === status);
}

/**
 * Filter notes by priority
 */
export function filterByPriority(
  notes: Note[],
  priority: NotePriority | 'all'
): Note[] {
  if (priority === 'all') return notes;
  return notes.filter((note) => note.priority === priority);
}

/**
 * Filter notes by search term (title and content)
 */
export function filterBySearch(notes: Note[], searchTerm: string): Note[] {
  if (!searchTerm.trim()) return notes;

  const term = searchTerm.toLowerCase();
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term)
  );
}

/**
 * Separate pinned notes from unpinned notes
 * Returns [pinned, unpinned]
 */
export function separatePinnedNotes(
  notes: Note[]
): [Note[], Note[]] {
  const pinned = notes.filter((note) => note.isPinned);
  const unpinned = notes.filter((note) => !note.isPinned);
  return [pinned, unpinned];
}

/**
 * Get only pinned notes
 */
export function getPinnedNotes(notes: Note[]): Note[] {
  return notes.filter((note) => note.isPinned);
}

/**
 * Get only unpinned notes
 */
export function getUnpinnedNotes(notes: Note[]): Note[] {
  return notes.filter((note) => !note.isPinned);
}

/**
 * Apply multiple filters at once
 */
export function applyFilters(
  notes: Note[],
  {
    status,
    priority,
    searchTerm,
  }: {
    status?: NoteStatus | 'all';
    priority?: NotePriority | 'all';
    searchTerm?: string;
  }
): Note[] {
  let filtered = notes;

  if (status) {
    filtered = filterByStatus(filtered, status);
  }

  if (priority) {
    filtered = filterByPriority(filtered, priority);
  }

  if (searchTerm) {
    filtered = filterBySearch(filtered, searchTerm);
  }

  return filtered;
}
