/**
 * NotesView - Optimized Notes Grid View
 * 
 * Features:
 * - Memoized component to prevent unnecessary re-renders
 * - Debounced search input for better performance
 * - Memoized filtering and sorting operations
 * - Reusable NoteCard component with memoization
 */

import { useState, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  FileText,
  Pin,
  X,
  Edit3,
  Trash2,
  Calendar,
} from 'lucide-react';
import { Note } from '../types/Note';
import NoteModal from './NoteModal';
import EmptyState from './shared/EmptyState';
import NoteCard from './NoteCard';
import { useDebounce } from '../hooks/useDebounce';

interface NotesViewProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

const colorClasses: Record<string, string> = {
  indigo:
    'bg-azure-100 dark:bg-azure-900/60 border-azure-200 dark:border-azure-600 text-gray-900 dark:text-white shadow-sm',
  emerald:
    'bg-blue-100 dark:bg-blue-900/60 border-blue-200 dark:border-blue-600 text-gray-900 dark:text-white shadow-sm',
  sky: 'bg-cyan-100 dark:bg-cyan-900/60 border-cyan-200 dark:border-cyan-600 text-gray-900 dark:text-white shadow-sm',
  rose: 'bg-azure-200 dark:bg-azure-800/60 border-azure-300 dark:border-azure-600 text-gray-900 dark:text-white shadow-sm',
  violet:
    'bg-violet-200 dark:bg-violet-900/50 border-violet-300 dark:border-violet-700 text-violet-900 dark:text-violet-100',
  amber:
    'bg-amber-200 dark:bg-amber-900/50 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100',
  fuchsia:
    'bg-fuchsia-200 dark:bg-fuchsia-900/50 border-fuchsia-300 dark:border-fuchsia-700 text-fuchsia-900 dark:text-fuchsia-100',
  slate:
    'bg-slate-200 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100',
  cyan: 'bg-cyan-200 dark:bg-cyan-900/50 border-cyan-300 dark:border-cyan-700 text-cyan-900 dark:text-cyan-100',
  lime: 'bg-lime-200 dark:bg-lime-900/50 border-lime-300 dark:border-lime-700 text-lime-900 dark:text-lime-100',
  orange:
    'bg-orange-200 dark:bg-orange-900/50 border-orange-300 dark:border-orange-700 text-orange-900 dark:text-orange-100',
  teal: 'bg-teal-200 dark:bg-teal-900/50 border-teal-300 dark:border-teal-700 text-teal-900 dark:text-teal-100',
};

const priorityColors = {
  low: 'text-azure-600 dark:text-azure-400',
  medium: 'text-blue-600 dark:text-blue-400',
  high: 'text-cyan-700 dark:text-cyan-500',
};

