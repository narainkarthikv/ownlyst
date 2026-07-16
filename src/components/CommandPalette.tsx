/**
 * CommandPalette Component - Spotlight-style Quick Actions Interface
 *
 * Keyboard-driven command palette for quick access to app actions.
 * Features:
 * - Ctrl/Cmd+K to open/close
 * - Fuzzy search with real-time filtering
 * - Quick note creation with different templates
 * - View switching
 * - Status and priority filters
 * - Keyboard navigation (up/down arrows, Enter to execute)
 * - Visual action categories and keyboard shortcuts
 */

import { useState, useEffect, useCallback, useMemo, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  StickyNote,
  Table,
  LayoutDashboard,
  Baseline as Timeline,
  CheckSquare,
  AlertCircle,
  Flag,
  ListTodo,
  CircleDot,
  CheckCircle,
  Zap,
  Hash,
  Command,
} from 'lucide-react';
import type { NoteFormData, NotePriority, NoteStatus } from '../models/note.model';
import type { DefaultView } from '../models/user-preferences.model';

// ============= Command Types =============

type CommandCategory = 'create' | 'view' | 'filter' | 'quick';

interface Command {
  id: string;
  label: string;
  description?: string;
  category: CommandCategory;
  icon: typeof Plus;
  shortcut?: string;
  action: () => void;
  keywords?: string[];
}

// ============= Props =============

interface CommandPaletteProps {
  onCreateNote: (data: NoteFormData) => void;
  onChangeView?: (view: DefaultView) => void;
  onFilterByStatus?: (status: NoteStatus | null) => void;
  onFilterByPriority?: (priority: NotePriority | null) => void;
}

// ============= Component =============

