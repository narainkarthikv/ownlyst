/**
 * EmptyState Component
 * Displays when there are no notes or search results
 * Used across all views (NotesView, TableView, KanbanView, RoadmapView)
 */

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  icon = '📝',
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className='flex flex-col items-center justify-center py-12 px-4'>
      {/* Icon */}
      <div className='text-5xl mb-4'>{icon}</div>

      {/* Title */}
      <h3 className='text-xl font-semibold text-gray-900 dark:text-white text-center mb-2'>
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className='text-gray-600 dark:text-gray-400 text-center max-w-sm mb-6'>
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.onClick}
          className='px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900'>
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}
