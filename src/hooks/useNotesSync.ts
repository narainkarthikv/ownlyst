/**
 * useNotesSync Hook
 *
 * Provides real-time synchronization monitoring and callbacks
 * when notes state changes across any view
 */

import { useEffect, useRef, useState } from 'react';
import { Note } from '../types/Note';
import { getChangedNoteIds } from '../utils/stateSync';
import { debugLog } from '../utils/logger';

interface UseSyncOptions {
  // Callback fired when any note is updated
  onNotesChange?: (notes: Note[], changedIds: string[]) => void;
  // Callback fired when a specific note status changes
  onStatusChange?: (noteId: string, newStatus: Note['status']) => void;
  // Enable debug logging
  debug?: boolean;
}

/**
 * Hook to monitor and react to notes state changes
 *
 * Usage:
 * ```tsx
 * useNotesSync(notes, {
 *   onNotesChange: (notes, changedIds) => {
 *     console.log('Notes changed:', changedIds);
 *   },
 *   onStatusChange: (id, status) => {
 *     console.log(`Note ${id} status is now ${status}`);
 *   }
 * });
 * ```
 */
export function useNotesSync(
  notes: Note[],
  options: UseSyncOptions = {}
): void {
  const prevNotesRef = useRef<Note[]>(notes);
  const { onNotesChange, onStatusChange, debug = false } = options;

  useEffect(() => {
    const changedIds = getChangedNoteIds(prevNotesRef.current, notes);

    if (changedIds.length > 0) {
      debugLog(debug, '[useNotesSync] Notes changed:', changedIds);

      // Fire onNotesChange callback
      if (onNotesChange) {
        onNotesChange(notes, changedIds);
      }

      // Fire onStatusChange callbacks for status changes
      if (onStatusChange) {
        changedIds.forEach((id) => {
          const prevNote = prevNotesRef.current.find((n) => n.id === id);
          const currentNote = notes.find((n) => n.id === id);

          if (
            prevNote &&
            currentNote &&
            prevNote.status !== currentNote.status
          ) {
            onStatusChange(id, currentNote.status);
          }
        });
      }
    }

    prevNotesRef.current = notes;
  }, [notes, onNotesChange, onStatusChange, debug]);
}

/**
 * Hook to sync a single note's changes and trigger side effects
 *
 * Usage:
 * ```tsx
 * useSingleNoteSync(noteId, {
 *   onStatusChange: (status) => {
 *     // Handle status change
 *   }
 * });
 * ```
 */
export function useSingleNoteSync(
  noteId: string,
  note: Note | undefined,
  options: {
    onStatusChange?: (
      newStatus: Note['status'],
      oldStatus?: Note['status']
    ) => void;
    onUpdate?: (note: Note) => void;
    debug?: boolean;
  } = {}
): void {
  const prevNoteRef = useRef<Note | undefined>(note);
  const { onStatusChange, onUpdate, debug = false } = options;

  useEffect(() => {
    if (!note) return;

    const prevNote = prevNoteRef.current;

    if (prevNote && prevNote.status !== note.status) {
      debugLog(
        debug,
        `[useSingleNoteSync] Note ${noteId} status changed:`,
        prevNote.status,
        '->',
        note.status
      );

      if (onStatusChange) {
        onStatusChange(note.status, prevNote.status);
      }
    }

    if (onUpdate && prevNote !== note) {
      onUpdate(note);
    }

    prevNoteRef.current = note;
  }, [note, noteId, onStatusChange, onUpdate, debug]);
}

/**
 * Hook to detect if component needs re-render due to notes change
 * Returns true if notes array reference changed
 */
export function useNotesChanged(notes: Note[]): boolean {
  const prevNotesRef = useRef<Note[]>(notes);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (prevNotesRef.current !== notes) {
      setChanged(true);
      prevNotesRef.current = notes;
    }
  }, [notes]);

  return changed;
}
