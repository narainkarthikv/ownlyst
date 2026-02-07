/**
 * VirtualizedNotesView - Optimized Notes List with Virtual Scrolling
 *
 * Renders only visible notes to improve performance with large datasets
 * Uses react-window for efficient virtualization
 */

import { memo, useMemo, CSSProperties } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Note } from '../types/Note';
import NoteCard from './NoteCard';
import EmptyState from './shared/EmptyState';

interface VirtualizedNotesViewProps {
  notes: Note[];
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
  itemHeight?: number;
  containerHeight?: number;
}

// Individual note row component for virtualization
const NotesRow = memo(
  ({
    index,
    style,
    data,
  }: {
    index: number;
    style: CSSProperties;
    data: {
      notes: Note[];
      onUpdateNote: (id: string, updates: Partial<Note>) => void;
      onDeleteNote: (id: string) => void;
    };
  }) => {
    const { notes, onUpdateNote, onDeleteNote } = data;
    const note = notes[index];

    if (!note) return null;

    return (
      <div style={style} className='px-4 py-2'>
        <NoteCard note={note} onUpdate={onUpdateNote} onDelete={onDeleteNote} />
      </div>
    );
  }
);

NotesRow.displayName = 'NotesRow';

export const VirtualizedNotesView = memo(function VirtualizedNotesView({
  notes,
  onUpdateNote,
  onDeleteNote,
  itemHeight = 200,
  containerHeight = 600,
}: VirtualizedNotesViewProps) {
  const itemData = useMemo(
    () => ({
      notes,
      onUpdateNote,
      onDeleteNote,
    }),
    [notes, onUpdateNote, onDeleteNote]
  );

  if (notes.length === 0) {
    return (
      <EmptyState
        icon='FileText'
        title='No notes yet'
        description='Create your first note to get started'
      />
    );
  }

  return (
    <List
      height={containerHeight}
      itemCount={notes.length}
      itemSize={itemHeight}
      width='100%'
      itemData={itemData}>
      {NotesRow}
    </List>
  );
});

export default VirtualizedNotesView;
