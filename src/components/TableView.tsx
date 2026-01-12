import React, { useState, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Pin,
  Edit3,
  Trash2,
  ArrowUpDown,
  Filter,
  Search,
  ChevronDown,
  Table,
} from 'lucide-react';
import { Note } from '../types/Note';
import NoteModal from './NoteModal';
import EmptyState from './shared/EmptyState';

interface TableViewProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

type SortField = 'title' | 'status' | 'priority' | 'createdAt' | 'dueDate';
type SortDirection = 'asc' | 'desc';

const statusColors = {
  todo: 'bg-azure-100 dark:bg-azure-900/60 border-azure-200 dark:border-azure-600 text-gray-900 dark:text-white shadow-sm',
  'in-progress':
    'bg-blue-100 dark:bg-blue-900/60 border-blue-200 dark:border-blue-600 text-gray-900 dark:text-white shadow-sm',
  done: 'bg-cyan-100 dark:bg-cyan-900/60 border-cyan-200 dark:border-cyan-600 text-gray-900 dark:text-white shadow-sm',
};

const priorityColors = {
  low: 'bg-azure-100 dark:bg-azure-900/60 border-azure-200 dark:border-azure-600 text-azure-900 dark:text-azure-100 shadow-sm',
  medium:
    'bg-blue-100 dark:bg-blue-900/60 border-blue-200 dark:border-blue-600 text-blue-900 dark:text-blue-100 shadow-sm',
  high: 'bg-cyan-100 dark:bg-cyan-900/60 border-cyan-200 dark:border-cyan-600 text-cyan-900 dark:text-cyan-100 shadow-sm',
};

const colorClasses: Record<string, string> = {
  indigo:
    'bg-azure-200 dark:bg-azure-800/50 border-azure-300 dark:border-azure-600 shadow-sm',
  emerald:
    'bg-blue-200 dark:bg-blue-800/50 border-blue-300 dark:border-blue-600 shadow-sm',
  sky: 'bg-cyan-200 dark:bg-cyan-800/50 border-cyan-300 dark:border-cyan-600 shadow-sm',
  rose: 'bg-rose-200 dark:bg-rose-900/50 border-rose-300 dark:border-rose-700',
  violet:
    'bg-violet-200 dark:bg-violet-900/50 border-violet-300 dark:border-violet-700',
  amber:
    'bg-amber-200 dark:bg-amber-900/50 border-amber-300 dark:border-amber-700',
  fuchsia:
    'bg-fuchsia-200 dark:bg-fuchsia-900/50 border-fuchsia-300 dark:border-fuchsia-700',
  slate:
    'bg-slate-200 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700',
  cyan: 'bg-cyan-200 dark:bg-cyan-900/50 border-cyan-300 dark:border-cyan-700',
  lime: 'bg-lime-200 dark:bg-lime-900/50 border-lime-300 dark:border-lime-700',
  orange:
    'bg-orange-200 dark:bg-orange-900/50 border-orange-300 dark:border-orange-700',
  teal: 'bg-teal-200 dark:bg-teal-900/50 border-teal-300 dark:border-teal-700',
};

