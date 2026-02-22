import { useState, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import {
  Plus,
  Pin,
  Edit3,
  Calendar,
  Trash2,
  GripVertical,
  Kanban,
} from 'lucide-react';
import { Note } from '../../types/Note';
import NoteModal from '../../components/NoteModal';
import EmptyState from '../../components/shared/EmptyState';
import FilterBar, {
  type FilterState,
} from '../../components/shared/FilterBar';
import { applyFilters, getDefaultFilters } from '../../utils/noteFilters';
import {
  PRIORITY_CARD_CLASSES,
  PRIORITY_INDICATOR_CLASSES,
  PRIORITY_TEXT_COLORS,
  STATUS_TEXT_COLORS,
} from '../../constants/colors';
import { KANBAN_COLUMNS } from '../../constants/kanban';
import { useNotesContext } from '../../controllers/NotesProvider';

// Types
interface KanbanViewProps {
  notes?: Note[]; // Optional - can use context instead
  onAddNote?: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onUpdateNote?: (id: string, updates: Partial<Note>) => void;
  onDeleteNote?: (id: string) => void;
}

interface KanbanCardProps {
  note: Note;
  index: number;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

const KanbanCard = memo(
  ({ note, index, onUpdate, onDelete, onEdit }: KanbanCardProps) => {
    const formatDate = useCallback((date: Date | string) => {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(new Date(date));
    }, []);

    const handleTogglePin = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onUpdate(note.id, { isPinned: !note.isPinned });
      },
      [note.id, note.isPinned, onUpdate]
    );

    const handleDelete = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(note.id);
      },
      [note.id, onDelete]
    );

    const handleEdit = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(note);
      },
      [note, onEdit]
    );

    return (
      <Draggable draggableId={note.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={provided.draggableProps.style}
            className={`
            relative p-4 rounded-lg cursor-pointer group
            ${PRIORITY_CARD_CLASSES[note.priority]}
            transition-all duration-200 transform
            ${
              snapshot.isDragging
                ? 'shadow-lg scale-[1.02] z-50 cursor-grabbing ring-2 ring-blue-500 dark:ring-blue-400 opacity-90'
                : 'shadow hover:shadow-md hover:scale-[1.01] z-10 cursor-grab'
            }
          `}
            onClick={() => onEdit(note)}>
            {/* Drag Handle */}
            <div
              {...provided.dragHandleProps}
              className='absolute top-2 left-2 p-1 rounded-md opacity-0 group-hover:opacity-100
              transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5 cursor-grab active:cursor-grabbing'>
              <GripVertical
                size={10}
                className='text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
              />
            </div>

            {/* Pin & Priority Indicators */}
            <div
              className={`absolute top-3 right-3 w-2 h-2 rounded-full ${PRIORITY_INDICATOR_CLASSES[note.priority]}`}
            />

            {note.isPinned && (
              <div className='absolute -top-2 -right-2 bg-blue-500 dark:bg-blue-400 text-white rounded-full p-1'>
                <Pin size={10} />
              </div>
            )}

            {/* Content */}
            <div className='space-y-3 pr-6 pl-5'>
              <motion.h4
                className='font-bold text-base leading-tight'
                layout>
                {note.title}
              </motion.h4>
              <motion.p
                className='text-sm opacity-80 line-clamp-4'
                layout>
                {note.content}
              </motion.p>

              {/* Metadata */}
              <div className='flex items-center justify-between text-xs'>
                <div className='flex items-center space-x-2 opacity-70'>
                  <Calendar size={12} />
                  <span>{formatDate(note.createdAt)}</span>
                  {note.dueDate && (
                    <span className='text-red-600 dark:text-red-400'>
                      Due: {formatDate(note.dueDate)}
                    </span>
                  )}
                </div>
                <div className='flex items-center gap-2'>
                  <span
                    className={`font-bold uppercase text-xs ${STATUS_TEXT_COLORS[note.status]}`}>
                    {note.status.replace('-', ' ')}
                  </span>
                  <span
                    className={`font-bold uppercase text-xs ${PRIORITY_TEXT_COLORS[note.priority]}`}>
                    {note.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
              <motion.button
                type='button'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleTogglePin}
                aria-label={note.isPinned ? 'Unpin note' : 'Pin note'}
                className={`p-1 rounded-md bg-white dark:bg-slate-700 shadow-sm hover:shadow-md transition-all text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  note.isPinned
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}>
                <Pin size={10} aria-hidden='true' />
              </motion.button>
              <motion.button
                type='button'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleEdit}
                aria-label='Edit note'
                className='p-1 rounded-md bg-white dark:bg-slate-700 shadow-sm hover:shadow-md transition-all text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                <Edit3 size={10} aria-hidden='true' />
              </motion.button>
              <motion.button
                type='button'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDelete}
                aria-label='Delete note'
                className='p-1 rounded-md bg-white dark:bg-slate-700 shadow-sm hover:shadow-md transition-all text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none'>
                <Trash2 size={10} aria-hidden='true' />
              </motion.button>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
); // KanbanColumn Component
interface KanbanColumnProps {
  column: (typeof KANBAN_COLUMNS)[number];
  notes: Note[];
  onAddNote: () => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
  onEditNote: (note: Note) => void;
}

const KanbanColumn = memo(
  ({
    column,
    notes,
    onAddNote,
    onUpdateNote,
    onDeleteNote,
    onEditNote,
  }: KanbanColumnProps) => {
    return (
      <div
        className={`flex flex-col h-[calc(100vh-12rem)] rounded-xl bg-gradient-to-br ${column.color} 
      border shadow-sm p-4 transition-all duration-300`}>
        {/* Column Header */}
        <div className='flex items-center justify-between pb-4'>
          <div className='flex items-center gap-3'>
            <span className='text-xl'>{column.icon}</span>
            <div className='flex items-center gap-2'>
              <h3 className='font-bold text-lg text-gray-900 dark:text-white'>
                {column.title}
              </h3>
              <span
                className='inline-flex items-center justify-center h-6 min-w-[1.5rem] px-2 
              bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm'>
                {notes.length}
              </span>
            </div>
          </div>
          <button
            onClick={onAddNote}
            className='p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm
            transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 text-gray-600 dark:text-gray-400
            hover:scale-105 active:scale-95'>
            <Plus size={18} />
          </button>
        </div>

        {/* Drop Zone */}
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`
              flex-1 overflow-y-auto space-y-4 p-4 rounded-lg border-2 border-dashed
              transition-all duration-200 backdrop-blur-sm
              ${
                snapshot.isDraggingOver
                  ? 'border-blue-400 bg-blue-50/50 shadow-md'
                  : 'border-slate-200 bg-white/20'
              }
            `}>
              <div className='space-y-4'>
                {notes.map((note, index) => (
                  <KanbanCard
                    key={note.id}
                    note={note}
                    index={index}
                    onUpdate={onUpdateNote}
                    onDelete={onDeleteNote}
                    onEdit={onEditNote}
                  />
                ))}
                {provided.placeholder}
              </div>

              {/* Empty State */}
              {notes.length === 0 && !snapshot.isDraggingOver && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <p className='text-sm text-gray-500 dark:text-gray-400 text-center px-6'>
                    Drop items here or click + to add a new note
                  </p>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
);

type ColumnId = 'todo' | 'in-progress' | 'done';

/**
 * Main KanbanView Component
 *
 * Features:
 * - Maps notes to Kanban columns based on their status
 * - Synchronizes status updates when items are dragged between columns
 * - Uses centralized state management for cross-view synchronization
 * - Optimized rendering with proper memoization
 */
export default function KanbanView({
  notes: propsNotes,
  onAddNote: propsOnAddNote,
  onUpdateNote: propsOnUpdateNote,
  onDeleteNote: propsOnDeleteNote,
}: KanbanViewProps) {
  // Use context-based state by default, fallback to props for backward compatibility
  const contextNotes = useNotesContext();
  const notes = propsNotes || contextNotes.notes;
  const onAddNote = propsOnAddNote || contextNotes.createNote;
  const onUpdateNote = propsOnUpdateNote || contextNotes.updateNote;
  const onDeleteNote = propsOnDeleteNote || contextNotes.deleteNote;

  // Helper to update note status (maps droppable ID to status)
  const updateNoteStatus = useCallback(
    (noteId: string, newStatus: string) => {
      onUpdateNote(noteId, { status: newStatus as Note['status'] });
    },
    [onUpdateNote]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [filters, setFilters] = useState<FilterState>(getDefaultFilters());

  const handleAddNote = useCallback(() => {
    setEditingNote(null);
    setIsModalOpen(true);
  }, []);

  const handleEditNote = useCallback((note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  }, []);

  // Apply filters to notes
  const filteredNotes = useMemo(() => {
    return applyFilters(notes, filters);
  }, [notes, filters]);

  /**
   * Handle drag and drop with immediate status synchronization
   */
  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;

      // No valid destination - dropped outside droppable area
      if (!destination) return;

      // Item dropped in same position - no change needed
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;

      // Map destination droppable ID to note status
      const newStatus = destination.droppableId as ColumnId;

      // Update the note's status in the data model
      // This triggers re-renders in all views that use the context
      updateNoteStatus(draggableId, newStatus);
    },
    [updateNoteStatus]
  );

  /**
   * Organize notes into columns based on their status
   * Only updates when filtered notes change
   * This ensures the UI always reflects the current data model state
   */
  const columnState = useMemo(() => {
    const columns: Record<ColumnId, Note[]> = {
      todo: [],
      'in-progress': [],
      done: [],
    };

    filteredNotes.forEach((note) => {
      const columnId = note.status as ColumnId;
      if (columnId in columns) {
        columns[columnId].push(note);
      }
    });

    return columns;
  }, [filteredNotes]);

  return (
    <div className='h-full flex flex-col overflow-hidden p-4'>
      {/* FilterBar and Add Note Section */}
      <div className='mb-6'>
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          totalCount={notes.length}
          filteredCount={filteredNotes.length}
          searchPlaceholder='Search notes in Kanban board...'
          actions={
            <motion.button
              type='button'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddNote}
              aria-label='Create a new note'
              className='inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium gap-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none shadow-sm whitespace-nowrap'>
              <Plus className='h-5 w-5' aria-hidden='true' />
              <span>New Note</span>
            </motion.button>
          }
        />
      </div>

      {/* Scrollable Kanban Board */}
      {notes.length === 0 ? (
        <EmptyState
          icon={<Kanban className='h-16 w-16' />}
          title='No notes yet'
          description='Create your first note to get started with the Kanban board'
          action={{
            label: 'Create Note',
            onClick: handleAddNote,
          }}
        />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className='flex-1 min-h-0 overflow-y-auto p-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min text-left text-xs font-bold text-gray-900 dark:text-white'>
              {KANBAN_COLUMNS.map((column) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  notes={columnState[column.id as ColumnId]}
                  onAddNote={handleAddNote}
                  onUpdateNote={onUpdateNote}
                  onDeleteNote={onDeleteNote}
                  onEditNote={handleEditNote}
                />
              ))}
            </div>
          </div>
        </DragDropContext>
      )}

      {/* Add Note Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <NoteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            note={editingNote}
            onSave={(noteData) => {
              if (editingNote) {
                onUpdateNote(editingNote.id, noteData);
              } else {
                onAddNote(noteData);
              }
              setIsModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
