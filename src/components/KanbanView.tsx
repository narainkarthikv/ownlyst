import { useState, useCallback, memo } from 'react';
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
} from 'lucide-react';
import { Note } from '../types/Note';
import NoteModal from './NoteModal';
import ColorPicker from './ColorPicker';

// Types
interface KanbanViewProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

type ColumnId = 'todo' | 'in-progress' | 'done';

interface Column {
  id: ColumnId;
  title: string;
  color: string;
  icon?: React.ReactNode;
}

// Constants
const COLUMNS: Column[] = [
  {
    id: 'todo',
    title: 'To-Do',
    color:
      'from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800 border-slate-200 dark:border-slate-700',
    icon: '📋',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color:
      'from-sky-50 to-sky-100 dark:from-sky-900/50 dark:to-sky-800 border-sky-200 dark:border-sky-700',
    icon: '⚡',
  },
  {
    id: 'done',
    title: 'Done',
    color:
      'from-emerald-50 to-emerald-100 dark:from-emerald-900/50 dark:to-emerald-800 border-emerald-200 dark:border-emerald-700',
    icon: '✅',
  },
];

const COLOR_CLASSES: Record<string, string> = {
  indigo:
    'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/50 dark:to-indigo-800 border-indigo-200 dark:border-indigo-700 hover:from-indigo-100 hover:to-indigo-200 dark:hover:from-indigo-800 dark:hover:to-indigo-700',
  emerald:
    'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/50 dark:to-emerald-800 border-emerald-200 dark:border-emerald-700 hover:from-emerald-100 hover:to-emerald-200 dark:hover:from-emerald-800 dark:hover:to-emerald-700',
  sky: 'bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/50 dark:to-sky-800 border-sky-200 dark:border-sky-700 hover:from-sky-100 hover:to-sky-200 dark:hover:from-sky-800 dark:hover:to-sky-700',
  rose: 'bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/50 dark:to-rose-800 border-rose-200 dark:border-rose-700 hover:from-rose-100 hover:to-rose-200 dark:hover:from-rose-800 dark:hover:to-rose-700',
  violet:
    'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/50 dark:to-violet-800 border-violet-200 dark:border-violet-700 hover:from-violet-100 hover:to-violet-200 dark:hover:from-violet-800 dark:hover:to-violet-700',
  amber:
    'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/50 dark:to-amber-800 border-amber-200 dark:border-amber-700 hover:from-amber-100 hover:to-amber-200 dark:hover:from-amber-800 dark:hover:to-amber-700',
  fuchsia:
    'bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-900/50 dark:to-fuchsia-800 border-fuchsia-200 dark:border-fuchsia-700 hover:from-fuchsia-100 hover:to-fuchsia-200 dark:hover:from-fuchsia-800 dark:hover:to-fuchsia-700',
  slate:
    'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800 border-slate-200 dark:border-slate-700 hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-800 dark:hover:to-slate-700',
  cyan: 'bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/50 dark:to-cyan-800 border-cyan-200 dark:border-cyan-700 hover:from-cyan-100 hover:to-cyan-200 dark:hover:from-cyan-800 dark:hover:to-cyan-700',
  lime: 'bg-gradient-to-br from-lime-50 to-lime-100 dark:from-lime-900/50 dark:to-lime-800 border-lime-200 dark:border-lime-700 hover:from-lime-100 hover:to-lime-200 dark:hover:from-lime-800 dark:hover:to-lime-700',
  orange:
    'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/50 dark:to-orange-800 border-orange-200 dark:border-orange-700 hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-800 dark:hover:to-orange-700',
  teal: 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/50 dark:to-teal-800 border-teal-200 dark:border-teal-700 hover:from-teal-100 hover:to-teal-200 dark:hover:from-teal-800 dark:hover:to-teal-700',
};

const PRIORITY_COLORS: Record<Note['priority'], string> = {
  low: 'bg-green-500',
  medium: 'bg-orange-500',
  high: 'bg-red-500',
};

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
      (color: Note['color']) => {
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
            ${COLOR_CLASSES[note.color]}
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
                className={`w-3 h-3 rounded-full ${PRIORITY_COLORS[note.priority]} shadow-sm`}
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
            <div className='absolute bottom-3 right-3 flex items-center space-x-1.5'>
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className='flex items-center space-x-1.5'>
                    <div className='relative'>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowColorPicker(!showColorPicker);
                        }}
                        className={`p-1.5 rounded-lg transition-all duration-200
                        ${
                          showColorPicker
                            ? 'bg-purple-100 text-purple-600 shadow-inner'
                            : 'bg-white/90 shadow-sm hover:shadow-md text-gray-500 hover:text-purple-600'
                        }
                      `}>
                        <Palette size={14} />
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
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleTogglePin}
                      className={`p-1.5 rounded-lg bg-white/90 shadow-sm hover:shadow-md transition-all ${
                        note.isPinned
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                      }`}>
                      <Pin size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleDelete}
                      className='p-1.5 rounded-lg bg-white/90 shadow-sm hover:shadow-md transition-all
                      text-gray-400 hover:text-red-600 hover:bg-red-50'>
                      <Trash2 size={14} />
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
  column: Column;
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

// Main KanbanView Component
export default function KanbanView({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}: KanbanViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnState, setColumnState] = useState<Record<ColumnId, Note[]>>(
    () => {
      const initialState: Record<ColumnId, Note[]> = {
        todo: [],
        'in-progress': [],
        done: [],
      };

      // Initial distribution of notes
      notes.forEach((note) => {
        const columnIndex = Math.floor(Math.random() * COLUMNS.length);
        const columnId = COLUMNS[columnIndex].id;
        initialState[columnId].push(note);
      });

      return initialState;
    }
  );

  // Drag and drop handler with smooth animations
  const handleDragEnd = useCallback((result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    setColumnState((prev) => {
      const newState = { ...prev };
      const sourceCol = [...prev[source.droppableId as ColumnId]];
      const destCol =
        source.droppableId === destination.droppableId
          ? sourceCol
          : [...prev[destination.droppableId as ColumnId]];

      const [movedNote] = sourceCol.splice(source.index, 1);
      destCol.splice(destination.index, 0, movedNote);

      if (source.droppableId === destination.droppableId) {
        newState[source.droppableId as ColumnId] = sourceCol;
      } else {
        newState[source.droppableId as ColumnId] = sourceCol;
        newState[destination.droppableId as ColumnId] = destCol;
      }

      return newState;
    });
  }, []);

  return (
    <div className='h-full flex flex-col overflow-hidden'>
      {/* Fixed Header */}
      <div className='sticky top-0 z-10 bg-white pb-6'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0'>
          <div>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>
              Kanban Board
            </h2>
            <p className='text-sm sm:text-base text-gray-600'>
              Manage your workflow with drag and drop
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className='w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 
              rounded-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-xl
              hover:scale-[1.02] active:scale-[0.98]'>
            <Plus size={20} />
            <span>Add Note</span>
          </button>
        </div>
      </div>

      {/* Scrollable Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='flex-1 min-h-0 overflow-y-auto p-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min'>
            {COLUMNS.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                notes={columnState[column.id]}
                onAddNote={() => setIsModalOpen(true)}
                onUpdateNote={onUpdateNote}
                onDeleteNote={onDeleteNote}
              />
            ))}
          </div>
        </div>
      </DragDropContext>

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
