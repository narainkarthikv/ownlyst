/**
 * LoadingSpinner Component
 * Displays while data is loading
 * Used for async operations and view transitions
 */

import { motion } from 'framer-motion';
import { TEXT_CLASSES } from '../../constants/ui-colors';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export default function LoadingSpinner({
  size = 'md',
  label,
}: LoadingSpinnerProps) {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizeClasses[size]} border-2 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400 rounded-full`}
      />
      {label && (
        <p className={`text-sm ${TEXT_CLASSES.secondary}`}>{label}</p>
      )}
    </div>
  );
}
