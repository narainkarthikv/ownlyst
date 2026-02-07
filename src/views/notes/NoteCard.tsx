/**
 * NoteCard Component - View Layer
 *
 * Pure presentation component for displaying a single note.
 * - Zero business logic
 * - All state mutations happen via props callbacks
 * - Memoized to prevent unnecessary re-renders
 * - Fully testable in isolation
 *
 * This component is responsible only for rendering note data
 * and emitting user interactions as events.
 */

import React, { memo, useCallback, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Pin, Edit3, Trash2, Calendar } from 'lucide-react';
import type { Note } from '../../models/note.model';
import { highlightSearchTerm } from '../../utils/highlighting';
import {
  PRIORITY_CARD_CLASSES,
  PRIORITY_INDICATOR_CLASSES,
  PRIORITY_TEXT_COLORS,
} from '../../constants/colors';

/**
 * Props for NoteCard component
 */
interface NoteCardProps {
  /** Note data to display */
  note: Note;
  /** Optional search term to highlight in content */
  searchTerm?: string;
  /** Callback when note properties are updated */
  onUpdate: (id: string, updates: Partial<Note>) => void;
  /** Callback when note should be deleted */
  onDelete: (id: string) => void;
  /** Optional callback when note is opened for editing */
  onEdit?: (note: Note) => void;
}

/**
 * NoteCard - Pure presentation component
 *
 * Renders a single note with all its data and actions.
 * Priority-based color coding (low=blue, medium=amber, high=red)
 * Handles user interactions by calling provided callbacks.
 */
const NoteCard = memo(
  forwardRef<HTMLDivElement, NoteCardProps>(function NoteCard(
    { note, searchTerm = '', onUpdate, onDelete, onEdit },
    ref
  ) {
    /**
     * Format date for display
     * Converts Date object to short format (e.g., "Jan 15")
     */
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

    /**
     * Handle toggle pin - emits update event to parent
     */
    const handleTogglePin = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onUpdate(note.id, { isPinned: !note.isPinned });
      },
      [note.id, note.isPinned, onUpdate]
    );

    /**
     * Handle edit - emits edit event to parent
     */
    const handleEdit = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit?.(note);
      },
      [note, onEdit]
    );

    /**
     * Handle delete - emits delete event to parent
     */
    const handleDelete = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(note.id);
      },
      [note.id, onDelete]
    );

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        whileHover={{
          scale: 1.01,
          transition: { type: 'spring', stiffness: 220, damping: 20 },
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onEdit?.(note)}
        className={`relative p-4 rounded-lg cursor-pointer group ${PRIORITY_CARD_CLASSES[note.priority]}`}>
        {/* Priority indicator dot */}
        <div
          className={`absolute top-3 right-3 w-2 h-2 rounded-full ${PRIORITY_INDICATOR_CLASSES[note.priority]}`}
        />

        {/* Pin indicator - shown when note is pinned */}
        {note.isPinned && (
          <div className='absolute -top-2 -right-2 bg-blue-500 dark:bg-blue-400 text-white rounded-full p-1'>
            <Pin size={10} />
          </div>
        )}

        <div className='space-y-3 pr-6'>
          {/* Title - with optional search highlighting */}
          <h3 className='font-bold text-base leading-tight'>
            {searchTerm
              ? highlightSearchTerm(
                  note.title,
                  searchTerm,
                  'bg-yellow-200 dark:bg-yellow-900/50 font-bold'
                )
              : note.title}
          </h3>

          {/* Content preview - with optional search highlighting */}
          <p className='text-sm opacity-80 line-clamp-4'>
            {searchTerm
              ? highlightSearchTerm(
                  note.content,
                  searchTerm,
                  'bg-yellow-200 dark:bg-yellow-900/50 font-bold'
                )
              : note.content}
          </p>

          {/* Metadata section - dates, status, and priority */}
          <div className='flex items-center justify-between text-xs'>
            <div className='flex items-center space-x-2 opacity-70'>
              <Calendar size={12} />
              <span>{formatDate(note.createdAt)}</span>
              {note.dueDate && (
                <span className='text-red-600 dark:text-red-400'>
                  Due: {formatDate(note.dueDate)}
                </span>
              )}
            </div>
            <div
              className={`font-bold uppercase text-xs ${PRIORITY_TEXT_COLORS[note.priority]}`}>
              {note.priority}
            </div>
          </div>
        </div>

        {/* Action buttons section */}
        <div className='absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
          {/* Pin button */}
          <motion.button
            type='button'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleTogglePin}
            aria-label={note.isPinned ? 'Unpin note' : 'Pin note'}
            className={`p-1 rounded-md bg-white dark:bg-slate-700 shadow-sm hover:shadow-md transition-all text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              note.isPinned
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
            }`}>
            <Pin size={10} aria-hidden='true' />
          </motion.button>

          {/* Edit button */}
          <motion.button
            type='button'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEdit}
            aria-label='Edit note'
            className='p-1 rounded-md bg-white dark:bg-slate-700 shadow-sm hover:shadow-md transition-all text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none'>
            <Edit3 size={10} aria-hidden='true' />
          </motion.button>

          {/* Delete button */}
          <motion.button
            type='button'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            aria-label='Delete note'
            className='p-1 rounded-md bg-white dark:bg-slate-700 shadow-sm hover:shadow-md transition-all text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none'>
            <Trash2 size={10} />
          </motion.button>
        </div>
      </motion.div>
    );
  })
);

export default NoteCard;
