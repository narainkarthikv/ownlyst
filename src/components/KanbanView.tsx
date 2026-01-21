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
  Calendar,
  Trash2,
  GripVertical,
  Palette,
  Search,
  Kanban,
} from 'lucide-react';
import { Note } from '../types/Note';
import NoteModal from './NoteModal';
import ColorPicker from './ColorPicker';
import EmptyState from './shared/EmptyState';
import {
  DISPLAY_COLOR_CLASSES,
  PRIORITY_COLOR_CLASSES,
  type NoteColor,
} from '../constants/colors';
import { KANBAN_COLUMNS } from '../constants/kanban';
import { useNotesContext } from '../controllers/NotesProvider';

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
}

const KanbanCard = memo(
  ({ note, index, onUpdate, onDelete }: KanbanCardProps) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const formatDate = useCallback((date: Date) => {
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
      [note.id, onUpdate]
    );

    const handleDelete = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(note.id);
      },
      [note.id, onDelete]
    );

    const handleColorChange = useCallback(
      (color: NoteColor) => {
        onUpdate(note.id, { color });
        setShowColorPicker(false);
      },
      [note.id, onUpdate]
    );

    return (
      <Draggable draggableId={note.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={provided.draggableProps.style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
            relative p-4 rounded-lg border backdrop-blur-sm group
            ${DISPLAY_COLOR_CLASSES[note.color]}
            transition-all duration-200 transform
            ${
              snapshot.isDragging
                ? 'shadow-lg scale-[1.02] z-50 cursor-grabbing ring-2 ring-blue-400 opacity-90'
                : 'shadow hover:shadow-md hover:scale-[1.01] z-10 cursor-grab'
            }
          `}>
            {/* Drag Handle */}
            <div
              {...provided.dragHandleProps}
              className='absolute top-3 left-3 p-1.5 rounded-md opacity-0 group-hover:opacity-100
              transition-all duration-200 hover:bg-black/5 cursor-grab active:cursor-grabbing'>
              <GripVertical
                size={16}
                className='text-gray-400 group-hover:text-gray-600'
              />
            </div>

            {/* Pin & Priority Indicators */}
            <div className='absolute top-2 right-2 flex items-center space-x-2'>
              {note.isPinned && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className='bg-blue-500 text-white rounded-full p-1.5 shadow-lg'>
                  <Pin size={12} />
                </motion.div>
              )}
              <motion.div
                className={`w-3 h-3 rounded-full ${PRIORITY_COLOR_CLASSES[note.priority]} shadow-sm`}
                whileHover={{ scale: 1.2 }}
              />
            </div>

            {/* Content */}
            <div className='space-y-3 mt-6'>
              <motion.h4
                className='font-bold text-base text-gray-900 leading-snug pr-16'
                layout>
                {note.title}
              </motion.h4>
              <motion.p
                className='text-sm text-gray-600 line-clamp-3 leading-relaxed break-words'
                layout>
                {note.content}
              </motion.p>

              {/* Metadata */}
              <div className='flex items-center justify-between text-xs text-gray-500 pt-3 mt-2 border-t border-gray-200/50'>
                <div className='flex items-center gap-1.5'>
                  <Calendar size={12} strokeWidth={2.5} />
                  <span>{formatDate(note.createdAt)}</span>
                </div>
                {note.dueDate && (
                  <span
                    className={`font-medium ${
                      new Date(note.dueDate) < new Date()
                        ? 'text-red-600'
                        : 'text-orange-600'
                    }`}>
                    Due: {formatDate(note.dueDate)}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className='absolute top-3 right-3 flex items-center space-x-1.5'>
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className='flex items-center space-x-1.5'>
                    <div className='relative'>
                      <motion.button
                        type='button'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowColorPicker(!showColorPicker);
                        }}
                        aria-label='Change note color'
                        className={`p-1.5 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-purple-500 focus:outline-none
                        ${
                          showColorPicker
                            ? 'bg-purple-100 text-purple-600 shadow-inner'
                            : 'bg-white/90 shadow-sm hover:shadow-md text-gray-500 hover:text-purple-600'
                        }
                      `}>
                        <Palette size={14} aria-hidden='true' />
                      </motion.button>

                      <AnimatePresence>
                        {showColorPicker && (
                          <ColorPicker
                            currentColor={note.color}
                            onColorSelect={handleColorChange}
                            onClose={() => setShowColorPicker(false)}
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.button
                      type='button'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleTogglePin}
                      aria-label={note.isPinned ? 'Unpin note' : 'Pin note'}
                      className={`p-1.5 rounded-lg bg-white/90 shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        note.isPinned
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                      }`}>
                      <Pin size={14} aria-hidden='true' />
                    </motion.button>
                    <motion.button
                      type='button'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleDelete}
                      aria-label='Delete note'
                      className='p-1.5 rounded-lg bg-white/90 shadow-sm hover:shadow-md transition-all
                      text-gray-400 hover:text-red-600 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:outline-none'>
                      <Trash2 size={14} aria-hidden='true' />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
); // KanbanColumn Component
interface KanbanColumnProps {
  column: typeof KANBAN_COLUMNS[number];
  notes: Note[];
  onAddNote: () => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

const KanbanColumn = memo(
  ({
    column,
    notes,
    onAddNote,
    onUpdateNote,
    onDeleteNote,
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
              <h3 className='font-bold text-lg text-gray-900'>
                {column.title}
              </h3>
              <span
                className='inline-flex items-center justify-center h-6 min-w-[1.5rem] px-2 
              bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm'>
                {notes.length}
              </span>
            </div>
          </div>
          <button
            onClick={onAddNote}
            className='p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm
            transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 text-gray-600
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
                  />
                ))}
                {provided.placeholder}
              </div>

              {/* Empty State */}
              {notes.length === 0 && !snapshot.isDraggingOver && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <p className='text-sm text-gray-500 text-center px-6'>
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
  const updateNoteStatus = useCallback((noteId: string, newStatus: string) => {
    onUpdateNote(noteId, { status: newStatus as any });
  }, [onUpdateNote]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Handle drag and drop with immediate status synchronization
   * 
   * When a note is dragged from one column to another:
   * 1. The destination column ID is mapped to a status
   * 2. The note's status is updated in the data model
   * 3. The change propagates to all other views automatically
   * 4. Re-render is triggered by React state update
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

  // Filter notes by search term
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Organize notes into columns based on their status
   * Only updates when filtered notes change (search is updated)
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
      {/* Search and Add Note Section */}
      <div className='flex flex-col sm:flex-row gap-3 sm:items-center sm:space-x-3 mb-6'>
        <div className='relative flex-1'>
          <input
            type='search'
            placeholder='Search notes...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label='Search notes in Kanban board'
            className='w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none'
          />
          <span aria-hidden='true' className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600'>
            <Search className='h-4 w-4' />
          </span>
        </div>
        <motion.button
          type='button'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          aria-label='Create a new note'
          className='inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium gap-2 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none'>
          <Plus className='h-5 w-5' aria-hidden='true' />
          <span className='sm:hidden'>Add Note</span>
        </motion.button>
      </div>

      {/* Scrollable Kanban Board */}
      {notes.length === 0 ? (
        <EmptyState
          icon={<Kanban className='h-16 w-16' />}
          title='No notes yet'
          description='Create your first note to get started with the Kanban board'
          action={{
            label: 'Create Note',
            onClick: () => setIsModalOpen(true),
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
                  onAddNote={() => setIsModalOpen(true)}
                  onUpdateNote={onUpdateNote}
                  onDeleteNote={onDeleteNote}
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
            note={null}
            onSave={(noteData) => {
              onAddNote(noteData);
              setIsModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
