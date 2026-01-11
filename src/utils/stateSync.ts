/**
 * State Synchronization Utilities
 * 
 * Provides helper functions for:
 * - Detecting state changes across views
 * - Batching updates for performance
 * - Validating state consistency
 * - Optimizing re-renders
 */

import { Note } from '../types/Note';

/**
 * Compare two notes arrays for differences
 * Used to detect if state has changed across views
 */
export function hasNotesChanged(prev: Note[], current: Note[]): boolean {
  if (prev.length !== current.length) return true;

  return prev.some((prevNote, index) => {
    const currNote = current[index];
    return (
      prevNote.id !== currNote.id ||
      prevNote.title !== currNote.title ||
      prevNote.content !== currNote.content ||
      prevNote.status !== currNote.status ||
      prevNote.priority !== currNote.priority ||
      prevNote.color !== currNote.color ||
      prevNote.isPinned !== currNote.isPinned ||
      (prevNote.dueDate?.getTime() || 0) !==
        (currNote.dueDate?.getTime() || 0)
    );
  });
}

/**
 * Deep clone a note with proper Date handling
 * Prevents accidental mutations of shared state
 */
export function cloneNote(note: Note): Note {
  return {
    ...note,
    createdAt: new Date(note.createdAt),
    dueDate: note.dueDate ? new Date(note.dueDate) : undefined,
    tags: note.tags ? [...note.tags] : undefined,
  };
}

/**
 * Validate note data structure
 * Ensures all required fields are present and have correct types
 */
export function isValidNote(note: unknown): note is Note {
  if (typeof note !== 'object' || note === null) return false;

  const n = note as Record<string, unknown>;

  return (
    typeof n.id === 'string' &&
    typeof n.title === 'string' &&
    typeof n.content === 'string' &&
    typeof n.color === 'string' &&
    typeof n.priority === 'string' &&
    typeof n.status === 'string' &&
    typeof n.isPinned === 'boolean' &&
    (n.createdAt instanceof Date || typeof n.createdAt === 'string') &&
    (!n.dueDate ||
      n.dueDate instanceof Date ||
      typeof n.dueDate === 'string') &&
    (!n.tags || Array.isArray(n.tags))
  );
}

/**
 * Validate an entire notes array
 * Used to ensure data consistency across state updates
 */
export function validateNotesArray(notes: unknown[]): boolean {
  if (!Array.isArray(notes)) return false;
  return notes.every(isValidNote);
}

/**
 * Compare two notes by status
 * Returns status changes if any
 */
export function getStatusChangeIfAny(
  prev: Note,
  current: Note
): Note['status'] | null {
  return prev.status !== current.status ? current.status : null;
}

/**
 * Get all notes that have changed between two arrays
 * Returns array of changed note IDs
 */
export function getChangedNoteIds(prev: Note[], current: Note[]): string[] {
  const prevMap = new Map(prev.map((n) => [n.id, n]));
  const changed: string[] = [];

  current.forEach((currNote) => {
    const prevNote = prevMap.get(currNote.id);
    if (!prevNote) {
      changed.push(currNote.id); // New note
    } else if (
      prevNote.status !== currNote.status ||
      prevNote.priority !== currNote.priority ||
      prevNote.title !== currNote.title ||
      prevNote.content !== currNote.content ||
      prevNote.color !== currNote.color ||
      prevNote.isPinned !== currNote.isPinned ||
      (prevNote.dueDate?.getTime() || 0) !==
        (currNote.dueDate?.getTime() || 0)
    ) {
      changed.push(currNote.id); // Modified note
    }
  });

  // Check for deleted notes
  prev.forEach((prevNote) => {
    if (!current.find((n) => n.id === prevNote.id)) {
      changed.push(prevNote.id); // Deleted note
    }
  });

  return changed;
}

/**
 * Merge notes from two sources, avoiding duplicates
 * Useful for synchronizing state from multiple sources
 */
export function mergeNotes(
  primaryNotes: Note[],
  secondaryNotes: Note[]
): Note[] {
  const primaryMap = new Map(primaryNotes.map((n) => [n.id, n]));

  // Add secondary notes that don't exist in primary
  secondaryNotes.forEach((note) => {
    if (!primaryMap.has(note.id)) {
      primaryMap.set(note.id, note);
    }
  });

  return Array.from(primaryMap.values());
}

/**
 * Get notes grouped by status
 * Useful for rendering status-based views
 */
export function groupNotesByStatus(notes: Note[]): Record<Note['status'], Note[]> {
  return {
    todo: notes.filter((n) => n.status === 'todo'),
    'in-progress': notes.filter((n) => n.status === 'in-progress'),
    done: notes.filter((n) => n.status === 'done'),
  };
}

/**
 * Get notes grouped by priority
 * Useful for filtering and display
 */
export function groupNotesByPriority(notes: Note[]): Record<Note['priority'], Note[]> {
  return {
    low: notes.filter((n) => n.priority === 'low'),
    medium: notes.filter((n) => n.priority === 'medium'),
    high: notes.filter((n) => n.priority === 'high'),
  };
}

/**
 * Sort notes by multiple criteria
 * Supports sorting by: createdAt, dueDate, priority, title, status
 */
export function sortNotes(
  notes: Note[],
  sortBy: 'createdAt' | 'dueDate' | 'priority' | 'title' | 'status' | 'isPinned',
  direction: 'asc' | 'desc' = 'desc'
): Note[] {
  const sorted = [...notes];

  sorted.sort((a, b) => {
    let comparison = 0;

    // Handle pinned items first
    if (sortBy !== 'isPinned') {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
    }

    switch (sortBy) {
      case 'createdAt':
        comparison =
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime();
        break;
      case 'dueDate': {
        const aDue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const bDue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        comparison = aDue - bDue;
        break;
      }
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        comparison =
          priorityOrder[b.priority] - priorityOrder[a.priority];
        break;
      }
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'status': {
        const statusOrder = { 'in-progress': 3, todo: 2, done: 1 };
        comparison =
          statusOrder[b.status] - statusOrder[a.status];
        break;
      }
      case 'isPinned':
        comparison = a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1;
        break;
    }

    return direction === 'asc' ? -comparison : comparison;
  });

  return sorted;
}

/**
 * Detect if a note needs attention (high priority or overdue)
 */
export function isNoteUrgent(note: Note): boolean {
  const isHighPriority = note.priority === 'high';
  const isOverdue =
    note.dueDate && new Date(note.dueDate) < new Date();

  return (isHighPriority || (isOverdue ?? false)) && !note.isPinned;
}

/**
 * Batch multiple note updates into a single operation
 * Useful for reducing number of state updates
 */
export function batchUpdateNotes(
  notes: Note[],
  updates: Array<{ id: string; changes: Partial<Note> }>
): Note[] {
  const updateMap = new Map(updates.map((u) => [u.id, u.changes]));

  return notes.map((note) => {
    const changes = updateMap.get(note.id);
    return changes ? { ...note, ...changes } : note;
  });
}
