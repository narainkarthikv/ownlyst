import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StickyNote, Table, LayoutDashboard, Baseline as Timeline, ArrowLeft } from 'lucide-react';
import sampleNotesData from '../data/sampleNotes.json';
import NotesView from '../components/NotesView';
import KanbanView from '../components/KanbanView';
import TableView from '../components/TableView';
import RoadmapView from '../components/RoadmapView';
import { Note } from '../types/Note';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import { useMemo } from 'react';

const views = [
  { id: 'notes', name: 'Notes', icon: StickyNote, color: 'text-green-600' },
  { id: 'kanban', name: 'Boards', icon: LayoutDashboard, color: 'text-blue-600'},
  { id: 'table', name: 'Table', icon: Table, color: 'text-cyan-600' },
  { id: 'roadmap', name: 'Roadmap', icon: Timeline, color: 'text-orange-600' },
];

export default function NotesApp() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('notes');
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useLocalStorage<Note[]>('sticky-notes', []);

  // Process notes to ensure dates are Date objects
  const processedNotes = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      createdAt:
        note.createdAt instanceof Date
          ? note.createdAt
          : new Date(note.createdAt),
      dueDate: note.dueDate
        ? note.dueDate instanceof Date
          ? note.dueDate
          : new Date(note.dueDate)
        : undefined,
    }));
  }, [notes]);

  // Initialize with sample data
  useEffect(() => {
    if (notes.length > 0) return; // Don't override existing data

    const sampleNotes: Note[] = sampleNotesData.notes.map((note) => ({
      ...note,
      color: note.color as Note['color'],
      status: note.status as Note['status'],
      priority: note.priority as Note['priority'],
      createdAt: new Date(note.createdAt),
      dueDate: note.dueDate ? new Date(note.dueDate) : undefined,
    }));

    setNotes(sampleNotes);
  }, [notes.length, setNotes]);

  const addNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setNotes((prev: Note[]) => [newNote, ...prev]);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes((prev: Note[]) =>
      prev.map((note) => (note.id === id ? { ...note, ...updates } : note))
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev: Note[]) => prev.filter((note) => note.id !== id));
  };

  const filteredNotes = processedNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderView = () => {
    const props = {
      notes: filteredNotes,
      onAddNote: addNote,
      onUpdateNote: updateNote,
      onDeleteNote: deleteNote,
    };

    switch (activeView) {
      case 'notes':
        return <NotesView {...props} />;
      case 'kanban':
        return <KanbanView {...props} />;
      case 'table':
        return <TableView {...props} />;
      case 'roadmap':
        return <RoadmapView {...props} />;
      default:
        return <NotesView {...props} />;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-6 py-3 sm:py-4'>
        <div className='flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0'>
          <div className='flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-start'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className='flex items-center space-x-1 sm:space-x-2 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200 transition-colors'>
              <ArrowLeft size={28} />
              <span className='hidden sm:inline'></span>
            </motion.button>
            <div className='flex items-center space-x-2 sm:space-x-3'>
              <Logo size={28} className='sm:w-8' />
              <h1 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-white'>
                Sticky Memo
              </h1>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto'>
            
            {/* View Switcher */}
            <div className='flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 w-full sm:w-auto justify-between sm:justify-start'>
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <motion.button
                    key={view.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveView(view.id)}
                    className={`flex items-center justify-center sm:justify-start space-x-0 sm:space-x-2 px-3 py-2 rounded-md transition-all flex-1 sm:flex-initial ${
                      activeView === view.id
                        ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}>
                    <Icon
                      size={16}
                      className={activeView === view.id ? view.color : ''}
                    />
                    <span className='hidden sm:inline text-sm font-medium'>
                      {view.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className='p-6 dark:bg-gray-900'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
