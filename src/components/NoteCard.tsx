/**
 * NoteCard Component - Individual Note Display
 * 
 * Uses unified surface color across all views.
 * Status/Priority indicators use semantic colors.
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
import {
  SURFACE_CLASSES,
  STATUS_CLASSES,
  PRIORITY_CLASSES,
  TEXT_CLASSES,
  ICON_BUTTON_CLASSES,
} from '../constants/ui-colors';

interface NoteCardProps {
  note: Note;
  searchTerm?: string;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onDelete: (id: string) => void;
  onEdit?: (note: Note) => void;
}

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
      className={`relative p-3 sm:p-4 rounded-lg cursor-pointer transform transition-all duration-200 h-full ${
        SURFACE_CLASSES.base
      } ${SURFACE_CLASSES.hover} ${SURFACE_CLASSES.interactive} ${
        note.isPinned ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
      }`}
      style={{
        minHeight: '160px',
      }}>
      {/* Pin indicator */}
      {note.isPinned && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className='absolute -top-2 -right-2 bg-blue-500 dark:bg-blue-400 text-white rounded-full p-1'>
          <Pin size={12} />
        </motion.div>
      )}

      {/* Note content */}
      <div className='space-y-3'>
        <h3 className={`font-bold text-lg leading-tight ${TEXT_CLASSES.primary}`}>
          {searchTerm
            ? highlightSearchTerm(
                note.title,
                searchTerm,
                'bg-yellow-200 dark:bg-yellow-900/50 font-bold'
              )
            : note.title}
        </h3>

        <p className={`text-sm line-clamp-4 ${TEXT_CLASSES.secondary}`}>
          {searchTerm
            ? highlightSearchTerm(
                note.content,
                searchTerm,
                'bg-yellow-200 dark:bg-yellow-900/50 font-bold'
              )
            : note.content}
        </p>

        {/* Metadata */}
        <div className={`space-y-1 text-xs ${TEXT_CLASSES.muted}`}>
          <div className='flex items-center space-x-1'>
            <Calendar size={12} />
            <span>{formatDate(note.createdAt)}</span>
          </div>
          {note.dueDate && (
            <div className='flex items-center space-x-1'>
              <span>Due: {formatDate(note.dueDate)}</span>
            </div>
          )}
          {/* Status Badge */}
          <div className={`inline-block px-2 py-1 rounded text-xs font-semibold ${STATUS_CLASSES[note.status]}`}>
            {note.status === 'in-progress' ? 'In Progress' : note.status.charAt(0).toUpperCase() + note.status.slice(1)}
          </div>
          {/* Priority Badge */}
          <div className={`inline-block ml-2 px-2 py-1 rounded text-xs font-semibold ${PRIORITY_CLASSES[note.priority]}`}>
            {note.priority.charAt(0).toUpperCase() + note.priority.slice(1)}
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
          className={note.isPinned ? ICON_BUTTON_CLASSES.pinned : ICON_BUTTON_CLASSES.default}>
          <Pin size={14} aria-hidden='true' />
        </motion.button>
        <motion.button
          type='button'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleEdit}
          aria-label='Edit note'
          className={ICON_BUTTON_CLASSES.default}>
          <Edit3 size={14} aria-hidden='true' />
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
            className={ICON_BUTTON_CLASSES.default}>
            <Palette size={14} aria-hidden='true' />
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
          className={ICON_BUTTON_CLASSES.delete}>
          <Trash2 size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
});

export default NoteCard;
