/**
 * Notes Service - Business logic layer for note operations
 *
 * Handles all note operations including CRUD, filtering, and sorting.
 * Provides a clean interface for controllers to use.
 * Framework-agnostic and reusable with any frontend framework or backend.
 */

import { v4 as uuidv4 } from 'uuid';
import type { Note, NoteFormData, NoteUpdate } from '../models/note.model';
import { validateNoteFormData } from '../models/validation';
import { PRIORITY_ORDER } from '../models/enums';

/**
 * NotesService - Business logic for note operations
 *
 * Responsibilities:
 * - CRUD operations for notes
 * - Filtering and searching
 * - Sorting by various criteria
 * - Data transformation and normalization
 */
export class NotesService {
  /**
   * Generates a unique ID for a new note
   * Uses UUID v4 to ensure uniqueness across devices and sessions
   *
   * @returns Unique ID string
   */
  private generateId(): string {
    return uuidv4();
  }

  /**
   * Creates a new note with auto-generated fields
   *
   * @param data - Note form data (without id and createdAt)
   * @returns Complete Note object
   * @throws Error if validation fails
   */
  createNote(data: NoteFormData): Note {
    const validation = validateNoteFormData(data);
    if (!validation.isValid) {
      const errorMessages = validation.errors
        .map((e) => `${e.field}: ${e.message}`)
        .join(', ');
      throw new Error(`[NotesService] Validation failed: ${errorMessages}`);
    }

    return {
      ...data,
      id: this.generateId(),
      createdAt: new Date(),
    };
  }

  /**
   * Updates a note with provided fields
   * Preserves immutable fields (id, createdAt)
   *
   * @param note - Original note to update
   * @param updates - Fields to update
   * @returns Updated note
   */
  updateNote(note: Note, updates: NoteUpdate): Note {
    return {
      ...note,
      ...updates,
      // Ensure immutable fields are never changed
      id: note.id,
      createdAt: note.createdAt,
    };
  }

  /**
   * Deletes a note by ID
   *
   * @param noteId - ID of note to delete
   * @param notes - Array of all notes
   * @returns New array without the deleted note
   */
  deleteNote(noteId: string, notes: Note[]): Note[] {
    return notes.filter((note) => note.id !== noteId);
  }

  /**
   * Finds a note by ID
   *
   * @param noteId - ID to search for
   * @param notes - Array to search in
   * @returns Found note or undefined
   */
  findNoteById(noteId: string, notes: Note[]): Note | undefined {
    return notes.find((note) => note.id === noteId);
  }

  /**
   * Filters notes by search term
   * Searches in title and content (case-insensitive)
   *
   * @param notes - Notes to filter
   * @param searchTerm - Term to search for
   * @returns Filtered notes
   */
  filterBySearchTerm(notes: Note[], searchTerm: string): Note[] {
    if (!searchTerm.trim()) {
      return notes;
    }

    const term = searchTerm.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(term) ||
        note.content.toLowerCase().includes(term)
    );
  }

  /**
   * Filters notes by status
   *
   * @param notes - Notes to filter
   * @param status - Status to filter by
   * @returns Notes with matching status
   */
  filterByStatus(notes: Note[], status: Note['status']): Note[] {
    return notes.filter((note) => note.status === status);
  }

  /**
   * Filters notes by priority
   *
   * @param notes - Notes to filter
   * @param priority - Priority to filter by
   * @returns Notes with matching priority
   */
  filterByPriority(notes: Note[], priority: Note['priority']): Note[] {
    return notes.filter((note) => note.priority === priority);
  }

  /**
   * Filters notes by color
   *
   * @param notes - Notes to filter
   * @param color - Color to filter by
   * @returns Notes with matching color
   */
  filterByColor(notes: Note[], color: Note['color']): Note[] {
    return notes.filter((note) => note.color === color);
  }

  /**
   * Sorts notes by multiple criteria
   * Primary: pinned status
   * Secondary: creation date (newest first)
   *
   * @param notes - Notes to sort
   * @returns Sorted notes
   */
  sortByPinnedAndDate(notes: Note[]): Note[] {
    return [...notes].sort((a, b) => {
      // Pinned notes come first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // Then sort by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  /**
   * Sorts notes by priority (highest first) and then by date
   *
   * @param notes - Notes to sort
   * @returns Sorted notes
   */
  sortByPriority(notes: Note[]): Note[] {
    return [...notes].sort((a, b) => {
      // First by priority (highest first)
      const priorityDiff =
        PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // Then by date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  /**
   * Sorts notes by due date (earliest first)
   * Notes without due date are sorted to the end
   *
   * @param notes - Notes to sort
   * @returns Sorted notes
   */
  sortByDueDate(notes: Note[]): Note[] {
    return [...notes].sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }

  /**
   * Groups notes by status
   * Useful for Kanban board display
   *
   * @param notes - Notes to group
   * @returns Object with status keys containing note arrays
   */
  groupByStatus(notes: Note[]): Record<Note['status'], Note[]> {
    return {
      todo: this.filterByStatus(notes, 'todo'),
      'in-progress': this.filterByStatus(notes, 'in-progress'),
      done: this.filterByStatus(notes, 'done'),
    };
  }

  /**
   * Groups notes by priority
   *
   * @param notes - Notes to group
   * @returns Object with priority keys containing note arrays
   */
  groupByPriority(notes: Note[]): Record<Note['priority'], Note[]> {
    return {
      low: this.filterByPriority(notes, 'low'),
      medium: this.filterByPriority(notes, 'medium'),
      high: this.filterByPriority(notes, 'high'),
    };
  }

  /**
   * Gets statistics about notes collection
   * Useful for UI display and analytics
   *
   * @param notes - Notes to analyze
   * @returns Statistics object
   */
  getStatistics(notes: Note[]) {
    return {
      total: notes.length,
      pinned: notes.filter((n) => n.isPinned).length,
      byStatus: {
        todo: this.filterByStatus(notes, 'todo').length,
        'in-progress': this.filterByStatus(notes, 'in-progress').length,
        done: this.filterByStatus(notes, 'done').length,
      },
      byPriority: {
        low: this.filterByPriority(notes, 'low').length,
        medium: this.filterByPriority(notes, 'medium').length,
        high: this.filterByPriority(notes, 'high').length,
      },
    };
  }
}

/**
 * Singleton instance of notes service
 * Shared across the application
 */
export const notesService = new NotesService();
