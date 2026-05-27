import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Mic } from 'lucide-react';
import Logo from './Logo';
import type { NoteFormData } from '../models/note.model';

type Props = {
  onCreateNote: (data: NoteFormData) => void;
};

export default function FloatingAssistant({ onCreateNote }: Props) {
  const [open, setOpen] = useState(false);

  function handleCreateQuickNote() {
    onCreateNote({
      title: 'Quick note',
      content: '',
      priority: 'low',
      status: 'todo',
      isPinned: false,
    });
    setOpen(false);
  }

  function handleCreateTask() {
    onCreateNote({
      title: 'New task',
      content: '',
      priority: 'medium',
      status: 'todo',
      isPinned: false,
    });
    setOpen(false);
  }

  return (
    <div className='fixed right-6 bottom-6 z-50'>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className='mb-3 flex flex-col items-end space-y-2'>
            <button
              onClick={handleCreateQuickNote}
              className='group flex items-center space-x-3 bg-white dark:bg-slate-700 text-gray-800 dark:text-white shadow-sm px-3 py-2 rounded-lg hover:shadow-md transition'>
              <Plus size={16} />
              <span className='text-sm'>Quick note</span>
            </button>

            <button
              onClick={handleCreateTask}
              className='group flex items-center space-x-3 bg-white dark:bg-slate-700 text-gray-800 dark:text-white shadow-sm px-3 py-2 rounded-lg hover:shadow-md transition'>
              <Check size={16} />
              <span className='text-sm'>Create task</span>
            </button>

            <button
              onClick={() => setOpen(false)}
              className='group flex items-center space-x-3 bg-white dark:bg-slate-700 text-gray-800 dark:text-white shadow-sm px-3 py-2 rounded-lg hover:shadow-md transition'>
              <Mic size={16} />
              <span className='text-sm'>Voice (coming soon)</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        aria-label='Open assistant'
        onClick={() => setOpen((v) => !v)}
        className='flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:scale-105 transition-transform ring-1 ring-white/10'>
        <Logo size={22} />
      </button>
    </div>
  );
}
