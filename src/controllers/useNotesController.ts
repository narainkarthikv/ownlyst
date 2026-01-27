/**
 * Notes Controller Hook - State orchestration for notes
 * 
 * Custom hook that manages all note-related state and operations.
 * Bridges the gap between UI (views) and business logic (services).
 * 
 * This hook:
 * - Manages notes state with useReducer for predictability
 * - Handles CRUD operations
 * - Provides filtering and sorting capabilities
 * - Manages persistence via StorageService
 * - Exposes a clean, simple API to views
 */

import { useReducer, useCallback, useEffect, useRef } from 'react';
import type { Note, NoteFormData, NoteUpdate } from '../models/note.model';
import { notesService } from '../services/notes.service';
import { storageService } from '../services/storage.service';
import sampleNotesData from '../data/sampleNotes.json';

/**
 * State shape managed by the controller
 */
interface NotesState {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  hasInitialized: boolean;
}

/**
 * Action types for state reducer
 * Explicit action types make state changes predictable and debuggable
 */
type NotesAction =
  | { type: 'INITIALIZE'; payload: Note[] }
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'UPDATE_NOTE'; payload: { id: string; updates: NoteUpdate } }
  | { type: 'DELETE_NOTE'; payload: string }
  | { type: 'IMPORT_NOTES'; payload: Note[] }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

/**
 * Initial state for the reducer
 */
const initialState: NotesState = {
  notes: [],
  isLoading: true,
  error: null,
  hasInitialized: false,
};

/**
 * Reducer function for managing notes state
 * Pure function that determines new state based on actions
 * 
 * @param state - Current state
 * @param action - Action to process
 * @returns New state
 */
function notesReducer(state: NotesState, action: NotesAction): NotesState {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        notes: action.payload,
        isLoading: false,
        hasInitialized: true,
        error: null,
      };

    case 'ADD_NOTE':
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };

    case 'UPDATE_NOTE': {
      const note = state.notes.find(n => n.id === action.payload.id);
      if (!note) return state;

      return {
        ...state,
        notes: state.notes.map(n =>
          n.id === action.payload.id
            ? notesService.updateNote(n, action.payload.updates)
            : n
        ),
      };
    }

    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(n => n.id !== action.payload),
      };

    case 'IMPORT_NOTES': {
      // Create a Set of existing note IDs for efficient lookup
      const existingIds = new Set(state.notes.map(n => n.id));
      
      // Filter out notes with IDs that already exist
      const newNotes = action.payload.filter(note => !existingIds.has(note.id));
      
      // Merge new notes with existing ones
      return {
        ...state,
        notes: [...newNotes, ...state.notes],
      };
    }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

/**
 * useNotesController - Main hook for managing notes
 * 
 * Provides all note operations and state to consuming components.
 * Handles initialization, persistence, and error handling.
 * 
 * @returns Object with notes state and action methods
 */
