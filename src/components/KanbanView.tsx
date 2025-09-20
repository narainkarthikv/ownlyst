import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Plus, Pin, Calendar, Trash2, GripVertical, Palette } from 'lucide-react';
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

type ColumnId = 'backlog' | 'in-progress' | 'completed';

interface Column {
  id: ColumnId;
  title: string;
  color: string;
  icon?: React.ReactNode;
}

// Constants
const COLUMNS: Column[] = [
  { 
    id: 'backlog', 
    title: 'Backlog', 
    color: 'from-slate-50 to-slate-100 border-slate-200',
    icon: '📋'
  },
  { 
    id: 'in-progress', 
    title: 'In Progress', 
    color: 'from-sky-50 to-sky-100 border-sky-200',
    icon: '⚡'
  },
  { 
    id: 'completed', 
    title: 'Completed', 
    color: 'from-emerald-50 to-emerald-100 border-emerald-200',
    icon: '✅'
  },
];

const COLOR_CLASSES = {
  indigo: 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:from-indigo-100 hover:to-indigo-200',
  emerald: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:from-emerald-100 hover:to-emerald-200',
  sky: 'bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200 hover:from-sky-100 hover:to-sky-200',
  rose: 'bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200 hover:from-rose-100 hover:to-rose-200',
  violet: 'bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200 hover:from-violet-100 hover:to-violet-200',
  amber: 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:from-amber-100 hover:to-amber-200',
  fuchsia: 'bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 border-fuchsia-200 hover:from-fuchsia-100 hover:to-fuchsia-200',
  slate: 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:from-slate-100 hover:to-slate-200',
  cyan: 'bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 hover:from-cyan-100 hover:to-cyan-200',
  lime: 'bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200 hover:from-lime-100 hover:to-lime-200',
  orange: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-200',
  teal: 'bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:from-teal-100 hover:to-teal-200',
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

const KanbanCard = memo(({ note, index, onUpdate, onDelete }: KanbanCardProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = useCallback((date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  }, []);

  const handleTogglePin = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate(note.id, { isPinned: !note.isPinned });
  }, [note.id, onUpdate]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(note.id);
  }, [note.id, onDelete]);

  const handleColorChange = useCallback((color: Note['color']) => {
    onUpdate(note.id, { color });
    setShowColorPicker(false);
  }, [note.id, onUpdate]);

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
            relative p-3 sm:p-4 rounded-xl border backdrop-blur-sm group
            ${COLOR_CLASSES[note.color]}
            transition-all duration-200 transform
            ${snapshot.isDragging 
              ? 'shadow-2xl scale-[1.02] z-50 cursor-grabbing opacity-90' 
              : 'shadow-sm hover:shadow-lg z-10 cursor-grab'
            }
          `}
        >
          {/* Drag Handle */}
          <div
            {...provided.dragHandleProps}
            className="absolute top-3 left-3 p-1.5 rounded-md opacity-0 group-hover:opacity-100
              transition-all duration-200 hover:bg-black/5 cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={16} className="text-gray-400 group-hover:text-gray-600" />
          </div>

          {/* Pin & Priority Indicators */}
          <div className="absolute top-2 right-2 flex items-center space-x-2">
            {note.isPinned && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-blue-500 text-white rounded-full p-1.5 shadow-lg"
              >
                <Pin size={12} />
              </motion.div>
            )}
            <motion.div 
              className={`w-3 h-3 rounded-full ${PRIORITY_COLORS[note.priority]} shadow-sm`}
              whileHover={{ scale: 1.2 }}
            />
          </div>

          {/* Content */}
          <div className="space-y-3 mt-8">
            <motion.h4 
              className="font-bold text-base text-gray-900 leading-tight pr-16"
              layout
            >
              {note.title}
            </motion.h4>
            <motion.p 
              className="text-sm text-gray-600 line-clamp-3 leading-relaxed"
              layout
            >
              {note.content}
            </motion.p>
            
            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200/50">
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{formatDate(note.createdAt)}</span>
              </div>
              {note.dueDate && (
                <span className={`font-medium ${
                  new Date(note.dueDate) < new Date() ? 'text-red-600' : 'text-orange-600'
                }`}>
                  Due: {formatDate(note.dueDate)}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-3 right-3 flex items-center space-x-1.5">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center space-x-1.5"
                >
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowColorPicker(!showColorPicker);
                      }}
                      className={`p-1.5 rounded-lg transition-all duration-200
                        ${showColorPicker 
                          ? 'bg-purple-100 text-purple-600 shadow-inner' 
                          : 'bg-white/90 shadow-sm hover:shadow-md text-gray-500 hover:text-purple-600'
                        }
                      `}
                    >
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
                    }`}
                  >
                    <Pin size={14} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDelete}
                    className="p-1.5 rounded-lg bg-white/90 shadow-sm hover:shadow-md transition-all
                      text-gray-400 hover:text-red-600 hover:bg-red-50"
                  >
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
});// KanbanColumn Component
interface KanbanColumnProps {
  column: Column;
  notes: Note[];
  onAddNote: () => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

const KanbanColumn = memo(({ column, notes, onAddNote, onUpdateNote, onDeleteNote }: KanbanColumnProps) => {
  return (
    <div className={`rounded-xl bg-gradient-to-br ${column.color} border-2 p-3 sm:p-4 min-h-[400px] md:min-h-[600px] w-full transition-all duration-300`}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="text-lg sm:text-xl">{column.icon}</span>
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-base sm:text-lg text-gray-900">{column.title}</h3>
            <span className="inline-flex bg-white/80 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 rounded-full 
              text-xs sm:text-sm font-medium text-gray-700 shadow-sm">
              {notes.length}
            </span>
          </div>
        </div>
        <button
          onClick={onAddNote}
          className="p-1.5 sm:p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md 
            transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 text-gray-600
            hover:scale-110 active:scale-95"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>

      {/* Drop Zone */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`
              relative space-y-4 min-h-[500px] p-4 rounded-xl border-2 border-dashed
              transition-all duration-200 backdrop-blur-sm
              ${snapshot.isDraggingOver 
                ? 'border-blue-400 bg-blue-50/50 shadow-lg scale-[1.01]' 
                : 'border-slate-200 bg-white/20'
              }
            `}
          >
            <div className="space-y-4">
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
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-gray-500 text-center px-6">
                  Drop items here or click + to add a new note
                </p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
});

// Main KanbanView Component
export default function KanbanView({ notes, onAddNote, onUpdateNote, onDeleteNote }: KanbanViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnState, setColumnState] = useState<Record<ColumnId, Note[]>>(() => {
    const initialState: Record<ColumnId, Note[]> = {
      'backlog': [],
      'in-progress': [],
      'completed': []
    };
    
    // Initial distribution of notes
    notes.forEach((note) => {
      const columnIndex = Math.floor(Math.random() * COLUMNS.length);
      const columnId = COLUMNS[columnIndex].id;
      initialState[columnId].push(note);
    });
    
    return initialState;
  });

  // Drag and drop handler with smooth animations
  const handleDragEnd = useCallback((result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    setColumnState(prev => {
      const newState = { ...prev };
      const sourceCol = [...prev[source.droppableId as ColumnId]];
      const destCol = source.droppableId === destination.droppableId
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Kanban Board
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your workflow with drag and drop
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 
            rounded-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-xl
            hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={20} />
          <span>Add Note</span>
        </button>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto">
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
      </DragDropContext>      {/* Add Note Modal */}
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