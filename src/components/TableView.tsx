import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Pin, 
  Edit3, 
  Trash2, 
  ArrowUpDown,
  Filter,
  Search,
  ChevronDown
} from 'lucide-react';
import { Note } from '../types/Note';
import NoteModal from './NoteModal';

interface TableViewProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

type SortField = 'title' | 'status' | 'priority' | 'createdAt' | 'dueDate';
type SortDirection = 'asc' | 'desc';

const statusColors = {
  'todo': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600',
  'in-progress': 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700',
  'done': 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700',
};

const priorityColors = {
  'low': 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700',
  'medium': 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700',
  'high': 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700',
};

const colorClasses = {
  indigo: 'bg-indigo-200 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700',
  emerald: 'bg-emerald-200 dark:bg-emerald-900/50 border-emerald-300 dark:border-emerald-700',
  sky: 'bg-sky-200 dark:bg-sky-900/50 border-sky-300 dark:border-sky-700',
  rose: 'bg-rose-200 dark:bg-rose-900/50 border-rose-300 dark:border-rose-700',
  violet: 'bg-violet-200 dark:bg-violet-900/50 border-violet-300 dark:border-violet-700',
  amber: 'bg-amber-200 dark:bg-amber-900/50 border-amber-300 dark:border-amber-700',
  fuchsia: 'bg-fuchsia-200 dark:bg-fuchsia-900/50 border-fuchsia-300 dark:border-fuchsia-700',
  slate: 'bg-slate-200 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700',
  cyan: 'bg-cyan-200 dark:bg-cyan-900/50 border-cyan-300 dark:border-cyan-700',
  lime: 'bg-lime-200 dark:bg-lime-900/50 border-lime-300 dark:border-lime-700',
  orange: 'bg-orange-200 dark:bg-orange-900/50 border-orange-300 dark:border-orange-700',
  teal: 'bg-teal-200 dark:bg-teal-900/50 border-teal-300 dark:border-teal-700',
};

export default function TableView({ notes, onAddNote, onUpdateNote, onDeleteNote }: TableViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const sortedAndFilteredNotes = useMemo(() => {
    let filtered = [...notes];

    // Split notes into pinned and unpinned
    let pinnedNotes = filtered.filter(note => note.isPinned);
    let unpinnedNotes = filtered.filter(note => !note.isPinned);

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
      pinnedNotes = pinnedNotes.filter(note => note.status === filterStatus);
      unpinnedNotes = unpinnedNotes.filter(note => note.status === filterStatus);
    }
    if (filterPriority !== 'all') {
      pinnedNotes = pinnedNotes.filter(note => note.priority === filterPriority);
      unpinnedNotes = unpinnedNotes.filter(note => note.priority === filterPriority);
    }

    // Apply sorting
    // Sort pinned and unpinned notes separately
    const sortNotes = (notes: Note[]) => {
      return notes.sort((a, b) => {
        let aValue: any = a[sortField];
        let bValue: any = b[sortField];

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
  }, [notes, sortField, sortDirection, filterStatus, filterPriority, searchTerm]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

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
      setSelectedRows(new Set(sortedAndFilteredNotes.map(note => note.id)));
    }
  };

  const handleBulkDelete = () => {
    selectedRows.forEach(noteId => onDeleteNote(noteId));
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

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 hover:text-blue-600 transition-colors group"
    >
      <span>{children}</span>
      <ArrowUpDown 
        size={14} 
        className={`transition-colors ${
          sortField === field ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
        }`} 
      />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Table View</h2>
          <p className="text-sm sm:text-base text-gray-600">Detailed spreadsheet view of all your notes</p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {selectedRows.size > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBulkDelete}
              className="flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex-1 sm:flex-none"
            >
              <Trash2 size={16} />
              <span>Delete ({selectedRows.size})</span>
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddNote}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-1 sm:flex-none"
          >
            <Plus size={20} />
            <span>Add Note</span>
          </motion.button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col space-y-3">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>
            
            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-4 flex-1">
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full appearance-none px-3 sm:px-4 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full appearance-none px-3 sm:px-4 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="col-span-2 sm:col-span-1 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg text-center">
                {sortedAndFilteredNotes.length} of {notes.length} notes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="overflow-auto">
          <table className="w-full table-auto">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="w-10 px-3 py-3 text-left border-r border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === sortedAndFilteredNotes.length && sortedAndFilteredNotes.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                </th>
                <th className="w-1/6 px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200 bg-gray-100">
                  <SortButton field="title">Title</SortButton>
                </th>
                <th className="w-1/4 hidden lg:table-cell px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200 bg-gray-100">
                  Content
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200 bg-gray-100">
                  <SortButton field="status">Status</SortButton>
                </th>
                <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200 bg-gray-100">
                  <SortButton field="priority">Priority</SortButton>
                </th>
                <th className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200 bg-gray-100">
                  Color
                </th>
                <th className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200 bg-gray-100">
                  <SortButton field="createdAt">Created</SortButton>
                </th>
                <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-200 bg-gray-100">
                  <SortButton field="dueDate">Due</SortButton>
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y-2 divide-gray-100">
              {sortedAndFilteredNotes.map((note, index) => (
                <motion.tr
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`hover:bg-blue-50 transition-all duration-200 border-b border-gray-100 ${
                    selectedRows.has(note.id) ? 'bg-blue-50 shadow-sm' : 'hover:shadow-sm'
                  }`}
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4 border-r border-gray-100">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(note.id)}
                      onChange={() => handleSelectRow(note.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 border-r border-gray-100">
                    <div className="flex items-center space-x-2">
                      {note.isPinned && (
                        <Pin size={16} className="text-blue-600 shrink-0" />
                      )}
                      <span className="font-semibold text-gray-900 max-w-[120px] sm:max-w-[250px] truncate text-sm">{note.title}</span>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 border-r border-gray-100">
                    <div className="text-sm text-gray-600 max-w-[200px] sm:max-w-[350px] truncate leading-relaxed">
                      {note.content}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap border-r border-gray-100">
                    <span className={`inline-flex px-2 sm:px-3 py-1 sm:py-2 text-xs font-semibold rounded-full border shadow-sm ${statusColors[note.status]}`}>
                      {note.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap border-r border-gray-100">
                    <span className={`inline-flex px-2 sm:px-3 py-1 sm:py-2 text-xs font-semibold rounded-full border shadow-sm ${priorityColors[note.priority]}`}>
                      {note.priority}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap border-r border-gray-100">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border-2 ${colorClasses[note.color]} shadow-md`} />
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-600 border-r border-gray-100 font-medium">
                    {formatDate(note.createdAt)}
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm border-r border-gray-100">
                    <span className={`font-medium ${note.dueDate && new Date(note.dueDate) < new Date() ? 'text-red-600 bg-red-50 px-2 py-1 rounded-lg' : 'text-gray-600'}`}>
                      {formatDate(note.dueDate)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1 sm:space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleTogglePin(note)}
                        className={`p-1.5 sm:p-2.5 rounded-xl transition-all duration-200 ${
                          note.isPinned 
                            ? 'text-blue-600 bg-blue-100 shadow-sm' 
                            : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm'
                        }`}
                      >
                        <Pin size={14} className="sm:w-4 sm:h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditNote(note)}
                        className="p-1.5 sm:p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm transition-all duration-200"
                      >
                        <Edit3 size={14} className="sm:w-4 sm:h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onDeleteNote(note.id)}
                        className="p-1.5 sm:p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 hover:shadow-sm transition-all duration-200"
                      >
                        <Trash2 size={14} className="sm:w-4 sm:h-4" />
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or create a new note</p>
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
    </div>
  );
}