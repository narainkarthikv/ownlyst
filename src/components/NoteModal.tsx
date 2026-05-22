/**
 * NoteModal Component - Modern Modal for Note Creation/Editing
 *
 * Clean, engaging presentation component for creating and editing notes.
 * Responsibilities:
 * - Render modern form with all note fields
 * - Handle form validation
 * - Keyboard shortcuts (Escape to close, Ctrl+Enter to save)
 * - NO business logic - all data operations via callbacks
 *
 * All note operations (create, update) are delegated to parent via callbacks.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Pin, Check, Flag, ListTodo, Tag } from 'lucide-react';
import type { Note } from '../types/Note';
import { NOTE_STATUSES, NOTE_PRIORITIES } from '../models/enums';
import { formatDateForInput } from '../utils/dates';

/**
 * Props for NoteModal component
 */
interface NoteModalProps {
  /** Whether modal is visible */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Note being edited (null for create mode) */
  note: Note | null;
  /** Default status for new notes */
  defaultStatus?: Note['status'];
  /** Default due date for new notes */
  defaultDueDate?: Date;
  /** Callback when note is saved */
  onSave: (note: Omit<Note, 'id' | 'createdAt'>) => void;
}

/**
 * NoteModal - Form for creating and editing notes
 *
 * Pure presentation component that:
 * - Renders form fields with validation
 * - Handles keyboard shortcuts
 * - Emits save event via callback
 * - Does not manage note state itself
 */
