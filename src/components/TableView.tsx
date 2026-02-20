import { useState, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pin, Edit3, Trash2, Table as TableIcon } from 'lucide-react';
import { Note } from '../types/Note';
import NoteModal from './NoteModal';
import EmptyState from './shared/EmptyState';
import FilterBar, { type FilterState } from './shared/FilterBar';
import { applyFilters, getDefaultFilters } from '../utils/noteFilters';
import {
  STATUS_BADGE_COLORS,
  PRIORITY_BADGE_COLORS,
} from '../constants/colors';

interface TableViewProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

export default memo(function TableView({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}: TableViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterState>(getDefaultFilters());

  const handleAddNote = useCallback(() => {
    setEditingNote(null);
    setIsModalOpen(true);
  }, []);

  const filteredNotes = useMemo(() => {
    return applyFilters(notes, filters);
  }, [notes, filters]);

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleTogglePin = (note: Note) => {
    onUpdateNote(note.id, { isPinned: !note.isPinned });
  };

  const handleSelectRow = (noteId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(noteId)) {
      newSelected.delete(noteId);
    } else {
      newSelected.add(noteId);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === filteredNotes.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredNotes.map((note) => note.id)));
    }
  };

  const handleBulkDelete = () => {
    selectedRows.forEach((noteId) => onDeleteNote(noteId));
    setSelectedRows(new Set());
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '-';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className='space-y-6 p-4'>
      {/* Header with FilterBar and Actions */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        totalCount={notes.length}
        filteredCount={filteredNotes.length}
        actions={
          <>
            <motion.button
              whileHover={selectedRows.size > 0 ? { scale: 1.02 } : {}}
              whileTap={selectedRows.size > 0 ? { scale: 0.98 } : {}}
              onClick={handleBulkDelete}
              aria-label={`Delete ${selectedRows.size} selected notes`}
              className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium gap-2 transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none shadow-sm whitespace-nowrap ${
                selectedRows.size > 0 ? '' : 'invisible pointer-events-none'
              }`}>
              <Trash2 className='h-5 w-5' aria-hidden='true' />
              <span>Delete ({selectedRows.size})</span>
            </motion.button>
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
          </>
        }
      />

      {/* Table */}
      <div className='rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700'>
              <tr>
                <th className='w-12 px-4 py-3 text-center'>
                  <input
                    type='checkbox'
                    checked={
                      selectedRows.size === filteredNotes.length &&
                      filteredNotes.length > 0
                    }
                    onChange={handleSelectAll}
                    className='w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                  />
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                  Title
                </th>
                <th className='hidden lg:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                  Content
                </th>
                <th className='px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                  Status
                </th>
                <th className='hidden sm:table-cell px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                  Priority
                </th>
                <th className='hidden md:table-cell px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                  Created
                </th>
                <th className='hidden sm:table-cell px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                  Due Date
                </th>
                <th className='px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 dark:border-gray-700'>
              {filteredNotes.map((note, index) => (
                <motion.tr
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    selectedRows.has(note.id)
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : ''
                  }`}>
                  <td className='px-4 py-3 text-center'>
                    <input
                      type='checkbox'
                      checked={selectedRows.has(note.id)}
                      onChange={() => handleSelectRow(note.id)}
                      className='w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                    />
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex items-center gap-2'>
                      {note.isPinned && (
                        <Pin
                          size={16}
                          className='text-blue-600 flex-shrink-0'
                        />
                      )}
                      <span className='font-medium text-gray-900 dark:text-gray-100 truncate'>
                        {note.title}
                      </span>
                    </div>
                  </td>
                  <td className='hidden lg:table-cell px-4 py-3'>
                    <div className='text-sm text-gray-600 dark:text-gray-400 max-w-md truncate'>
                      {note.content}
                    </div>
                  </td>
                  <td className='px-4 py-3 text-center'>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${STATUS_BADGE_COLORS[note.status]}`}>
                      {note.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className='hidden sm:table-cell px-4 py-3 text-center'>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${PRIORITY_BADGE_COLORS[note.priority]}`}>
                      {note.priority}
                    </span>
                  </td>
                  <td className='hidden md:table-cell px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400'>
                    {formatDate(note.createdAt)}
                  </td>
                  <td className='hidden sm:table-cell px-4 py-3 text-center'>
                    <span
                      className={`text-sm ${note.dueDate && new Date(note.dueDate) < new Date() ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>
                      {formatDate(note.dueDate)}
                    </span>
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex items-center justify-center gap-2'>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleTogglePin(note)}
                        className={`p-2 rounded-lg transition-colors ${
                          note.isPinned
                            ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
                            : 'text-gray-400 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}>
                        <Pin size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditNote(note)}
                        className='p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
                        <Edit3 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDeleteNote(note.id)}
                        className='p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty state */}
      {filteredNotes.length === 0 && (
        <EmptyState
          icon={<TableIcon className='h-16 w-16' />}
          title='No notes found'
          description='Try adjusting your filters or create a new note'
          action={{
            label: 'Create Note',
            onClick: handleAddNote,
          }}
        />
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
    </div>
  );
});
