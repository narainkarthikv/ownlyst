/**
 * EmptyState Component
 * Displays when there are no notes or search results
 * Used across all views (NotesView, TableView, KanbanView, RoadmapView)
 */

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { TEXT_CLASSES, BUTTON_CLASSES } from '../../constants/ui-colors';

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
      <h3
        className={`text-xl font-semibold text-center mb-2 ${TEXT_CLASSES.primary}`}>
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className={`text-center max-w-sm mb-6 ${TEXT_CLASSES.secondary}`}>
          {description}
        </p>
      )}

      {/* Action Button */}
      {action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.onClick}
          className={BUTTON_CLASSES.primary}>
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}
