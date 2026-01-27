/**
 * Note Model - Core data structure and type definitions
 * 
 * This file defines the Note interface and all related type definitions.
 * Framework-agnostic and contains no React dependencies.
 * Serves as the single source of truth for the Note data structure across the application.
 */

/**
 * Priority levels for task importance
 * Used for sorting and filtering notes by urgency
 * Also determines the visual color coding (low=blue, medium=amber, high=red)
 */
export type NotePriority = 'low' | 'medium' | 'high';

/**
 * Status workflow states for notes
 * Represents the progress of a note through its lifecycle
 */
export type NoteStatus = 'todo' | 'in-progress' | 'done';

/**
 * Core Note model interface
 * Represents a single note in the application
 * 
 * @property id - Unique identifier (generated from timestamp)
 * @property title - Brief heading for the note
 * @property content - Full text content of the note
 * @property priority - Urgency level of the note (determines visual color)
 * @property status - Current workflow state
 * @property isPinned - Whether the note is pinned to top
 * @property createdAt - Creation timestamp (immutable)
 * @property dueDate - Optional deadline for the note
 * @property tags - Optional categorization tags
 */
export interface Note {
  id: string;
  title: string;
  content: string;
  priority: NotePriority;
  status: NoteStatus;
  isPinned: boolean;
  createdAt: Date;
  dueDate?: Date;
  tags?: string[];
}

/**
 * Form data shape for creating/updating notes
 * Excludes auto-generated fields
 */
export type NoteFormData = Omit<Note, 'id' | 'createdAt'>;

/**
 * Partial updates for notes
 * Used when updating individual note properties
 */
export type NoteUpdate = Partial<Omit<Note, 'id' | 'createdAt'>>;