export default function NoteModal({
  isOpen,
  onClose,
  note,
  defaultStatus = 'todo',
  defaultDueDate = undefined,
  onSave,
}: NoteModalProps) {
  // Local form state only (for temporary editing)
  // No permanent state stored here
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: defaultStatus,
    priority: 'medium' as Note['priority'],
    isPinned: false,
    dueDate: defaultDueDate as Date | undefined,
    tags: [] as string[],
  });

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Initialize form data when note changes or modal opens
   * Runs when editing existing note or creating new one
   */
  useEffect(() => {
    if (note) {
      // Load existing note data into form
      setFormData({
        title: note.title,
        content: note.content,
        status: note.status,
        priority: note.priority,
        isPinned: note.isPinned,
        dueDate: note.dueDate,
        tags: note.tags || [],
      });
    } else {
      // Reset form for new note
      setFormData({
        title: '',
        content: '',
        status: defaultStatus,
        priority: 'medium',
        isPinned: false,
        dueDate: defaultDueDate,
        tags: [],
      });
    }
    setErrors({});
  }, [note, defaultStatus, defaultDueDate, isOpen]);

  /**
   * Check if form is valid for submission
   */
  const isFormValid = formData.title.trim().length > 0;

  /**
   * Validate form data
   * Checks title length and content constraints
   * Declared as a function (hoisted) so it can be referenced
   * from effects defined earlier without causing TDZ errors.
   */
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (formData.content.trim().length > 5000) {
      newErrors.content = 'Content must be less than 5000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.title, formData.content]);

  /**
   * Setup keyboard shortcuts
   * Escape: close modal
   * Ctrl+Enter: save note
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close
      if (e.key === 'Escape') {
        onClose();
      }
      // Ctrl/Cmd + Enter to save
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (isFormValid && validateForm()) {
          onSave(formData);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, formData, isFormValid, onSave, validateForm]);

  /**
   * Handle date field change
   * Converts string to Date object
   */
  const handleDateChange = (dateString: string) => {
    setFormData((prev) => ({
      ...prev,
      dueDate: dateString ? new Date(dateString) : undefined,
    }));
  };

  /**
   * Submit form
   * Validates and calls onSave callback
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          {/* Backdrop - click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            role='dialog'
            aria-modal='true'
            aria-labelledby='note-modal-title'
            className='relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col'>
            {/* Modal Header - Floating style */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-white dark:bg-slate-700 rounded-xl shadow-sm'>
                  {note ? (
                    <Pin
                      className='text-blue-600 dark:text-blue-400'
                      size={20}
                    />
                  ) : (
                    <Tag
                      className='text-purple-600 dark:text-purple-400'
                      size={20}
                    />
                  )}
                </div>
                <h2
                  id='note-modal-title'
                  className='text-xl font-bold text-gray-900 dark:text-white'>
                  {note ? 'Edit Note' : 'Create New Note'}
                </h2>
              </div>

              {/* Modal Actions */}
              <div className='flex items-center gap-2'>
                {/* Pin Toggle */}
                <motion.button
                  type='button'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isPinned: !prev.isPinned,
                    }))
                  }
                  title={formData.isPinned ? 'Unpin note' : 'Pin note'}
                  className={`p-2.5 rounded-xl transition-all ${
                    formData.isPinned
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-600'
                  }`}>
                  <Pin
                    size={18}
                    fill={formData.isPinned ? 'currentColor' : 'none'}
                  />
                </motion.button>

                {/* Close Button */}
                <motion.button
                  type='button'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  title='Close (Esc)'
                  className='p-2.5 rounded-xl bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 transition-all'>
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* Form Content - Scrollable */}
            <form
              onSubmit={handleSubmit}
              className='flex-1 overflow-y-auto p-6 space-y-5'>
              {/* Title Field */}
              <div>
                <input
                  type='text'
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  maxLength={200}
                  autoFocus
                  placeholder='Note title...'
                  aria-invalid={!!errors.title}
                  className={`w-full px-0 py-2 text-2xl font-bold border-0 border-b-2 focus:ring-0 focus:outline-none bg-transparent transition-colors text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 ${
                    errors.title
                      ? 'border-red-500 dark:border-red-400'
                      : 'border-gray-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400'
                  }`}
                />
                <div className='flex items-center justify-between mt-1'>
                  {errors.title ? (
                    <p className='text-sm text-red-600 dark:text-red-400'>
                      {errors.title}
                    </p>
                  ) : (
                    <p className='text-xs text-gray-400 dark:text-gray-500'>
                      * Required field
                    </p>
                  )}
                  <p className='text-xs text-gray-400 dark:text-gray-500'>
                    {formData.title.length}/200
                  </p>
                </div>
              </div>

              {/* Content Field */}
              <div>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  maxLength={5000}
                  rows={6}
                  placeholder='Write your note content here...'
                  className='w-full px-4 py-3 bg-white dark:bg-slate-700/50 border border-gray-200 dark:border-slate-700 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500'
                />
                <p className='mt-1 text-xs text-gray-400 dark:text-gray-500 text-right'>
                  {formData.content.length}/5000
                </p>
              </div>

              {/* Metadata Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                {/* Status */}
                <div className='bg-gray-50 dark:bg-slate-700/50 rounded-2xl p-4 border border-gray-200 dark:border-slate-600'>
                  <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                    <ListTodo
                      size={16}
                      className='text-blue-600 dark:text-blue-400'
                    />
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
                    className='w-full px-3 py-2 border-0 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 text-sm font-medium shadow-sm'>
                    {NOTE_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status
                          .replace('-', ' ')
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div className='bg-gray-50 dark:bg-slate-700/50 rounded-2xl p-4 border border-gray-200 dark:border-slate-600'>
                  <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                    <Flag
                      size={16}
                      className='text-purple-600 dark:text-purple-400'
                    />
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
                    className='w-full px-3 py-2 border-0 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 text-sm font-medium shadow-sm'>
                    {NOTE_PRIORITIES.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Due Date */}
                <div className='bg-gray-50 dark:bg-slate-700/50 rounded-2xl p-4 border border-gray-200 dark:border-slate-600'>
                  <label className='flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2'>
                    <Calendar
                      size={16}
                      className='text-amber-600 dark:text-amber-400'
                    />
                    Due Date
                  </label>
                  <input
                    type='date'
                    value={formatDateForInput(formData.dueDate)}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className='w-full px-3 py-2 border-0 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-amber-500 text-sm font-medium shadow-sm'
                  />
                </div>
              </div>
            </form>

            {/* Footer Actions */}
            <div className='flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50'>
              <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                <kbd className='px-2 py-1 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-md text-xs font-mono'>
                  Esc
                </kbd>
                <span>to close</span>
                <kbd className='px-2 py-1 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-md text-xs font-mono ml-2'>
                  Ctrl + Enter
                </kbd>
                <span>to save</span>
              </div>
              <motion.button
                type='button'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!isFormValid}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg flex items-center gap-2 ${
                  isFormValid
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                    : 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none'
                }`}>
                <Check size={18} />
                {note ? 'Update Note' : 'Create Note'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
