import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pin, Edit3, Trash2, Calendar, Palette, X } from 'lucide-react';
import { Note } from '../types/Note';
import NoteModal from './NoteModal';
import ColorPicker from './ColorPicker';

interface NotesViewProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

const colorClasses = {
  indigo: 'bg-indigo-200 border-indigo-300 text-indigo-900',
  emerald: 'bg-emerald-200 border-emerald-300 text-emerald-900',
  sky: 'bg-sky-200 border-sky-300 text-sky-900',
  rose: 'bg-rose-200 border-rose-300 text-rose-900',
  violet: 'bg-violet-200 border-violet-300 text-violet-900',
  amber: 'bg-amber-200 border-amber-300 text-amber-900',
  fuchsia: 'bg-fuchsia-200 border-fuchsia-300 text-fuchsia-900',
  slate: 'bg-slate-200 border-slate-300 text-slate-900',
  cyan: 'bg-cyan-200 border-cyan-300 text-cyan-900',
  lime: 'bg-lime-200 border-lime-300 text-lime-900',
  orange: 'bg-orange-200 border-orange-300 text-orange-900',
  teal: 'bg-teal-200 border-teal-300 text-teal-900',
};

const priorityColors = {
  low: 'text-green-600',
  medium: 'text-orange-600',
  high: 'text-red-600',
};



export default function NotesView({ notes, onAddNote, onUpdateNote, onDeleteNote }: NotesViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [colorPickerNote, setColorPickerNote] = useState<string | null>(null);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);

  // Sort notes: pinned first, then by creation date
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleAddNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleTogglePin = (note: Note) => {
    onUpdateNote(note.id, { isPinned: !note.isPinned });
  };

  const handleColorChange = (noteId: string, color: Note['color']) => {
    onUpdateNote(noteId, { color });
    setColorPickerNote(null);
  };

  const handleNoteClick = (note: Note) => {
    setViewingNote(note);
  };
  const formatDate = (date: Date | string) => {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return '-';
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(dateObj);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Notes</h2>
          <p className="text-sm sm:text-base text-gray-600">Organize your thoughts with colorful sticky notes</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddNote}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Note</span>
        </motion.button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
        <AnimatePresence>
          {sortedNotes.map((note) => {
            
            return (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.8, rotateZ: -5 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateZ: 5 }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                transition: { type: 'spring', stiffness: 300 }
              }}
              onClick={() => handleNoteClick(note)}
              className={`relative p-3 sm:p-4 rounded-lg border-2 cursor-pointer transform transition-all duration-200 h-full ${
                colorClasses[note.color]
              } ${note.isPinned ? 'ring-2 ring-blue-400' : ''}`}
              style={{
                minHeight: '160px'
              }}
            >
              {/* Pin indicator */}
              {note.isPinned && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1"
                >
                  <Pin size={12} />
                </motion.div>
              )}

              {/* Note content */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg leading-tight">{note.title}</h3>
                
  
                
                <p className="text-sm opacity-80 line-clamp-4">{note.content}</p>
                
                {/* Metadata */}
                <div className="space-y-2 text-xs opacity-70">
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{formatDate(note.createdAt)}</span>
                  </div>
                  {note.dueDate && (
                    <div className="flex items-center space-x-1">
                      <span>Due: {formatDate(note.dueDate)}</span>
                    </div>
                  )}
                  <div className={`font-medium ${priorityColors[note.priority]}`}>
                    {note.priority.toUpperCase()} PRIORITY
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 hover:opacity-100 transition-opacity duration-200"
                   style={{ opacity: 1 }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTogglePin(note);
                  }}
                  className={`p-1 rounded-md bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all text-xs ${
                    note.isPinned ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  <Pin size={10} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditNote(note);
                  }}
                  className="p-1 rounded-md bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all text-gray-500 hover:text-blue-600 text-xs"
                >
                  <Edit3 size={10} />
                </motion.button>
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setColorPickerNote(colorPickerNote === note.id ? null : note.id);
                    }}
                    className="p-1 rounded-md bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all text-gray-500 hover:text-purple-600 text-xs"
                  >
                    <Palette size={12} />
                  </motion.button>
                  {colorPickerNote === note.id && (
                    <ColorPicker
                      currentColor={note.color}
                      onColorSelect={(color) => handleColorChange(note.id, color)}
                      onClose={() => setColorPickerNote(null)}
                    />
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNote(note.id);
                  }}
                  className="p-1 rounded-md bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all text-gray-500 hover:text-red-600 text-xs"
                >
                  <Trash2 size={10} />
                </motion.button>
              </div>
            </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {notes.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <Plus size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
          <p className="text-gray-600 mb-4">Create your first sticky note to get started</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddNote}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Note
          </motion.button>
        </motion.div>
      )}

      {/* Note Modal */}
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

      {/* Note Detail Modal */}
      <AnimatePresence>
        {viewingNote && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setViewingNote(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 100 }}
              className={`relative rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto border-t-2 sm:border-2 ${
                colorClasses[viewingNote.color]
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                <div className="flex items-center space-x-3">
                  {viewingNote.isPinned && (
                    <Pin size={20} className="text-blue-600" />
                  )}
                  <h2 className="text-2xl font-bold text-gray-900">
                    {viewingNote.title}
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setViewingNote(null)}
                  className="p-2 rounded-full hover:bg-white/50 transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Priority */}
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-2 rounded-full text-sm font-medium ${priorityColors[viewingNote.priority]} bg-white/50`}>
                    {viewingNote.priority.toUpperCase()} PRIORITY
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Content</h3>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {viewingNote.content || 'No content available'}
                  </p>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/30 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Calendar size={16} className="mr-2" />
                      Created
                    </h4>
                    <p className="text-gray-800">{formatDate(viewingNote.createdAt)}</p>
                  </div>
                  {viewingNote.dueDate && (
                    <div className="bg-white/30 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Calendar size={16} className="mr-2" />
                        Due Date
                      </h4>
                      <p className={`font-medium ${
                        new Date(viewingNote.dueDate) < new Date() ? 'text-red-700' : 'text-gray-800'
                      }`}>
                        {formatDate(viewingNote.dueDate)}
                        {new Date(viewingNote.dueDate) < new Date() && (
                          <span className="ml-2 text-red-600 font-bold">(Overdue)</span>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200/50">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setViewingNote(null);
                      handleEditNote(viewingNote);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit3 size={16} />
                    <span>Edit Note</span>
                  </motion.button>
                  <div className="flex space-x-2 sm:space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleTogglePin(viewingNote);
                        setViewingNote({ ...viewingNote, isPinned: !viewingNote.isPinned });
                      }}
                      className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                        viewingNote.isPinned 
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Pin size={16} />
                      <span className="sm:hidden">Pin</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onDeleteNote(viewingNote.id);
                        setViewingNote(null);
                      }}
                      className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span className="sm:hidden">Delete</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}