export default memo(function TableView({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}: TableViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleAddNote = useCallback(() => {
    setEditingNote(null);
    setIsModalOpen(true);
  }, []);

  const sortedAndFilteredNotes = useMemo(() => {
    const filtered = [...notes];

    // Split notes into pinned and unpinned
    let pinnedNotes = filtered.filter((note) => note.isPinned);
    let unpinnedNotes = filtered.filter((note) => !note.isPinned);

    // Apply search filter
    if (searchTerm) {
      const searchFilter = (note: Note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase());
      pinnedNotes = pinnedNotes.filter(searchFilter);
      unpinnedNotes = unpinnedNotes.filter(searchFilter);
    }

    // Apply filters
    if (filterStatus !== 'all') {
      pinnedNotes = pinnedNotes.filter((note) => note.status === filterStatus);
      unpinnedNotes = unpinnedNotes.filter(
        (note) => note.status === filterStatus
      );
    }
    if (filterPriority !== 'all') {
      pinnedNotes = pinnedNotes.filter(
        (note) => note.priority === filterPriority
      );
      unpinnedNotes = unpinnedNotes.filter(
        (note) => note.priority === filterPriority
      );
    }

    // Apply sorting
    // Sort pinned and unpinned notes separately
    const sortNotes = (notes: Note[]) => {
      return notes.sort((a, b) => {
        let aValue: string | number | Date | undefined = a[sortField];
        let bValue: string | number | Date | undefined = b[sortField];

        if (sortField === 'createdAt' || sortField === 'dueDate') {
          aValue = aValue ? new Date(aValue).getTime() : 0;
          bValue = bValue ? new Date(bValue).getTime() : 0;
        }

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    };

    const sortedPinned = sortNotes(pinnedNotes);
    const sortedUnpinned = sortNotes(unpinnedNotes);

    // Combine sorted pinned and unpinned notes
    return [...sortedPinned, ...sortedUnpinned];
  }, [
    notes,
    sortField,
    sortDirection,
    filterStatus,
    filterPriority,
    searchTerm,
  ]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

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
    if (selectedRows.size === sortedAndFilteredNotes.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(sortedAndFilteredNotes.map((note) => note.id)));
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

  const SortButton = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => handleSort(field)}
      className='flex items-center space-x-1 hover:text-blue-600 transition-colors group'>
      <span>{children}</span>
      <ArrowUpDown
        size={14}
        className={`transition-colors ${
          sortField === field
            ? 'text-blue-600'
            : 'text-gray-400 group-hover:text-blue-600'
        }`}
      />
    </button>
  );

  return (
    <div className='space-y-6 p-4'>
      {/* Header with Search and Add Note */}
      <div className='flex flex-col sm:flex-row gap-3 sm:items-center sm:space-x-3'>
        <div className='relative flex-1'>
          <input
            type='search'
            placeholder='Search notes...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent'
          />
          <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600'>
            <Search className='h-4 w-4' />
          </span>
        </div>
        <div className='flex gap-2 sm:gap-3'>
          {selectedRows.size > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBulkDelete}
              className='inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium gap-2 transition-colors'>
              <Trash2 className='h-5 w-5' />
              <span>Delete ({selectedRows.size})</span>
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddNote}
            className='inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium gap-2 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900'>
            <Plus className='h-5 w-5' aria-hidden='true' />
            <span className='sm:hidden'>Add Note</span>
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
        <div className='flex flex-col space-y-3'>
          {/* Filters */}
          <div className='flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4'>
            <div className='flex items-center space-x-2'>
              <Filter size={16} className='text-gray-500' />
              <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                Filters:
              </span>
            </div>

            <div className='grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-4 flex-1'>
              <div className='relative'>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className='w-full appearance-none px-3 sm:px-4 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'>
                  <option value='all'>All Status</option>
                  <option value='todo'>To Do</option>
                  <option value='in-progress'>In Progress</option>
                  <option value='done'>Done</option>
                </select>
                <ChevronDown
                  size={16}
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'
                />
              </div>

              <div className='relative'>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className='w-full appearance-none px-3 sm:px-4 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'>
                  <option value='all'>All Priority</option>
                  <option value='low'>Low</option>
                  <option value='medium'>Medium</option>
                  <option value='high'>High</option>
                </select>
                <ChevronDown
                  size={16}
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'
                />
              </div>

              <div className='col-span-2 sm:col-span-1 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg text-center'>
                {sortedAndFilteredNotes.length} of {notes.length} notes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className='rounded-xl shadow-lg border border-gray-200'>
        <div className='overflow-auto'>
          <table className='w-full table-auto'>
            <thead className='border-b-2 border-gray-200 sticky top-0 z-10'>
              <tr>
                <th className='w-10 px-3 py-3 text-center border-r border-gray-200'>
                  <input
                    type='checkbox'
                    checked={
                      selectedRows.size === sortedAndFilteredNotes.length &&
                      sortedAndFilteredNotes.length > 0
                    }
                    onChange={handleSelectAll}
                    className='w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2'
                  />
                </th>
                <th className='w-1/6 px-3 py-3 text-center text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-r'>
                  <SortButton field='title'>Title</SortButton>
                </th>
                <th className='w-1/4 hidden lg:table-cell px-3 py-3 text-center text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-r'>
                  Content
                </th>
                <th className='px-3 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-r'>
                  <SortButton field='status'>Status</SortButton>
                </th>
                <th className='hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-r'>
                  <SortButton field='priority'>Priority</SortButton>
                </th>
                <th className='hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-r'>
                  Color
                </th>
                <th className='hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-r'>
                  <SortButton field='createdAt'>Created</SortButton>
                </th>
                <th className='hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-r'>
                  <SortButton field='dueDate'>Due</SortButton>
                </th>
                <th className='hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-center text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-r'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y-2 divide-gray-100'>
              {sortedAndFilteredNotes.map((note, index) => (
                <motion.tr
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`hover:bg-blue-50 transition-all duration-200 border-b border-gray-100 ${
                    selectedRows.has(note.id)
                      ? 'bg-blue-50 shadow-sm'
                      : 'hover:shadow-sm'
                  }`}>
                  <td className='px-3 sm:px-6 py-3 sm:py-4 border-r border-gray-100'>
                    <input
                      type='checkbox'
                      checked={selectedRows.has(note.id)}
                      onChange={() => handleSelectRow(note.id)}
                      className='w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2'
                    />
                  </td>
                  <td className='px-3 sm:px-6 py-3 sm:py-4 border-r border-gray-100'>
                    <div className='flex items-center space-x-2'>
                      {note.isPinned && (
                        <Pin size={16} className='text-blue-600 shrink-0' />
                      )}
                      <span className='font-semibold text-gray-900 dark:text-white max-w-[120px] sm:max-w-[250px] truncate text-sm'>
                        {note.title}
                      </span>
                    </div>
                  </td>
                  <td className='hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 border-r border-gray-100'>
                    <div className='text-sm text-gray-900 dark:text-white max-w-[200px] sm:max-w-[350px] truncate leading-relaxed'>
                      {note.content}
                    </div>
                  </td>
                  <td className='px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap border-r border-gray-100'>
                    <span
                      className={`inline-flex px-2 sm:px-3 py-1 sm:py-2 text-xs font-semibold rounded-full border shadow-sm ${statusColors[note.status]}`}>
                      {note.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className='hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap border-r border-gray-100'>
                    <span
                      className={`inline-flex px-2 sm:px-3 py-1 sm:py-2 text-xs font-semibold rounded-full border shadow-sm ${priorityColors[note.priority]}`}>
                      {note.priority}
                    </span>
                  </td>
                  <td className='hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap border-r border-gray-100'>
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border-2 ${colorClasses[note.color]} shadow-md`}
                    />
                  </td>
                  <td className='hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white border-r border-gray-100 font-medium'>
                    {formatDate(note.createdAt)}
                  </td>
                  <td className='hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm border-r border-gray-100'>
                    <span
                      className={`font-medium ${note.dueDate && new Date(note.dueDate) < new Date() ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-lg' : 'text-gray-900 dark:text-gray-300'}`}>
                      {formatDate(note.dueDate)}
                    </span>
                  </td>
                  <td className='px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap'>
                    <div className='flex items-center space-x-1 sm:space-x-3'>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleTogglePin(note)}
                        className={`p-1.5 sm:p-2.5 rounded-xl transition-all duration-200 ${
                          note.isPinned
                            ? 'text-blue-600 bg-blue-100 shadow-sm'
                            : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm'
                        }`}>
                        <Pin size={14} className='sm:w-4 sm:h-4' />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditNote(note)}
                        className='p-1.5 sm:p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm transition-all duration-200'>
                        <Edit3 size={14} className='sm:w-4 sm:h-4' />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDeleteNote(note.id)}
                        className='p-1.5 sm:p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 hover:shadow-sm transition-all duration-200'>
                        <Trash2 size={14} className='sm:w-4 sm:h-4' />
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
      {sortedAndFilteredNotes.length === 0 && (
        <EmptyState
          icon={<Table className='h-16 w-16' />}
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
