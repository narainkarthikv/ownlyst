/**
 * FilterBar Component - Unified Search, Sort, and Filter Controls
 *
 * Reusable component providing consistent filtering experience across all views.
 * Features:
 * - Real-time search with debouncing
 * - Sort by multiple criteria
 * - Filter by status and priority
 * - Responsive design
 * - Keyboard shortcuts
 */

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import type { Note } from '../../models/note.model';

export type SortOption =
  | 'date-desc'
  | 'date-asc'
  | 'title-asc'
  | 'title-desc'
  | 'priority-high'
  | 'priority-low'
  | 'status';

export type FilterStatus = 'all' | Note['status'];
export type FilterPriority = 'all' | Note['priority'];

export interface FilterState {
  search: string;
  sort: SortOption;
  status: FilterStatus;
  priority: FilterPriority;
  showPinnedOnly: boolean;
}

interface FilterBarProps {
  /** Current filter state */
  filters: FilterState;
  /** Callback when filters change */
  onFilterChange: (filters: FilterState) => void;
  /** Total number of items */
  totalCount?: number;
  /** Filtered count */
  filteredCount?: number;
  /** Placeholder for search input */
  searchPlaceholder?: string;
  /** Additional action buttons rendered in the same row as Sort/Filter */
  actions?: React.ReactNode;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'title-asc', label: 'Title A-Z' },
  { value: 'title-desc', label: 'Title Z-A' },
  { value: 'priority-high', label: 'High Priority' },
  { value: 'priority-low', label: 'Low Priority' },
  { value: 'status', label: 'By Status' },
];

const statusOptions: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'todo', label: 'To-Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const priorityOptions: { value: FilterPriority; label: string }[] = [
  { value: 'all', label: 'All Priority' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export default function FilterBar({
  filters,
  onFilterChange,
  totalCount = 0,
  filteredCount = 0,
  searchPlaceholder = 'Search notes...',
  actions,
}: FilterBarProps) {
  const [localSearch, setLocalSearch] = useState(filters.search);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const debouncedSearch = useDebounce(localSearch, undefined, { delay: 300 });

  // Update parent when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onFilterChange({ ...filters, search: debouncedSearch });
    }
  }, [debouncedSearch, filters, onFilterChange]);

  const handleSearchChange = useCallback((value: string) => {
    setLocalSearch(value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setLocalSearch('');
  }, []);

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      onFilterChange({ ...filters, sort });
      setShowSort(false);
    },
    [filters, onFilterChange]
  );

  const handleStatusChange = useCallback(
    (status: FilterStatus) => {
      onFilterChange({ ...filters, status });
    },
    [filters, onFilterChange]
  );

  const handlePriorityChange = useCallback(
    (priority: FilterPriority) => {
      onFilterChange({ ...filters, priority });
    },
    [filters, onFilterChange]
  );

  const handleTogglePinned = useCallback(() => {
    onFilterChange({ ...filters, showPinnedOnly: !filters.showPinnedOnly });
  }, [filters, onFilterChange]);

  const activeFiltersCount =
    (filters.status !== 'all' ? 1 : 0) +
    (filters.priority !== 'all' ? 1 : 0) +
    (filters.showPinnedOnly ? 1 : 0);

  const handleClearFilters = useCallback(() => {
    onFilterChange({
      ...filters,
      status: 'all',
      priority: 'all',
      showPinnedOnly: false,
    });
    setShowFilters(false);
  }, [filters, onFilterChange]);

  return (
    <div className='space-y-3'>
      {/* Main Search and Controls Bar */}
      <div className='flex flex-col sm:flex-row gap-3'>
        {/* Search Input */}
        <div className='relative flex-1'>
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500'
            size={20}
          />
          <input
            type='text'
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className='w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white'
          />
          {localSearch && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClearSearch}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'>
              <X size={16} />
            </motion.button>
          )}
        </div>

        {/* Control Buttons */}
        <div className='flex gap-2'>
          {/* Sort Button */}
          <div className='relative'>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSort(!showSort)}
              className='px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap'>
              <ArrowUpDown size={16} />
              <span className='hidden sm:inline'>Sort</span>
            </motion.button>

            {/* Sort Dropdown */}
            <AnimatePresence>
              {showSort && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowSort(false)}
                    className='fixed inset-0 z-40'
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className='absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg z-50 py-2'>
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className='w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between text-gray-700 dark:text-gray-300'>
                        {option.label}
                        {filters.sort === option.value && (
                          <Check size={16} className='text-blue-600' />
                        )}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Filter Button */}
          <div className='relative'>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2.5 border rounded-xl transition-all flex items-center gap-2 text-sm font-medium whitespace-nowrap ${
                activeFiltersCount > 0
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}>
              <SlidersHorizontal size={16} />
              <span className='hidden sm:inline'>Filter</span>
              {activeFiltersCount > 0 && (
                <span className='ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-xs'>
                  {activeFiltersCount}
                </span>
              )}
            </motion.button>

            {/* Filter Dropdown */}
            <AnimatePresence>
              {showFilters && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowFilters(false)}
                    className='fixed inset-0 z-40'
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className='absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg z-50 p-4 space-y-4'>
                    {/* Status Filter */}
                    <div>
                      <label className='block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2'>
                        Status
                      </label>
                      <div className='grid grid-cols-2 gap-2'>
                        {statusOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleStatusChange(option.value)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              filters.status === option.value
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                            }`}>
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Priority Filter */}
                    <div>
                      <label className='block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2'>
                        Priority
                      </label>
                      <div className='grid grid-cols-2 gap-2'>
                        {priorityOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handlePriorityChange(option.value)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              filters.priority === option.value
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                            }`}>
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pinned Only Toggle */}
                    <div>
                      <button
                        onClick={handleTogglePinned}
                        className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                          filters.showPinnedOnly
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                        }`}>
                        <span>Pinned Only</span>
                        {filters.showPinnedOnly && <Check size={16} />}
                      </button>
                    </div>

                    {/* Clear Filters */}
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={handleClearFilters}
                        className='w-full px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-all'>
                        Clear All Filters
                      </button>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Injected action buttons (e.g. New Note, Delete) */}
          {actions && <>{actions}</>}
        </div>
      </div>

      {/* Results Count */}
      {totalCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
          <span>
            Showing {filteredCount} of {totalCount} note
            {totalCount !== 1 ? 's' : ''}
          </span>
          {(filters.search || activeFiltersCount > 0) && (
            <span className='text-xs'>
              {activeFiltersCount > 0 &&
                `${activeFiltersCount} filter${activeFiltersCount !== 1 ? 's' : ''} active`}
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
}
