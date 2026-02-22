/**
 * Note Filtering and Sorting Utilities
 *
 * Pure functions for filtering and sorting notes based on various criteria
 */

import type { Note } from '../models/note.model';
import type { FilterState, SortOption } from '../components/shared/FilterBar';

/**
 * Apply search filter to notes
 */
export function searchNotes(notes: Note[], searchTerm: string): Note[] {
  if (!searchTerm.trim()) return notes;

  const term = searchTerm.toLowerCase();
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term) ||
      note.tags?.some((tag) => tag.toLowerCase().includes(term))
  );
}

/**
 * Apply status filter to notes
 */
export function filterByStatus(notes: Note[], status: string): Note[] {
  if (status === 'all') return notes;
  return notes.filter((note) => note.status === status);
}

/**
 * Apply priority filter to notes
 */
export function filterByPriority(notes: Note[], priority: string): Note[] {
  if (priority === 'all') return notes;
  return notes.filter((note) => note.priority === priority);
}

/**
 * Filter pinned notes only
 */
export function filterPinnedOnly(
  notes: Note[],
  showPinnedOnly: boolean
): Note[] {
  if (!showPinnedOnly) return notes;
  return notes.filter((note) => note.isPinned);
}

/**
 * Sort notes by various criteria
 */
export function sortNotes(notes: Note[], sortOption: SortOption): Note[] {
  const sorted = [...notes];

  switch (sortOption) {
    case 'date-desc':
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    case 'date-asc':
      return sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    case 'priority-high':
      {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return sorted.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
      }

    case 'priority-low':
      {
        const priorityOrderReverse = { low: 0, medium: 1, high: 2 };
        return sorted.sort(
          (a, b) =>
            priorityOrderReverse[a.priority] - priorityOrderReverse[b.priority]
        );
      }

    case 'status':
      {
        const statusOrder = { todo: 0, 'in-progress': 1, done: 2 };
        return sorted.sort(
          (a, b) => statusOrder[a.status] - statusOrder[b.status]
        );
      }

    default:
      return sorted;
  }
}

/**
 * Apply all filters and sorting to notes
 */
export function applyFilters(notes: Note[], filters: FilterState): Note[] {
  let filtered = notes;

  // Apply search
  filtered = searchNotes(filtered, filters.search);

  // Apply status filter
  filtered = filterByStatus(filtered, filters.status);

  // Apply priority filter
  filtered = filterByPriority(filtered, filters.priority);

  // Apply pinned filter
  filtered = filterPinnedOnly(filtered, filters.showPinnedOnly);

  // Apply sorting
  filtered = sortNotes(filtered, filters.sort);

  return filtered;
}

/**
 * Get default filter state
 */
export function getDefaultFilters(): FilterState {
  return {
    search: '',
    sort: 'date-desc',
    status: 'all',
    priority: 'all',
    showPinnedOnly: false,
  };
}
