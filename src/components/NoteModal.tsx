import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Pin, Check } from 'lucide-react';
import { Note } from '../types/Note';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
  defaultStatus?: Note['status'];
  defaultDueDate?: Date;
  onSave: (note: Omit<Note, 'id' | 'createdAt'>) => void;
}

const colors: Note['color'][] = [
  'indigo',
  'emerald',
  'sky',
  'rose',
  'violet',
  'amber',
  'slate',
  'cyan',
  'lime',
  'orange',
  'teal',
];
const statuses: Note['status'][] = ['todo', 'in-progress', 'done'];
const priorities: Note['priority'][] = ['low', 'medium', 'high'];

const colorClasses = {
  indigo:
    'bg-indigo-200 dark:bg-indigo-800 border-indigo-300 dark:border-indigo-600',
  emerald:
    'bg-emerald-200 dark:bg-emerald-800 border-emerald-300 dark:border-emerald-600',
  sky: 'bg-sky-200 dark:bg-sky-800 border-sky-300 dark:border-sky-600',
  rose: 'bg-rose-200 dark:bg-rose-800 border-rose-300 dark:border-rose-600',
  violet:
    'bg-violet-200 dark:bg-violet-800 border-violet-300 dark:border-violet-600',
  amber:
    'bg-amber-200 dark:bg-amber-800 border-amber-300 dark:border-amber-600',
  slate:
    'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-600',
  cyan: 'bg-cyan-200 dark:bg-cyan-800 border-cyan-300 dark:border-cyan-600',
  lime: 'bg-lime-200 dark:bg-lime-800 border-lime-300 dark:border-lime-600',
  orange:
    'bg-orange-200 dark:bg-orange-800 border-orange-300 dark:border-orange-600',
  teal: 'bg-teal-200 dark:bg-teal-800 border-teal-300 dark:border-teal-600',
};

export default function NoteModal({
  isOpen,
  onClose,
  note,
  defaultStatus = 'todo',
  defaultDueDate = undefined,
  onSave,
}: NoteModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    color: 'indigo' as Note['color'],
    status: defaultStatus,
    priority: 'medium' as Note['priority'],
    isPinned: false,
    dueDate: defaultDueDate as Date | undefined,
  });

  // Load initial data when editing or creating
  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        content: note.content,
        color: note.color,
        status: note.status,
        priority: note.priority,
        isPinned: note.isPinned,
        dueDate: note.dueDate,
      });
    } else {
      setFormData({
        title: '',
        content: '',
        color: 'indigo' as Note['color'],
        status: defaultStatus,
        priority: 'medium' as Note['priority'],
        isPinned: false,
        dueDate: defaultDueDate,
      });
    }
  }, [note, defaultStatus, defaultDueDate]);

  // Helpers
  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (dateString: string) => {
    setFormData((prev) => ({
      ...prev,
      dueDate: dateString ? new Date(dateString) : undefined,
    }));
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            role='dialog'
            aria-modal='true'
            aria-labelledby='note-modal-title'
            className='relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-xl max-h-[80vh] overflow-y-auto'>
            {/* Header */}
            <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700'>
              <h2
                id='note-modal-title'
                className='text-xl font-bold text-gray-900 dark:text-white'>
                {note ? 'Edit Note' : 'Create Note'}
              </h2>
              <div className='flex items-center gap-2'>
                <motion.button
                  type='button'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isPinned: !prev.isPinned,
                    }))
                  }
                  aria-label={formData.isPinned ? 'Unpin note' : 'Pin note'}
                  className={`p-2 rounded-full transition-colors ${
                    formData.isPinned
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                  <Pin size={20} />
                </motion.button>
                <motion.button
                  type='button'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSubmit}
                  disabled={!formData.title.trim()}
                  aria-label={note ? 'Update note' : 'Save note'}
                  className={`p-2 rounded-full transition-colors ${
                    formData.title.trim()
                      ? 'text-emerald-600 hover:bg-emerald-100'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}>
                  <Check size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  aria-label='Close modal'
                  className='p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors'>
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='p-6 space-y-6'>
              {/* Title */}
              <div>
                <label className='block text-sm font-medium text-gray-900 dark:text-white mb-2'>
                  Title *
                </label>
                <input
                  type='text'
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent'
                  placeholder='Enter note title...'
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  rows={4}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                  placeholder='Enter note content...'
                />
              </div>

              {/* Color Selection */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Color
                </label>
                <div className='grid grid-cols-6 gap-1'>
                  {colors.map((color) => (
                    <motion.button
                      key={color}
                      type='button'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, color }))
                      }
                      aria-label={`Select ${color} color`}
                      className={`w-12 h-12 rounded-lg border-2 ${colorClasses[color]} ${
                        formData.color === color ? 'ring-2 ring-blue-500' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Status and Priority */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as Note['status'],
                      }))
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status
                          .replace('-', ' ')
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        priority: e.target.value as Note['priority'],
                      }))
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Due Date
                </label>
                <div className='relative'>
                  <Calendar
                    className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                    size={16}
                  />
                  <input
                    type='date'
                    value={formatDateForInput(formData.dueDate)}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
              </div>

              {/* Spacer for form bottom padding */}
              <div className='h-2' />
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