export function useNotesController() {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const hasInitializedRef = useRef(false);

  /**
   * Initialize notes from storage or sample data
   * Runs once on mount
   */
  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    try {
      // Try to load from storage (storage service now handles deduplication)
      let notes = storageService.readNotes();

      // If no notes exist, load sample data
      if (notes.length === 0) {
        notes = sampleNotesData.notes.map((note: Record<string, unknown>) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          dueDate: note.dueDate ? new Date(note.dueDate) : undefined,
        }));
        // Immediately save sample notes to storage
        storageService.writeNotes(notes);
        storageService.flush();
      }

      dispatch({ type: 'INITIALIZE', payload: notes });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load notes';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      dispatch({ type: 'INITIALIZE', payload: [] });
    }
  }, []);

  /**
   * Persist notes to storage whenever they change
   */
  useEffect(() => {
    if (!state.hasInitialized) return;
    storageService.writeNotes(state.notes);
  }, [state.notes, state.hasInitialized]);

  /**
   * Create a new note
   * 
   * @param data - Note form data
   */
  const createNote = useCallback((data: NoteFormData) => {
    try {
      const note = notesService.createNote(data);
      dispatch({ type: 'ADD_NOTE', payload: note });
      dispatch({ type: 'CLEAR_ERROR' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create note';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, []);

  /**
   * Update a note
   * 
   * @param id - Note ID to update
   * @param updates - Fields to update
   */
  const updateNote = useCallback((id: string, updates: NoteUpdate) => {
    try {
      dispatch({ type: 'UPDATE_NOTE', payload: { id, updates } });
      dispatch({ type: 'CLEAR_ERROR' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update note';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, []);

  /**
   * Delete a note
   * 
   * @param id - Note ID to delete
   */
  const deleteNote = useCallback((id: string) => {
    try {
      dispatch({ type: 'DELETE_NOTE', payload: id });
      dispatch({ type: 'CLEAR_ERROR' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete note';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, []);

  /**
   * Import multiple notes (bulk operation)
   * 
   * @param notes - Array of notes to import
   */
  const importNotes = useCallback((notes: Note[]) => {
    try {
      if (notes.length === 0) {
        dispatch({ type: 'SET_ERROR', payload: 'No notes to import' });
        return;
      }
      dispatch({ type: 'IMPORT_NOTES', payload: notes });
      dispatch({ type: 'CLEAR_ERROR' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to import notes';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  }, []);

  /**
   * Get a note by ID
   * 
   * @param id - Note ID to find
   * @returns Note or undefined
   */
  const getNote = useCallback((id: string): Note | undefined => {
    return notesService.findNoteById(id, state.notes);
  }, [state.notes]);

  /**
   * Get notes filtered by search term
   * 
   * @param searchTerm - Term to search for
   * @returns Filtered notes
   */
  const searchNotes = useCallback((searchTerm: string): Note[] => {
    return notesService.filterBySearchTerm(state.notes, searchTerm);
  }, [state.notes]);

  /**
   * Get notes filtered by status
   * 
   * @param status - Status to filter by
   * @returns Notes with matching status
   */
  const getNotesByStatus = useCallback(
    (status: Note['status']): Note[] => {
      return notesService.filterByStatus(state.notes, status);
    },
    [state.notes]
  );

  /**
   * Get notes filtered by priority
   * 
   * @param priority - Priority to filter by
   * @returns Notes with matching priority
   */
  const getNotesByPriority = useCallback(
    (priority: Note['priority']): Note[] => {
      return notesService.filterByPriority(state.notes, priority);
    },
    [state.notes]
  );

  /**
   * Get all notes grouped by status
   * Useful for Kanban view
   * 
   * @returns Grouped notes
   */
  const getNotesByStatusGrouped = useCallback((): Record<Note['status'], Note[]> => {
    return notesService.groupByStatus(state.notes);
  }, [state.notes]);

  /**
   * Get sorted notes (by pinned status and creation date)
   * 
   * @returns Sorted notes
   */
  const getSortedNotes = useCallback((): Note[] => {
    return notesService.sortByPinnedAndDate(state.notes);
  }, [state.notes]);

  /**
   * Get notes sorted by priority
   * 
   * @returns Notes sorted by priority
   */
  const getNotesSortedByPriority = useCallback((): Note[] => {
    return notesService.sortByPriority(state.notes);
  }, [state.notes]);

  /**
   * Get collection statistics
   * 
   * @returns Statistics object
   */
  const getStatistics = useCallback(() => {
    return notesService.getStatistics(state.notes);
  }, [state.notes]);

  return {
    // State
    notes: state.notes,
    isLoading: state.isLoading,
    error: state.error,

    // CRUD operations
    createNote,
    updateNote,
    deleteNote,
    importNotes,
    getNote,

    // Filtering
    searchNotes,
    getNotesByStatus,
    getNotesByPriority,

    // Grouping and sorting
    getNotesByStatusGrouped,
    getSortedNotes,
    getNotesSortedByPriority,

    // Utilities
    getStatistics,
  };
}

/**
 * Type helper for consuming the controller
 * Useful for typing components that use useNotesController
 */
export type NotesControllerAPI = ReturnType<typeof useNotesController>;