export default memo(function NotesView({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}: NotesViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [viewingNote, setViewingNote] = useState<Note | null>(null);

  // Debounce search to avoid excessive filtering
  const searchTerm = useDebounce(searchInput, undefined, { delay: 200 });

  // Memoized filtered notes - only recomputes when notes or searchTerm changes
  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [notes, searchTerm]
  );

  // Memoized sorted notes - only recomputes when filteredNotes changes
  const sortedNotes = useMemo(
    () =>
      [...filteredNotes].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }),
    [filteredNotes]
  );

  // Memoized callback handlers to prevent unnecessary prop updates
  const handleAddNote = useCallback(() => {
    setEditingNote(null);
    setIsModalOpen(true);
  }, []);

  const handleEditNote = useCallback((note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  }, []);

  const handleTogglePin = useCallback(
    (note: Note) => {
      onUpdateNote(note.id, { isPinned: !note.isPinned });
    },
    [onUpdateNote]
  );

  const formatDate = useCallback((date: Date | string) => {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return '-';
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(dateObj);
  }, []);

  return (
    <div className='space-y-6 p-4'>
      {/* Search and Add Note Section */}
      <div className='flex flex-col sm:flex-row gap-3 sm:items-center sm:space-x-3'>
        <div className='relative flex-1'>
          <input
            type='search'
            placeholder='Search notes...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label='Search notes by title or content'
            className='w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none'
          />
          <span
            aria-hidden='true'
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600'>
            <Search className='h-4 w-4' />
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddNote}
          aria-label='Create a new note'
          className='inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium gap-2 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none'>
          <Plus className='h-5 w-5' aria-hidden='true' />
          <span className='sm:hidden'>Add Note</span>
        </motion.button>
      </div>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <EmptyState
          icon={<FileText className='h-16 w-16' />}
          title='No notes yet'
          description='Create your first sticky note to get started'
          action={{
            label: 'Create Note',
            onClick: handleAddNote,
          }}
        />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4'>
          <AnimatePresence mode='popLayout'>
            {sortedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                searchTerm={searchTerm}
                onUpdate={onUpdateNote}
                onDelete={onDeleteNote}
                onEdit={handleEditNote}
              />
            ))}
          </AnimatePresence>
        </div>
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
          <div className='fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4'>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 bg-black/50 backdrop-blur-sm'
              onClick={() => setViewingNote(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 100 }}
              className={`relative rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto border-t-2 sm:border-2 ${
                colorClasses[viewingNote.color]
              }`}>
              {/* Header */}
              <div className='flex items-center justify-between p-6 border-b border-gray-200/50'>
                <div className='flex items-center space-x-3'>
                  {viewingNote.isPinned && (
                    <Pin size={20} className='text-blue-600' />
                  )}
                  <h2 className='text-2xl font-bold text-gray-900'>
                    {viewingNote.title}
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setViewingNote(null)}
                  className='p-2 rounded-full hover:bg-white/50 transition-colors'>
                  <X size={24} />
                </motion.button>
              </div>

              {/* Content */}
              <div className='p-6 space-y-6'>
                {/* Priority */}
                <div className='flex items-center space-x-4'>
                  <div
                    className={`px-3 py-2 rounded-full text-sm font-medium ${priorityColors[viewingNote.priority]} bg-white/50`}>
                    {viewingNote.priority.toUpperCase()} PRIORITY
                  </div>
                </div>

                {/* Content */}
                <div className='bg-white/30 rounded-lg p-4'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                    Content
                  </h3>
                  <p className='text-gray-800 leading-relaxed whitespace-pre-wrap'>
                    {viewingNote.content || 'No content available'}
                  </p>
                </div>

                {/* Metadata */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='bg-white/30 rounded-lg p-4'>
                    <h4 className='font-semibold text-gray-900 mb-2 flex items-center'>
                      <Calendar size={16} className='mr-2' />
                      Created
                    </h4>
                    <p className='text-gray-800'>
                      {formatDate(viewingNote.createdAt)}
                    </p>
                  </div>
                  {viewingNote.dueDate && (
                    <div className='bg-white/30 rounded-lg p-4'>
                      <h4 className='font-semibold text-gray-900 mb-2 flex items-center'>
                        <Calendar size={16} className='mr-2' />
                        Due Date
                      </h4>
                      <p
                        className={`font-medium ${
                          new Date(viewingNote.dueDate) < new Date()
                            ? 'text-red-700'
                            : 'text-gray-800'
                        }`}>
                        {formatDate(viewingNote.dueDate)}
                        {new Date(viewingNote.dueDate) < new Date() && (
                          <span className='ml-2 text-red-600 font-bold'>
                            (Overdue)
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200/50'>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setViewingNote(null);
                      handleEditNote(viewingNote);
                    }}
                    className='flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                    <Edit3 size={16} />
                    <span>Edit Note</span>
                  </motion.button>
                  <div className='flex space-x-2 sm:space-x-3'>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleTogglePin(viewingNote);
                        setViewingNote({
                          ...viewingNote,
                          isPinned: !viewingNote.isPinned,
                        });
                      }}
                      className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                        viewingNote.isPinned
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}>
                      <Pin size={16} />
                      <span className='sm:hidden'>Pin</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onDeleteNote(viewingNote.id);
                        setViewingNote(null);
                      }}
                      className='flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors'>
                      <Trash2 size={16} />
                      <span className='sm:hidden'>Delete</span>
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
});
