/**
 * Notes Context Provider - Application-level state provider
 *
 * This provider wraps the application and exposes the notes controller
 * through React Context, making it available to any component in the app.
 *
 * Uses the useNotesController hook internally and provides its API
 * to consuming components via the useNotesContext hook.
 */

/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from 'react';
import {
  useNotesController,
  type NotesControllerAPI,
} from './useNotesController';

/**
 * Context for notes API
 * Provides typed access to notes state and operations
 */
const NotesContext = createContext<NotesControllerAPI | undefined>(undefined);

/**
 * NotesProvider - Wraps the application to provide notes state and operations
 *
 * Should be placed high in the component tree to ensure all views have access.
 *
 * Example usage:
 * ```tsx
 * <NotesProvider>
 *   <App />
 * </NotesProvider>
 * ```
 */
export function NotesProvider({ children }: { children: React.ReactNode }) {
  const notesController = useNotesController();

  return (
    <NotesContext.Provider value={notesController}>
      {children}
    </NotesContext.Provider>
  );
}

/**
 * useNotesContext - Hook to access the notes API
 *
 * Must be used within a NotesProvider component.
 * Provides full access to notes state and all operations.
 *
 * Example usage:
 * ```tsx
 * const { notes, createNote, updateNote, deleteNote } = useNotesContext();
 * ```
 *
 * @returns NotesControllerAPI with state and operations
 * @throws Error if used outside NotesProvider
 */
export function useNotesContext(): NotesControllerAPI {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error(
      'useNotesContext must be used within a NotesProvider. ' +
        'Make sure your component is wrapped with <NotesProvider> at the top level.'
    );
  }
  return context;
}