export default function CommandPalette({
  onCreateNote,
  onChangeView,
  onFilterByStatus,
  onFilterByPriority,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // ============= Commands Definition =============

  const commands: Command[] = useMemo(() => {
    const closeAndResetFn = () => {
      setIsOpen(false);
      setSearchQuery('');
      setSelectedIndex(0);
    };

    return [
      // Quick Actions
      {
        id: 'quick-note',
        label: 'Quick Note',
        description: 'Create a new quick note',
        category: 'quick',
        icon: Zap,
        shortcut: 'Q',
        keywords: ['new', 'create', 'quick', 'note'],
        action: () => {
          onCreateNote({
            title: 'Quick note',
            content: '',
            priority: 'low',
            status: 'todo',
            isPinned: false,
          });
          closeAndResetFn();
        },
      },
      {
        id: 'task',
        label: 'New Task',
        description: 'Create a new task with medium priority',
        category: 'create',
        icon: CheckSquare,
        shortcut: 'T',
        keywords: ['new', 'create', 'task', 'todo'],
        action: () => {
          onCreateNote({
            title: 'New task',
            content: '',
            priority: 'medium',
            status: 'todo',
            isPinned: false,
          });
          closeAndResetFn();
        },
      },
      {
        id: 'high-priority',
        label: 'High Priority Note',
        description: 'Create a high priority note',
        category: 'create',
        icon: AlertCircle,
        shortcut: 'H',
        keywords: ['urgent', 'important', 'high', 'priority', 'create'],
        action: () => {
          onCreateNote({
            title: 'High priority task',
            content: '',
            priority: 'high',
            status: 'todo',
            isPinned: false,
          });
          closeAndResetFn();
        },
      },
      {
        id: 'note',
        label: 'New Note',
        description: 'Create a blank note',
        category: 'create',
        icon: Plus,
        keywords: ['new', 'blank', 'note', 'create'],
        action: () => {
          onCreateNote({
            title: 'New note',
            content: '',
            priority: 'low',
            status: 'todo',
            isPinned: false,
          });
          closeAndResetFn();
        },
      },

      // View Switching
      {
        id: 'view-notes',
        label: 'Notes View',
        description: 'Switch to grid view',
        category: 'view',
        icon: StickyNote,
        shortcut: '1',
        keywords: ['view', 'notes', 'grid', 'cards'],
        action: () => {
          onChangeView?.('notes');
          closeAndResetFn();
        },
      },
      {
        id: 'view-kanban',
        label: 'Kanban View',
        description: 'Switch to board view',
        category: 'view',
        icon: LayoutDashboard,
        shortcut: '2',
        keywords: ['view', 'kanban', 'board', 'columns'],
        action: () => {
          onChangeView?.('kanban');
          closeAndResetFn();
        },
      },
      {
        id: 'view-table',
        label: 'Table View',
        description: 'Switch to table view',
        category: 'view',
        icon: Table,
        shortcut: '3',
        keywords: ['view', 'table', 'list', 'rows'],
        action: () => {
          onChangeView?.('table');
          closeAndResetFn();
        },
      },
      {
        id: 'view-roadmap',
        label: 'Roadmap View',
        description: 'Switch to timeline view',
        category: 'view',
        icon: Timeline,
        shortcut: '4',
        keywords: ['view', 'roadmap', 'timeline', 'calendar'],
        action: () => {
          onChangeView?.('roadmap');
          closeAndResetFn();
        },
      },

      // Status Filters
      {
        id: 'filter-todo',
        label: 'Filter: To Do',
        description: 'Show only todo items',
        category: 'filter',
        icon: ListTodo,
        keywords: ['filter', 'todo', 'pending', 'status'],
        action: () => {
          onFilterByStatus?.('todo');
          closeAndResetFn();
        },
      },
      {
        id: 'filter-in-progress',
        label: 'Filter: In Progress',
        description: 'Show only in-progress items',
        category: 'filter',
        icon: CircleDot,
        keywords: ['filter', 'in progress', 'working', 'status'],
        action: () => {
          onFilterByStatus?.('in-progress');
          closeAndResetFn();
        },
      },
      {
        id: 'filter-done',
        label: 'Filter: Done',
        description: 'Show only completed items',
        category: 'filter',
        icon: CheckCircle,
        keywords: ['filter', 'done', 'complete', 'finished', 'status'],
        action: () => {
          onFilterByStatus?.('done');
          closeAndResetFn();
        },
      },

      // Priority Filters
      {
        id: 'filter-high',
        label: 'Filter: High Priority',
        description: 'Show only high priority items',
        category: 'filter',
        icon: Flag,
        keywords: ['filter', 'high', 'urgent', 'priority'],
        action: () => {
          onFilterByPriority?.('high');
          closeAndResetFn();
        },
      },
      {
        id: 'filter-medium',
        label: 'Filter: Medium Priority',
        description: 'Show only medium priority items',
        category: 'filter',
        icon: Hash,
        keywords: ['filter', 'medium', 'priority'],
        action: () => {
          onFilterByPriority?.('medium');
          closeAndResetFn();
        },
      },
      {
        id: 'filter-low',
        label: 'Filter: Low Priority',
        description: 'Show only low priority items',
        category: 'filter',
        icon: Hash,
        keywords: ['filter', 'low', 'priority'],
        action: () => {
          onFilterByPriority?.('low');
          closeAndResetFn();
        },
      },
    ];
  }, [onCreateNote, onChangeView, onFilterByStatus, onFilterByPriority]);

  // ============= Fuzzy Search =============

  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) return commands;

    const query = searchQuery.toLowerCase();
    return commands.filter((cmd) => {
      const searchText = [
        cmd.label,
        cmd.description || '',
        cmd.category,
        ...(cmd.keywords || []),
      ].join(' ').toLowerCase();

      return searchText.includes(query);
    });
  }, [commands, searchQuery]);

  // ============= Keyboard Shortcuts =============

  // Global Ctrl/Cmd+K to open palette
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Reset selection when filtered commands change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  // ============= Handlers =============

  const closeAndReset = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
    setSelectedIndex(0);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        closeAndReset();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          selected.action();
        }
      }
    },
    [filteredCommands, selectedIndex, closeAndReset]
  );

  const handleCommandClick = useCallback((command: Command) => {
    command.action();
  }, []);

  // ============= Category Labels =============

  const categoryLabels: Record<CommandCategory, string> = {
    quick: 'Quick Actions',
    create: 'Create',
    view: 'Switch View',
    filter: 'Filter',
  };

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: Partial<Record<CommandCategory, Command[]>> = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.category]) {
        groups[cmd.category] = [];
      }
      groups[cmd.category]!.push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  // ============= Render =============

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className='fixed right-6 bottom-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:scale-105 transition-transform ring-1 ring-white/10 group'
        aria-label='Open command palette'>
        <Command size={22} className='group-hover:rotate-12 transition-transform' />
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAndReset}
              className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50'
            />

            {/* Palette */}
            <div className='fixed inset-0 z-50 flex items-start justify-center pt-[15vh] pointer-events-none'>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className='w-full max-w-2xl mx-4 pointer-events-auto'>
                <div className='bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden'>
                  {/* Search Input */}
                  <div className='flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-slate-700'>
                  <Search size={20} className='text-gray-400 dark:text-slate-500' />
                  <input
                    type='text'
                    placeholder='Type a command or search...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className='flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-base'
                  />
                  <kbd className='hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400 rounded border border-gray-300 dark:border-slate-600'>
                    ESC
                  </kbd>
                </div>

                {/* Commands List */}
                <div className='max-h-[60vh] overflow-y-auto'>
                  {filteredCommands.length === 0 ? (
                    <div className='px-4 py-8 text-center text-gray-500 dark:text-slate-400'>
                      No commands found
                    </div>
                  ) : (
                    <div className='py-2'>
                      {Object.entries(groupedCommands).map(([category, cmds]) => (
                        <div key={category} className='mb-2 last:mb-0'>
                          <div className='px-4 py-1.5 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider'>
                            {categoryLabels[category as CommandCategory]}
                          </div>
                          {cmds?.map((command) => {
                            const globalIndex = filteredCommands.indexOf(command);
                            const isSelected = globalIndex === selectedIndex;
                            const Icon = command.icon;

                            return (
                              <button
                                key={command.id}
                                onClick={() => handleCommandClick(command)}
                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                  isSelected
                                    ? 'bg-blue-50 dark:bg-slate-700'
                                    : 'hover:bg-gray-50 dark:hover:bg-slate-750'
                                }`}>
                                <div
                                  className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                                    isSelected
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400'
                                  }`}>
                                  <Icon size={16} />
                                </div>
                                <div className='flex-1 min-w-0'>
                                  <div className='text-sm font-medium text-gray-900 dark:text-white'>
                                    {command.label}
                                  </div>
                                  {command.description && (
                                    <div className='text-xs text-gray-500 dark:text-slate-400 truncate'>
                                      {command.description}
                                    </div>
                                  )}
                                </div>
                                {command.shortcut && (
                                  <kbd className='hidden sm:inline-flex items-center justify-center min-w-[1.5rem] px-1.5 py-0.5 text-xs font-mono bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400 rounded border border-gray-300 dark:border-slate-600'>
                                    {command.shortcut}
                                  </kbd>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className='px-4 py-2 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-750'>
                  <div className='flex items-center justify-between text-xs text-gray-500 dark:text-slate-400'>
                    <div className='flex items-center gap-4'>
                      <span className='flex items-center gap-1'>
                        <kbd className='px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-gray-300 dark:border-slate-600'>
                          ↑↓
                        </kbd>
                        Navigate
                      </span>
                      <span className='flex items-center gap-1'>
                        <kbd className='px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-gray-300 dark:border-slate-600'>
                          ↵
                        </kbd>
                        Select
                      </span>
                    </div>
                    <span className='hidden sm:block'>
                      Ctrl/Cmd + K to toggle
                    </span>
                  </div>
                </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
