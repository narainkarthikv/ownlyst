
/**
 * EmptyState Component
 * Displays when there are no notes or search results.
 * Used across NotesView, TableView, KanbanView and RoadmapView.
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {/* Animated Icon Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, y: [0, -5, 0] }}
        transition={{
          scale: { duration: 0.4, ease: 'easeOut' },
          opacity: { duration: 0.4 },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="flex items-center justify-center w-24 h-24 rounded-3xl mb-6
          bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100
          dark:from-indigo-950 dark:via-purple-950 dark:to-blue-950
          shadow-md shadow-indigo-200/40 dark:shadow-indigo-950/30"
      >
        <span className="text-5xl" role="img" aria-hidden="true">
          {icon}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className={`text-2xl font-bold mb-3 ${TEXT_CLASSES.primary}`}
      >
        {title}
      </motion.h3>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          className={`max-w-md text-sm sm:text-base leading-relaxed mb-7 ${TEXT_CLASSES.secondary}`}
        >
          {description}
        </motion.p>
      )}

      {/* Action Button */}
      {action && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={action.onClick}
          className={`${BUTTON_CLASSES.primary} shadow-md hover:shadow-lg
            transition-shadow duration-300
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-indigo-500 focus-visible:ring-offset-2`}
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}
