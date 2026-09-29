/**
 * CalendarView Component - Monthly Calendar View for Ownlyst
 *
 * Responsibilities:
 * - Render responsive monthly calendar (Sunday - Saturday)
 * - Support month navigation (Prev, Next, Today, Month/Year display)
 * - Map existing notes to their associated dates (Due Date or Created Date)
 * - Ensure undated notes are accessible and never silently discarded
 * - Support note interactions: click to open existing NoteModal for view/edit, quick-add on date cells
 * - Full accessibility: semantic HTML, ARIA attributes, roving tabindex keyboard navigation, screen reader announcements
 * - Responsive layout: desktop grid, tablet adaptability, mobile optimized with selected date details
 * - Zero duplicated modals or state management; fully integrated with existing NoteModal and NotesProvider
 */

import { useState, useMemo, useCallback, useRef, useEffect, memo, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Pin,
  Edit3,
  Trash2,
  CalendarOff,
  Clock,
  CheckCircle,
  Circle,
  Tag,
  X,
} from 'lucide-react';
import type { Note } from '../../models/note.model';
import NoteModal from '../../components/NoteModal';
import EmptyState from '../../components/shared/EmptyState';
import FilterBar, { type FilterState } from '../../components/shared/FilterBar';
import { applyFilters, getDefaultFilters } from '../../utils/noteFilters';
import {
  PRIORITY_CARD_CLASSES,
  PRIORITY_INDICATOR_CLASSES,
  PRIORITY_BADGE_COLORS,
  STATUS_BADGE_COLORS,
} from '../../constants/colors';
import { useNotesContext } from '../../controllers/NotesProvider';
import {
  getCalendarGridDays,
  formatDateForInput,
  formatDateFull,
  isSameDay,
  isOverdue,
  addMonths,
  type CalendarDay,
} from '../../utils/dates';

export interface CalendarViewProps {
  /** Notes list passed from parent or controller */
  notes?: Note[];
  /** Callback to add note */
  onAddNote?: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  /** Callback to update note */
  onUpdateNote?: (id: string, updates: Partial<Note>) => void;
  /** Callback to delete note */
  onDeleteNote?: (id: string) => void;
}

const WEEKDAYS = [
  { short: 'Sun', full: 'Sunday', narrow: 'S' },
  { short: 'Mon', full: 'Monday', narrow: 'M' },
  { short: 'Tue', full: 'Tuesday', narrow: 'T' },
  { short: 'Wed', full: 'Wednesday', narrow: 'W' },
  { short: 'Thu', full: 'Thursday', narrow: 'T' },
  { short: 'Fri', full: 'Friday', narrow: 'F' },
  { short: 'Sat', full: 'Saturday', narrow: 'S' },
];

const statusIcons: Record<Note['status'], typeof Circle> = {
  todo: Circle,
  'in-progress': Clock,
  done: CheckCircle,
};

