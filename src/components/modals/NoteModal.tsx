/**
 * NoteModal Component - Modal View for Note Creation/Editing
 * 
 * Pure presentation component for creating and editing notes.
 * Responsibilities:
 * - Render form with all note fields
 * - Handle form validation
 * - Keyboard shortcuts (Escape to close, Ctrl+Enter to save)
 * - NO business logic - all data operations via callbacks
 * 
 * All note operations (create, update) are delegated to parent via callbacks.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Pin, Check } from 'lucide-react';
import type { Note } from '../../models/note.model';
import {
  NOTE_COLORS,
  NOTE_STATUSES,
  NOTE_PRIORITIES,
} from '../../models/enums';
import { formatDateForInput } from '../../utils/dates';

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
 * Light color classes for color selection grid
 */
const lightColorClasses: Record<string, string> = {
  indigo:
    'bg-indigo-200 dark:bg-indigo-800/50 border-indigo-300 dark:border-indigo-600 shadow-sm',
  emerald:
    'bg-emerald-200 dark:bg-emerald-800/50 border-emerald-300 dark:border-emerald-600 shadow-sm',
  sky: 'bg-sky-200 dark:bg-sky-800/50 border-sky-300 dark:border-sky-600 shadow-sm',
  rose: 'bg-rose-200 dark:bg-rose-900/50 border-rose-300 dark:border-rose-700 shadow-sm',
  violet:
    'bg-violet-200 dark:bg-violet-900/50 border-violet-300 dark:border-violet-700 shadow-sm',
  amber:
    'bg-amber-200 dark:bg-amber-900/50 border-amber-300 dark:border-amber-700 shadow-sm',
  fuchsia:
    'bg-fuchsia-200 dark:bg-fuchsia-900/50 border-fuchsia-300 dark:border-fuchsia-700 shadow-sm',
  slate:
    'bg-slate-200 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700 shadow-sm',
  cyan: 'bg-cyan-200 dark:bg-cyan-900/50 border-cyan-300 dark:border-cyan-700 shadow-sm',
  lime: 'bg-lime-200 dark:bg-lime-900/50 border-lime-300 dark:border-lime-700 shadow-sm',
  orange:
    'bg-orange-200 dark:bg-orange-900/50 border-orange-300 dark:border-orange-700 shadow-sm',
  teal: 'bg-teal-200 dark:bg-teal-900/50 border-teal-300 dark:border-teal-700 shadow-sm',
};

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
    color: 'indigo' as Note['color'],
    status: defaultStatus,
    priority: 'medium' as Note['priority'],
    isPinned: false,
    dueDate: defaultDueDate as Date | undefined,
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
        color: note.color,
        status: note.status,
        priority: note.priority,
        isPinned: note.isPinned,
        dueDate: note.dueDate,
      });
    } else {
      // Reset form for new note
      setFormData({
        title: '',
        content: '',
        color: 'indigo',
        status: defaultStatus,
        priority: 'medium',
        isPinned: false,
        dueDate: defaultDueDate,
      });
    }
    setErrors({});
  }, [note, defaultStatus, defaultDueDate, isOpen]);

  /**
   * Check if form is valid for submission
   */
  const isFormValid = formData.title.trim().length > 0;

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
  }, [isOpen, onClose, formData, isFormValid, onSave]);

  /**
   * Validate form data
   * Checks title length and content constraints
   */
  const validateForm = (): boolean => {
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
  };

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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            role='dialog'
            aria-modal='true'
            aria-labelledby='note-modal-title'
            className='relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-xl max-h-[80vh] overflow-y-auto'>
            {/* Modal Header */}
            <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700'>
              <h2
                id='note-modal-title'
                className='text-xl font-bold text-gray-900 dark:text-white'>
                {note ? 'Edit Note' : 'Create Note'}
              </h2>

              {/* Modal Actions - Pin, Save, Close */}
              <div className='flex items-center gap-2'>
                {/* Pin Button */}
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

                {/* Save Button */}
                <motion.button
                  type='button'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  title={`${note ? 'Update' : 'Save'} note (Ctrl+Enter)`}
                  aria-label={`${note ? 'Update' : 'Save'} note - Keyboard shortcut: Ctrl+Enter`}
                  className={`p-2 rounded-full transition-colors ${
                    isFormValid
                      ? 'text-emerald-600 hover:bg-emerald-100'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}>
                  <Check size={20} />
                </motion.button>

                {/* Close Button */}
                <motion.button
                  type='button'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  title='Close modal (Esc)'
                  aria-label='Close modal - Keyboard shortcut: Escape'
                  className='p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors'>
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className='p-6 space-y-6'>
              {/* Title Field */}
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
                  maxLength={200}
                  aria-invalid={!!errors.title}
                  aria-describedby={errors.title ? 'title-error' : undefined}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors ${
                    errors.title
                      ? 'border-red-500 dark:border-red-400'
                      : 'border-gray-300 dark:border-gray-600 bg-white'
                  }`}
                  placeholder='Enter note title...'
                />
                {errors.title && (
                  <p
                    id='title-error'
                    className='mt-1 text-sm text-red-600 dark:text-red-400'>
                    {errors.title}
                  </p>
                )}
                <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
                  {formData.title.length}/200
                </p>
              </div>

              {/* Content Field */}
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
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
                  maxLength={5000}
                  rows={4}
                  aria-invalid={!!errors.content}
                  aria-describedby={errors.content ? 'content-error' : undefined}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none transition-colors ${
                    errors.content
                      ? 'border-red-500 dark:border-red-400'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder='Enter note content...'
                />
                {errors.content && (
                  <p
                    id='content-error'
                    className='mt-1 text-sm text-red-600 dark:text-red-400'>
                    {errors.content}
                  </p>
                )}
                <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
                  {formData.content.length}/5000
                </p>
              </div>

              {/* Color Picker Grid */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Color
                </label>
                <div className='grid grid-cols-6 gap-1'>
                  {NOTE_COLORS.map((color) => (
                    <motion.button
                      key={color}
                      type='button'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, color }))
                      }
                      aria-label={`Select ${color} color`}
                      className={`w-12 h-12 rounded-lg border-2 ${lightColorClasses[color]} ${
                        formData.color === color ? 'ring-2 ring-blue-500' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Status and Priority Selects */}
              <div className='grid grid-cols-2 gap-4'>
                {/* Status Dropdown */}
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
                    className='w-full px-3 py-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
                    {NOTE_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status
                          .replace('-', ' ')
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority Dropdown */}
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
                    className='w-full px-3 py-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
                    {NOTE_PRIORITIES.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Due Date Field */}
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
                    className='w-full pl-10 pr-3 py-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
              </div>

              {/* Spacer */}
              <div className='h-2' />
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
