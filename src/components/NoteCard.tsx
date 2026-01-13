/**
 * NoteCard Component - Individual Note Display
 * 
 * Memoized component for rendering individual notes
 */

import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Pin,
  Edit3,
  Trash2,
  Calendar,
  Palette,
} from 'lucide-react';
import { Note } from '../types/Note';
import ColorPicker from './ColorPicker';
import { highlightSearchTerm } from '../utils/highlighting';

interface NoteCardProps {
  note: Note;
  searchTerm?: string;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onDelete: (id: string) => void;
  onEdit?: (note: Note) => void;
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

export const NoteCard = memo(function NoteCard({
  note,
  searchTerm = '',
  onUpdate,
  onDelete,
  onEdit,
}: NoteCardProps) {
  const [colorPickerNote, setColorPickerNote] = useState<string | null>(null);

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

  const handleTogglePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate(note.id, { isPinned: !note.isPinned });
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(note);
  };

  const handleColorChange = (color: Note['color']) => {
    onUpdate(note.id, { color });
    setColorPickerNote(null);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(note.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, rotateZ: -5 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotateZ: 5 }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        transition: { type: 'spring', stiffness: 300 },
      }}
      className={`relative p-3 sm:p-4 rounded-lg border-2 cursor-pointer transform transition-all duration-200 h-full ${
        colorClasses[note.color]
      } ${note.isPinned ? 'ring-2 ring-blue-400' : ''}`}
      style={{
        minHeight: '160px',
      }}>
      {/* Pin indicator */}
      {note.isPinned && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className='absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1'>
          <Pin size={12} />
        </motion.div>
      )}

      {/* Note content */}
      <div className='space-y-3'>
        <h3 className='font-bold text-lg leading-tight'>
          {searchTerm
            ? highlightSearchTerm(
                note.title,
                searchTerm,
                'bg-yellow-200 dark:bg-yellow-900/50 font-bold'
              )
            : note.title}
        </h3>

        <p className='text-sm opacity-80 line-clamp-4'>
          {searchTerm
            ? highlightSearchTerm(
                note.content,
                searchTerm,
                'bg-yellow-200 dark:bg-yellow-900/50 font-bold'
              )
            : note.content}
        </p>

        {/* Metadata */}
        <div className='space-y-2 text-xs opacity-70'>
          <div className='flex items-center space-x-1'>
            <Calendar size={12} />
            <span>{formatDate(note.createdAt)}</span>
          </div>
          {note.dueDate && (
            <div className='flex items-center space-x-1'>
              <span>Due: {formatDate(note.dueDate)}</span>
            </div>
          )}
          <div className={`font-medium ${priorityColors[note.priority]}`}>
            {note.priority.toUpperCase()} PRIORITY
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div
        className='absolute top-2 right-2 flex space-x-1 opacity-0 hover:opacity-100 transition-opacity duration-200'
        style={{ opacity: 1 }}>
        <motion.button
          type='button'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleTogglePin}
          aria-label={note.isPinned ? 'Unpin note' : 'Pin note'}
          className={`p-1 rounded-md bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            note.isPinned
              ? 'text-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}>
          <Pin size={10} aria-hidden='true' />
        </motion.button>
        <motion.button
          type='button'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleEdit}
          aria-label='Edit note'
          className='p-1 rounded-md bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all text-gray-500 hover:text-blue-600 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none'>
          <Edit3 size={10} aria-hidden='true' />
        </motion.button>
        <div className='relative'>
          <motion.button
            type='button'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setColorPickerNote(
                colorPickerNote === note.id ? null : note.id
              );
            }}
            aria-label='Change note color'
            className='p-1 rounded-md bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all text-gray-500 hover:text-purple-600 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none'>
            <Palette size={12} aria-hidden='true' />
          </motion.button>
          {colorPickerNote === note.id && (
            <ColorPicker
              currentColor={note.color}
              onColorSelect={handleColorChange}
              onClose={() => setColorPickerNote(null)}
            />
          )}
        </div>
        <motion.button
          type='button'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          aria-label='Delete note'
          className='p-1 rounded-md bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all text-gray-500 hover:text-red-600 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none'>
          <Trash2 size={10} />
        </motion.button>
      </div>
    </motion.div>
  );
});

export default NoteCard;
