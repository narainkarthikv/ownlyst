/**
 * NotesContext - Centralized state management for notes across all views
 * 
 * This context provides:
 * - Global notes state accessible from any component
 * - Consistent data representation across all views
 * - Automatic synchronization between views
 * - Optimized re-renders using React Context
 */

import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { Note } from '../types/Note';
import { useLocalStorage } from '../hooks/useLocalStorage';
import sampleNotesData from '../data/sampleNotes.json';

// State shape for the context
interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  updateNoteStatus: (id: string, status: Note['status']) => void;
  getNotesByStatus: (status: Note['status']) => Note[];
  getNoteById: (id: string) => Note | undefined;
  notesLoaded: boolean;
}

// Create the context with undefined default (will be provided)
const NotesContext = createContext<NotesContextType | undefined>(undefined);

/**
 * NotesProvider - Wraps the application to provide centralized notes state
 * 
 * Features:
 * - Persists notes to localStorage
 * - Initializes with sample data on first load
 * - Provides synchronized update methods
 * - All components can subscribe to global note changes
 */
export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useLocalStorage<Note[]>('sticky-notes', []);
  const [notesLoaded, setNotesLoaded] = React.useState(false);

  // Initialize with sample data on first load
  useEffect(() => {
    if (notes.length > 0 || notesLoaded) return;

    // Load sample data and convert date strings to Date objects
    const sampleNotes: Note[] = sampleNotesData.notes.map((note) => ({
      ...note,
      color: note.color as Note['color'],
      status: note.status as Note['status'],
      priority: note.priority as Note['priority'],
      createdAt: new Date(note.createdAt),
      dueDate: note.dueDate ? new Date(note.dueDate) : undefined,
    }));

    setNotes(sampleNotes);
    setNotesLoaded(true);
  }, [notes.length, notesLoaded, setNotes]);

  // Mark notes as loaded after initialization
  useEffect(() => {
    if (!notesLoaded && notes.length > 0) {
      setNotesLoaded(true);
    }
  }, [notes.length, notesLoaded]);

  /**
   * Add a new note to the state
   * Automatically generates ID and createdAt timestamp
   */
  const addNote = useCallback(
    (noteData: Omit<Note, 'id' | 'createdAt'>) => {
      const newNote: Note = {
        ...noteData,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setNotes((prev) => [newNote, ...prev]);
    },
    [setNotes]
  );

  /**
   * Update a note's properties
   * Ensures immediate state update and proper data synchronization
   */
  const updateNote = useCallback(
    (id: string, updates: Partial<Note>) => {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? {
                ...note,
                ...updates,
                // Ensure ID and createdAt are never modified
                id: note.id,
                createdAt: note.createdAt,
              }
            : note
        )
      );
    },
    [setNotes]
  );

  /**
   * Update note status (called from Kanban board when items are moved)
   * This is the synchronization point between Kanban view and data model
   */
  const updateNoteStatus = useCallback(
    (id: string, status: Note['status']) => {
      updateNote(id, { status });
    },
    [updateNote]
  );

  /**
   * Delete a note from the state
   */
  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    },
    [setNotes]
  );

  /**
   * Get all notes with a specific status
   * Used to filter notes for Kanban columns
   */
  const getNotesByStatus = useCallback(
    (status: Note['status']): Note[] => {
      return notes.filter((note) => note.status === status);
    },
    [notes]
  );

  /**
   * Get a single note by ID
   * Useful for finding specific notes during operations
   */
  const getNoteById = useCallback(
    (id: string): Note | undefined => {
      return notes.find((note) => note.id === id);
    },
    [notes]
  );

  const value: NotesContextType = {
    notes,
    addNote,
    updateNote,
    deleteNote,
    updateNoteStatus,
    getNotesByStatus,
    getNoteById,
    notesLoaded,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

/**
 * useNotes - Hook to access the notes context
 * 
 * Usage:
 * const { notes, updateNote, updateNoteStatus } = useNotes();
 * 
 * @throws Error if used outside NotesProvider
 */
export function useNotes(): NotesContextType {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
