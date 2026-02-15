import { motion } from 'framer-motion';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

/**
 * Generic skeleton loader component
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = 'w-full',
  height = 'h-4',
  className = '',
}) => (
  <motion.div
    className={`${width} ${height} bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  />
);

/**
 * Note card skeleton for loading state
 */
export const NoteCardSkeleton: React.FC = () => (
  <motion.div
    className='p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-3'
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity }}>
    <Skeleton width='w-3/4' height='h-5' />
    <Skeleton width='w-full' height='h-12' className='my-2' />
    <div className='space-y-2'>
      <Skeleton width='w-1/2' height='h-3' />
      <Skeleton width='w-2/3' height='h-3' />
    </div>
  </motion.div>
);

/**
 * Table row skeleton for loading state
 */
export const TableRowSkeleton: React.FC = () => (
  <tr className='border-b border-gray-200 dark:border-gray-700'>
    {[...Array(5)].map((_, i) => (
      <td key={i} className='px-4 py-3'>
        <Skeleton width='w-full' height='h-4' />
      </td>
    ))}
  </tr>
);

/**
 * Kanban card skeleton for loading state
 */
export const KanbanCardSkeleton: React.FC = () => (
  <motion.div
    className='p-3 rounded-lg bg-white dark:bg-gray-700 space-y-2 h-24'
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity }}>
    <Skeleton width='w-3/4' height='h-4' />
    <Skeleton width='w-full' height='h-3' />
    <Skeleton width='w-2/3' height='h-3' />
  </motion.div>
);

/**
 * Modal content skeleton for loading state
 */
export const ModalSkeleton: React.FC = () => (
  <motion.div
    className='space-y-6'
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity }}>
    <Skeleton width='w-1/2' height='h-6' />
    <Skeleton width='w-full' height='h-10' />
    <Skeleton width='w-full' height='h-24' />
    <div className='grid grid-cols-2 gap-4'>
      <Skeleton width='w-full' height='h-10' />
      <Skeleton width='w-full' height='h-10' />
    </div>
  </motion.div>
);

/**
 * Grid of note card skeletons
 */
export const NoteGridSkeleton: React.FC<{ count?: number }> = ({
  count = 6,
}) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
    {[...Array(count)].map((_, i) => (
      <NoteCardSkeleton key={i} />
    ))}
  </div>
);

/**
 * Kanban column skeleton for loading state
 */
export const KanbanColumnSkeleton: React.FC = () => (
  <div className='space-y-3'>
    <Skeleton width='w-1/3' height='h-6' className='mb-4' />
    {[...Array(3)].map((_, i) => (
      <KanbanCardSkeleton key={i} />
    ))}
  </div>
);

/**
 * List skeleton for loading state
 */
export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <div className='space-y-3'>
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className='p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}>
        <Skeleton width='w-full' height='h-4' className='mb-2' />
        <Skeleton width='w-3/4' height='h-3' />
      </motion.div>
    ))}
  </div>
);