export default memo(function CalendarView({
  notes: propsNotes,
  onAddNote: propsOnAddNote,
  onUpdateNote: propsOnUpdateNote,
  onDeleteNote: propsOnDeleteNote,
}: CalendarViewProps) {
  const context = useNotesContext();
  const notes = propsNotes ?? context.notes;
  const onAddNote = propsOnAddNote ?? context.createNote;
  const onUpdateNote = propsOnUpdateNote ?? context.updateNote;
  const onDeleteNote = propsOnDeleteNote ?? context.deleteNote;

  // View state
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [focusedDateString, setFocusedDateString] = useState<string>(() =>
    formatDateForInput(new Date())
  );
  const [dateMode, setDateMode] = useState<'all' | 'dueDate' | 'createdAt'>('all');
  const [showUndatedDrawer, setShowUndatedDrawer] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterState>(getDefaultFilters());

  // Note Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [modalDefaultDueDate, setModalDefaultDueDate] = useState<Date | undefined>(undefined);

  // References
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter notes using FilterBar criteria
  const filteredNotes = useMemo(() => {
    return applyFilters(notes, filters);
  }, [notes, filters]);

  // Group notes by target date and collect undated notes
  const { notesByDate, undatedNotes } = useMemo(() => {
    const byDate: Record<string, Note[]> = {};
    const undated: Note[] = [];

    filteredNotes.forEach((note) => {
      let targetDate: Date | string | undefined;

      if (dateMode === 'dueDate') {
        targetDate = note.dueDate;
        if (!targetDate) {
          undated.push(note);
          return;
        }
      } else if (dateMode === 'createdAt') {
        targetDate = note.createdAt;
      } else {
        // 'all': use dueDate if present, otherwise fallback to createdAt
        targetDate = note.dueDate || note.createdAt;
      }

      if (!targetDate) {
        undated.push(note);
        return;
      }

      const key = formatDateForInput(targetDate);
      if (!key) {
        undated.push(note);
        return;
      }
      if (!byDate[key]) {
        byDate[key] = [];
      }
      byDate[key].push(note);
    });

    // Sort items within each day: pinned first, then by priority
    Object.keys(byDate).forEach((key) => {
      byDate[key].sort((a, b) => {
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
        const prioOrder = { high: 0, medium: 1, low: 2 };
        return prioOrder[a.priority] - prioOrder[b.priority];
      });
    });

    return { notesByDate: byDate, undatedNotes: undated };
  }, [filteredNotes, dateMode]);

  // Calendar days grid calculation
  const calendarDays = useMemo(() => {
    return getCalendarGridDays(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  // Group calendar days into week rows (7 days per row) for valid ARIA grid hierarchy
  const weeks = useMemo(() => {
    const rows: CalendarDay[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      rows.push(calendarDays.slice(i, i + 7));
    }
    return rows;
  }, [calendarDays]);

  // Sync focused date string when month changes if needed
  useEffect(() => {
    const currentMonthKey = formatDateForInput(selectedDate);
    setFocusedDateString(currentMonthKey);
  }, [selectedDate]);

  // Navigation handlers
  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prev) => addMonths(prev, -1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => addMonths(prev, 1));
  }, []);

  const handleToday = useCallback(() => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
    setFocusedDateString(formatDateForInput(now));
  }, []);

  // Note creation / edit handlers
  const handleAddNoteOnDate = useCallback((date: Date) => {
    setEditingNote(null);
    setModalDefaultDueDate(date);
    setIsModalOpen(true);
  }, []);

  const handleAddNewGeneral = useCallback(() => {
    setEditingNote(null);
    setModalDefaultDueDate(selectedDate || new Date());
    setIsModalOpen(true);
  }, [selectedDate]);

  const handleEditNote = useCallback((note: Note) => {
    setEditingNote(note);
    setModalDefaultDueDate(note.dueDate ? new Date(note.dueDate) : undefined);
    setIsModalOpen(true);
  }, []);

  const handleTogglePin = useCallback(
    (e: React.MouseEvent, note: Note) => {
      e.stopPropagation();
      onUpdateNote(note.id, { isPinned: !note.isPinned });
    },
    [onUpdateNote]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent, noteId: string) => {
      e.stopPropagation();
      onDeleteNote(noteId);
    },
    [onDeleteNote]
  );

  // Month header label
  const monthYearLabel = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(currentDate);
  }, [currentDate]);

  // Selected date notes
  const selectedDateKey = useMemo(() => formatDateForInput(selectedDate), [selectedDate]);
  const notesOnSelectedDate = useMemo(
    () => notesByDate[selectedDateKey] || [],
    [notesByDate, selectedDateKey]
  );

  // Keyboard navigation within the calendar grid
  const handleGridKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>, day: CalendarDay) => {
      let nextDate: Date | null = null;
      const cur = new Date(day.date);

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          nextDate = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextDate = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          nextDate = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() - 7);
          break;
        case 'ArrowDown':
          e.preventDefault();
          nextDate = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 7);
          break;
        case 'PageUp':
          e.preventDefault();
          nextDate = addMonths(cur, -1);
          break;
        case 'PageDown':
          e.preventDefault();
          nextDate = addMonths(cur, 1);
          break;
        case 'Home':
          e.preventDefault();
          nextDate = new Date(cur.getFullYear(), cur.getMonth(), 1);
          break;
        case 'End':
          e.preventDefault();
          nextDate = new Date(cur.getFullYear(), cur.getMonth() + 1, 0);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          setSelectedDate(day.date);
          setFocusedDateString(day.dateString);
          return;
        default:
          return;
      }

      if (nextDate) {
        if (nextDate.getMonth() !== currentDate.getMonth()) {
          setCurrentDate(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
        }
        setSelectedDate(nextDate);
        setFocusedDateString(formatDateForInput(nextDate));

        // Focus element after render
        setTimeout(() => {
          const nextKey = formatDateForInput(nextDate);
          const cell = gridRef.current?.querySelector<HTMLElement>(`[data-date="${nextKey}"]`);
          cell?.focus();
        }, 0);
      }
    },
    [currentDate]
  );

  return (
    <div className='space-y-4 p-2 sm:p-4'>
      {/* Top FilterBar and New Note action */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        totalCount={notes.length}
        filteredCount={filteredNotes.length}
        searchPlaceholder='Search notes in Calendar...'
        actions={
          <motion.button
            type='button'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddNewGeneral}
            aria-label='Create a new note'
            className='inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium gap-2 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 outline-none shadow-sm whitespace-nowrap'>
            <Plus className='h-5 w-5' aria-hidden='true' />
            <span>New Note</span>
          </motion.button>
        }
      />

      {/* Empty State when no notes exist in app */}
      {notes.length === 0 ? (
        <EmptyState
          icon={<CalendarIcon className='h-16 w-16' />}
          title='No notes yet'
          description='Create your first note to see it displayed on the calendar'
          action={{
            label: 'Create Note',
            onClick: handleAddNewGeneral,
          }}
        />
      ) : filteredNotes.length === 0 ? (
        <EmptyState
          icon={<CalendarIcon className='h-16 w-16' />}
          title='No matching notes'
          description='Try adjusting your filters or search terms to see calendar items'
          action={{
            label: 'Clear Filters',
            onClick: () => setFilters(getDefaultFilters()),
          }}
        />
      ) : (
        <div className='space-y-4'>
          {/* Calendar Controls Bar */}
          <div className='bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4'>
            {/* Month Navigation */}
            <div className='flex items-center justify-between sm:justify-start space-x-2 sm:space-x-4'>
              <div className='flex items-center space-x-1'>
                <motion.button
                  type='button'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevMonth}
                  aria-label='Previous month'
                  className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-300'>
                  <ChevronLeft size={20} aria-hidden='true' />
                </motion.button>

                <motion.button
                  type='button'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleToday}
                  aria-label='Go to current month'
                  className='px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center space-x-1.5'>
                  <CalendarIcon size={14} aria-hidden='true' />
                  <span>Today</span>
                </motion.button>

                <motion.button
                  type='button'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextMonth}
                  aria-label='Next month'
                  className='p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-300'>
                  <ChevronRight size={20} aria-hidden='true' />
                </motion.button>
              </div>

              {/* Month/Year Title with screen reader announcement */}
              <h2
                aria-live='polite'
                aria-atomic='true'
                className='text-lg sm:text-2xl font-bold text-gray-900 dark:text-white min-w-[160px] sm:min-w-[200px] text-center'>
                {monthYearLabel}
              </h2>
            </div>

            {/* Date Mode and Undated Notes Access */}
            <div className='flex items-center flex-wrap gap-2 justify-end'>
              {/* Date Mode Selector */}
              <div
                className='inline-flex rounded-lg p-1 bg-gray-100 dark:bg-slate-700'
                role='group'
                aria-label='Calendar date mapping'>
                <button
                  type='button'
                  onClick={() => setDateMode('all')}
                  aria-pressed={dateMode === 'all'}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    dateMode === 'all'
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}>
                  All Dates
                </button>
                <button
                  type='button'
                  onClick={() => setDateMode('dueDate')}
                  aria-pressed={dateMode === 'dueDate'}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    dateMode === 'dueDate'
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}>
                  Due Date
                </button>
                <button
                  type='button'
                  onClick={() => setDateMode('createdAt')}
                  aria-pressed={dateMode === 'createdAt'}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    dateMode === 'createdAt'
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}>
                  Created Date
                </button>
              </div>

              {/* Undated Notes Button if any exist in Due Date mode */}
              {dateMode === 'dueDate' && undatedNotes.length > 0 && (
                <button
                  type='button'
                  onClick={() => setShowUndatedDrawer((prev) => !prev)}
                  aria-expanded={showUndatedDrawer}
                  aria-label={`View ${undatedNotes.length} undated notes`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    showUndatedDrawer
                      ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-750'
                  }`}>
                  <CalendarOff size={14} aria-hidden='true' />
                  <span>Undated ({undatedNotes.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* Undated Notes Drawer/Banner when expanded */}
          <AnimatePresence>
            {showUndatedDrawer && dateMode === 'dueDate' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className='overflow-hidden bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4'>
                <div className='flex items-center justify-between mb-3'>
                  <div className='flex items-center gap-2'>
                    <CalendarOff className='text-amber-600 dark:text-amber-400' size={18} />
                    <h3 className='text-sm font-semibold text-amber-900 dark:text-amber-200'>
                      Notes without Due Dates ({undatedNotes.length})
                    </h3>
                  </div>
                  <button
                    type='button'
                    onClick={() => setShowUndatedDrawer(false)}
                    aria-label='Close undated notes banner'
                    className='p-1 rounded-lg text-amber-700 dark:text-amber-400 hover:bg-amber-200/50 dark:hover:bg-amber-900/40 transition-colors'>
                    <X size={16} />
                  </button>
                </div>
                <p className='text-xs text-amber-700 dark:text-amber-400 mb-3'>
                  These notes don't have a deadline yet. Click any note to set a due date or view details.
                </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5'>
                  {undatedNotes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => handleEditNote(note)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleEditNote(note);
                        }
                      }}
                      role='button'
                      tabIndex={0}
                      aria-label={`${note.title}, priority ${note.priority}, status ${note.status}`}
                      className='bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-amber-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 shadow-sm cursor-pointer transition-all flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-blue-500'>
                      <div className='min-w-0 flex-1 pr-2'>
                        <div className='flex items-center gap-1.5'>
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${PRIORITY_INDICATOR_CLASSES[note.priority]}`}
                            aria-hidden='true'
                          />
                          <p className='text-xs font-semibold text-gray-900 dark:text-gray-100 truncate'>
                            {note.title}
                          </p>
                        </div>
                        {note.content && (
                          <p className='text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5'>
                            {note.content}
                          </p>
                        )}
                      </div>
                      <span
                        className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${STATUS_BADGE_COLORS[note.status]}`}>
                        {note.status.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Monthly Calendar Grid Container */}
          <div
            ref={gridRef}
            role='grid'
            aria-label={monthYearLabel}
            className='bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden'>
            {/* Weekday Header Row */}
            <div
              role='row'
              className='grid grid-cols-7 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-center'>
              {WEEKDAYS.map((wd) => (
                <div
                  key={wd.full}
                  role='columnheader'
                  aria-label={wd.full}
                  className='py-2.5 px-1 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider'>
                  <span className='hidden sm:inline'>{wd.short}</span>
                  <span className='sm:hidden'>{wd.narrow}</span>
                </div>
              ))}
            </div>

            {/* Calendar Days Rows */}
            {weeks.map((week, weekIndex) => (
              <div
                key={`week-${weekIndex}`}
                role='row'
                className='grid grid-cols-7 divide-x divide-gray-200 dark:divide-slate-700 border-b last:border-b-0 border-gray-200 dark:border-slate-700'>
                {week.map((day) => {
                  const dayNotes = notesByDate[day.dateString] || [];
                  const isSelected = isSameDay(day.date, selectedDate);
                  const isFocused = day.dateString === focusedDateString;
                  const formattedFull = formatDateFull(day.date);
                  const notesCountText = `${dayNotes.length} note${dayNotes.length === 1 ? '' : 's'}`;

                  return (
                    <div
                      key={day.dateString}
                      data-date={day.dateString}
                      role='gridcell'
                      tabIndex={isFocused ? 0 : -1}
                      aria-label={`${formattedFull}, ${notesCountText}`}
                      aria-selected={isSelected}
                      {...(day.isToday ? { 'aria-current': 'date' } : {})}
                      onClick={() => {
                        setSelectedDate(day.date);
                        setFocusedDateString(day.dateString);
                      }}
                      onKeyDown={(e) => handleGridKeyDown(e, day)}
                      className={`min-h-[75px] sm:min-h-[110px] p-1.5 sm:p-2 flex flex-col justify-between transition-colors relative group outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset cursor-pointer ${
                        !day.isCurrentMonth
                          ? 'bg-gray-50/50 dark:bg-slate-900/30 text-gray-400 dark:text-gray-600'
                          : 'bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100'
                      } ${
                        isSelected
                          ? 'ring-2 ring-blue-500 dark:ring-blue-400 bg-blue-50/40 dark:bg-blue-900/10 z-10'
                          : 'hover:bg-gray-50 dark:hover:bg-slate-700/40'
                      }`}>
                      {/* Top Row: Date Number & Quick Add Button */}
                      <div className='flex items-center justify-between'>
                        <span
                          className={`text-xs sm:text-sm font-semibold inline-flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
                            day.isToday
                              ? 'bg-blue-600 text-white font-bold shadow-sm'
                              : isSelected
                                ? 'text-blue-600 dark:text-blue-400 font-bold'
                                : ''
                          }`}>
                          {day.dayOfMonth}
                        </span>

                        {/* Quick Add Note Button for this specific date */}
                        <button
                          type='button'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddNoteOnDate(day.date);
                          }}
                          aria-label={`Add note on ${formattedFull}`}
                          title={`Add note on ${formattedFull}`}
                          className='opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-md text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500'>
                          <Plus size={14} aria-hidden='true' />
                        </button>
                      </div>

                      {/* Middle: Notes Chips Container */}
                      <div className='flex-1 my-1 space-y-1 overflow-hidden'>
                        {/* Desktop / Tablet: Display up to 3 note chips */}
                        <div className='hidden sm:block space-y-1'>
                          {dayNotes.slice(0, 3).map((note) => (
                            <div
                              key={note.id}
                              role='button'
                              tabIndex={0}
                              aria-label={`${note.title}, ${note.priority} priority, ${note.status} status`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditNote(note);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  handleEditNote(note);
                                }
                              }}
                              className='flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-gray-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600 text-gray-900 dark:text-white truncate cursor-pointer transition-colors border-l-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
                              style={{
                                borderLeftColor:
                                  note.priority === 'high'
                                    ? '#EF4444'
                                    : note.priority === 'medium'
                                      ? '#F59E0B'
                                      : '#3B82F6',
                              }}>
                              {note.isPinned && (
                                <Pin
                                  size={9}
                                  className='text-blue-600 dark:text-blue-400 shrink-0'
                                  aria-hidden='true'
                                />
                              )}
                              <span className='truncate'>{note.title}</span>
                            </div>
                          ))}
                          {dayNotes.length > 3 && (
                            <div className='text-[10px] font-semibold text-gray-500 dark:text-gray-400 pl-1'>
                              +{dayNotes.length - 3} more
                            </div>
                          )}
                        </div>

                        {/* Mobile view: Dot indicators and badge count */}
                        <div className='sm:hidden flex items-center justify-center flex-wrap gap-1 mt-1'>
                          {dayNotes.slice(0, 4).map((note) => (
                            <span
                              key={note.id}
                              className={`w-1.5 h-1.5 rounded-full ${PRIORITY_INDICATOR_CLASSES[note.priority]}`}
                              aria-hidden='true'
                            />
                          ))}
                          {dayNotes.length > 4 && (
                            <span className='text-[9px] text-gray-500 font-bold'>
                              +{dayNotes.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Indicator row for count on mobile */}
                      <div className='sm:hidden text-center'>
                        {dayNotes.length > 0 && (
                          <span className='text-[9px] font-medium text-gray-500 dark:text-gray-400'>
                            {dayNotes.length}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Selected Date Details Panel (Responsive list of notes on selected date) */}
          <div className='bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 dark:border-slate-700'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 dark:border-slate-700 gap-3'>
              <div>
                <div className='flex items-center gap-2'>
                  <CalendarIcon className='text-blue-600 dark:text-blue-400' size={20} />
                  <h3 className='text-base sm:text-lg font-bold text-gray-900 dark:text-white'>
                    {formatDateFull(selectedDate)}
                  </h3>
                  {isSameDay(selectedDate, new Date()) && (
                    <span className='px-2 py-0.5 text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full'>
                      Today
                    </span>
                  )}
                </div>
                <p className='text-xs text-gray-600 dark:text-gray-300 mt-1 font-medium'>
                  {notesOnSelectedDate.length} note
                  {notesOnSelectedDate.length === 1 ? '' : 's'} on this date
                </p>
              </div>

              <motion.button
                type='button'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAddNoteOnDate(selectedDate)}
                className='inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <Plus size={16} aria-hidden='true' />
                <span>Add Note for this Day</span>
              </motion.button>
            </div>

            {/* Notes List for Selected Date */}
            <div className='mt-4'>
              {notesOnSelectedDate.length === 0 ? (
                <div className='py-8 text-center text-gray-500 dark:text-gray-400'>
                  <CalendarIcon size={32} className='mx-auto mb-2 opacity-40' aria-hidden='true' />
                  <p className='text-sm font-medium'>No notes scheduled for this date</p>
                  <p className='text-xs text-gray-400 dark:text-gray-500 mt-1'>
                    Click "Add Note for this Day" to create one
                  </p>
                </div>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                  {notesOnSelectedDate.map((note) => {
                    const StatusIcon = statusIcons[note.status] || Circle;
                    const overdue = isOverdue(note.dueDate);

                    return (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        role='article'
                        aria-label={`Note: ${note.title}`}
                        onClick={() => handleEditNote(note)}
                        className={`p-3.5 sm:p-4 rounded-xl border-l-4 transition-all cursor-pointer group shadow-sm flex flex-col justify-between ${PRIORITY_CARD_CLASSES[note.priority]} hover:border-blue-400 dark:hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500`}>
                        <div>
                          {/* Note Header: Pin & Title & Actions */}
                          <div className='flex items-start justify-between gap-3 mb-2'>
                            <div className='flex items-center gap-2 min-w-0'>
                              {note.isPinned && (
                                <Pin
                                  size={16}
                                  className='text-blue-600 dark:text-blue-400 shrink-0'
                                  aria-label='Pinned note'
                                />
                              )}
                              <h4 className='font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate'>
                                {note.title}
                              </h4>
                            </div>

                            {/* Card action buttons - Always visible on mobile/touch, revealed on hover/focus on desktop */}
                            <div className='flex items-center gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100 transition-opacity duration-150'>
                              <button
                                type='button'
                                onClick={(e) => handleTogglePin(e, note)}
                                aria-label={note.isPinned ? 'Unpin note' : 'Pin note'}
                                title={note.isPinned ? 'Unpin note' : 'Pin note'}
                                className={`p-1.5 rounded-lg border transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:opacity-100 ${
                                  note.isPinned
                                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-blue-600 dark:hover:text-blue-400'
                                }`}>
                                <Pin size={15} aria-hidden='true' />
                              </button>
                              <button
                                type='button'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditNote(note);
                                }}
                                aria-label='Edit note'
                                title='Edit note'
                                className='p-1.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:opacity-100'>
                                <Edit3 size={15} aria-hidden='true' />
                              </button>
                              <button
                                type='button'
                                onClick={(e) => handleDelete(e, note.id)}
                                aria-label='Delete note'
                                title='Delete note'
                                className='p-1.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/40 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:border-red-700 transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-red-500 focus:opacity-100'>
                                <Trash2 size={15} aria-hidden='true' />
                              </button>
                            </div>
                          </div>

                          {/* Content Preview */}
                          {note.content && (
                            <p className='text-xs sm:text-sm text-gray-800 dark:text-gray-200 line-clamp-3 mb-3 leading-relaxed'>
                              {note.content}
                            </p>
                          )}
                        </div>

                        {/* Badges Footer */}
                        <div className='flex items-center justify-between pt-2.5 border-t border-gray-200/80 dark:border-slate-700/80 text-xs mt-2'>
                          <div className='flex items-center gap-2'>
                            <StatusIcon size={13} className='text-gray-600 dark:text-gray-300' />
                            <span
                              className={`px-2 py-0.5 rounded font-semibold text-[10px] uppercase tracking-wide ${STATUS_BADGE_COLORS[note.status]}`}>
                              {note.status.replace('-', ' ')}
                            </span>
                            {note.dueDate && (
                              <span
                                className={`text-[11px] font-semibold ${overdue ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                {overdue ? 'Overdue' : 'Due'}
                              </span>
                            )}
                          </div>

                          <div className='flex items-center gap-2'>
                            {note.tags && note.tags.length > 0 && (
                              <span className='inline-flex items-center gap-1 text-[11px] font-medium text-gray-700 dark:text-gray-300'>
                                <Tag size={11} className='text-gray-500 dark:text-gray-400' />
                                {note.tags.length}
                              </span>
                            )}
                            <span
                              className={`px-2 py-0.5 rounded font-semibold text-[10px] uppercase tracking-wide ${PRIORITY_BADGE_COLORS[note.priority]}`}>
                              {note.priority}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Existing NoteModal for Create and Edit */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        note={editingNote}
        defaultDueDate={modalDefaultDueDate}
        onSave={(noteData) => {
          if (editingNote) {
            onUpdateNote(editingNote.id, noteData);
          } else {
            onAddNote(noteData);
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
});
