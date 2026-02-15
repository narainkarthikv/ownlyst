/**
 * Note Model Validation Utilities
 *
 * Pure validation functions for notes
 * Framework-agnostic and side-effect free
 */

import type { Note } from './note.model';
import { NOTE_COLORS, NOTE_PRIORITIES, NOTE_STATUSES } from './enums';

/**
 * Validation error result
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validation result wrapper
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validates a complete note object
 * Used for data integrity checks
 *
 * @param note - Note object to validate
 * @returns ValidationResult with any errors found
 */
export function validateNote(note: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (!note || typeof note !== 'object') {
    return {
      isValid: false,
      errors: [{ field: 'root', message: 'Note must be an object' }],
    };
  }

  const n = note as Record<string, unknown>;

  // Validate id
  if (typeof n.id !== 'string' || n.id.trim().length === 0) {
    errors.push({ field: 'id', message: 'ID must be a non-empty string' });
  }

  // Validate title
  if (typeof n.title !== 'string' || n.title.trim().length === 0) {
    errors.push({
      field: 'title',
      message: 'Title must be a non-empty string',
    });
  } else if (n.title.length > 200) {
    errors.push({
      field: 'title',
      message: 'Title must be less than 200 characters',
    });
  }

  // Validate content
  if (typeof n.content !== 'string') {
    errors.push({ field: 'content', message: 'Content must be a string' });
  }

  // Validate color
  if (!NOTE_COLORS.includes(n.color as never)) {
    errors.push({
      field: 'color',
      message: `Color must be one of: ${NOTE_COLORS.join(', ')}`,
    });
  }

  // Validate priority
  if (!NOTE_PRIORITIES.includes(n.priority as never)) {
    errors.push({
      field: 'priority',
      message: `Priority must be one of: ${NOTE_PRIORITIES.join(', ')}`,
    });
  }

  // Validate status
  if (!NOTE_STATUSES.includes(n.status as never)) {
    errors.push({
      field: 'status',
      message: `Status must be one of: ${NOTE_STATUSES.join(', ')}`,
    });
  }

  // Validate isPinned
  if (typeof n.isPinned !== 'boolean') {
    errors.push({ field: 'isPinned', message: 'isPinned must be a boolean' });
  }

  // Validate createdAt
  if (!(n.createdAt instanceof Date) && typeof n.createdAt !== 'string') {
    errors.push({ field: 'createdAt', message: 'createdAt must be a Date' });
  }

  // Validate dueDate (optional)
  if (
    n.dueDate !== undefined &&
    !(n.dueDate instanceof Date) &&
    typeof n.dueDate !== 'string'
  ) {
    errors.push({
      field: 'dueDate',
      message: 'dueDate must be a Date or undefined',
    });
  }

  // Validate tags (optional)
  if (
    n.tags !== undefined &&
    (!Array.isArray(n.tags) || !n.tags.every((tag) => typeof tag === 'string'))
  ) {
    errors.push({
      field: 'tags',
      message: 'tags must be an array of strings or undefined',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates note form data before creating a note
 * Used to validate user input
 *
 * @param data - Partial note data from form
 * @returns ValidationResult with any errors found
 */
export function validateNoteFormData(data: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: [{ field: 'root', message: 'Note data must be an object' }],
    };
  }

  const d = data as Record<string, unknown>;

  // Validate title
  if (typeof d.title !== 'string' || d.title.trim().length === 0) {
    errors.push({
      field: 'title',
      message: 'Title is required and must be non-empty',
    });
  } else if (d.title.length > 200) {
    errors.push({
      field: 'title',
      message: 'Title must be less than 200 characters',
    });
  }

  // Content can be empty, but must be a string
  if (typeof d.content !== 'string') {
    errors.push({ field: 'content', message: 'Content must be a string' });
  }

  // Validate color if present
  if (d.color && !NOTE_COLORS.includes(d.color as never)) {
    errors.push({
      field: 'color',
      message: `Color must be one of: ${NOTE_COLORS.join(', ')}`,
    });
  }

  // Validate priority if present
  if (d.priority && !NOTE_PRIORITIES.includes(d.priority as never)) {
    errors.push({
      field: 'priority',
      message: `Priority must be one of: ${NOTE_PRIORITIES.join(', ')}`,
    });
  }

  // Validate status if present
  if (d.status && !NOTE_STATUSES.includes(d.status as never)) {
    errors.push({
      field: 'status',
      message: `Status must be one of: ${NOTE_STATUSES.join(', ')}`,
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Ensures date fields are Date objects (not strings)
 * Useful for normalizing data from storage or API
 *
 * @param note - Note with potentially string dates
 * @returns Note with Date objects
 */
export function normalizeDateFields(note: Record<string, unknown>): Note {
  return {
    ...note,
    createdAt:
      typeof note.createdAt === 'string'
        ? new Date(note.createdAt)
        : note.createdAt,
    dueDate: note.dueDate
      ? typeof note.dueDate === 'string'
        ? new Date(note.dueDate)
        : note.dueDate
      : undefined,
  } as Note;
}

/**
 * Converts note for storage (dates to ISO strings)
 * Useful for localStorage or API serialization
 *
 * @param note - Note to serialize
 * @returns Note-like object with serializable fields
 */
export function serializeNote(note: Note): Record<string, unknown> {
  return {
    ...note,
    createdAt: note.createdAt.toISOString(),
    dueDate: note.dueDate?.toISOString(),
  };
}
