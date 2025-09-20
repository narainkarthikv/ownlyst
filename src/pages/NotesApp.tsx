import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StickyNote, Table, LayoutDashboard, Baseline as Timeline, ArrowLeft, Search } from 'lucide-react';
import NotesView from '../components/NotesView';
import KanbanView from '../components/KanbanView';
import TableView from '../components/TableView';
import RoadmapView from '../components/RoadmapView';
import { Note } from '../types/Note';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Logo from '../components/Logo';
import { useMemo } from 'react';

const views = [
  { id: 'notes', name: 'Notes', icon: StickyNote, color: 'text-green-600' },
  { id: 'kanban', name: 'Boards', icon: LayoutDashboard, color: 'text-blue-600' },
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
    return notes.map(note => ({
      ...note,
      createdAt: note.createdAt instanceof Date ? note.createdAt : new Date(note.createdAt),
      dueDate: note.dueDate ? (note.dueDate instanceof Date ? note.dueDate : new Date(note.dueDate)) : undefined,
    }));
  }, [notes]);

  // Initialize with sample data
  useEffect(() => {
    if (notes.length > 0) return; // Don't override existing data
    
    const sampleNotes: Note[] = [
      {
        id: '1',
        title: 'Design Review',
        content: 'Review the new dashboard design with the team',
        color: 'emerald',
        status: 'todo',
        priority: 'low',
        isPinned: true,
        createdAt: new Date('2024-01-15'),
        dueDate: new Date('2024-01-20'),
      },
      {
        id: '2',
        title: 'Bug Fixes',
        content: 'Fix the login authentication issue',
        color: 'orange',
        status: 'in-progress',
        priority: 'medium',
        isPinned: false,
        createdAt: new Date('2024-01-14'),
        dueDate: new Date('2024-01-18'),
      },
      {
        id: '3',
        title: 'Client Meeting',
        content: 'Discuss project requirements and timeline',
        color: 'rose',
        status: 'todo',
        priority: 'high',
        isPinned: false,
        createdAt: new Date('2024-01-13'),
        dueDate: new Date('2024-01-17'),
      },
      {
        id: '4',
        title: 'Team Standup',
        content: 'Weekly team sync meeting',
        color: 'sky',
        status: 'done',
        priority: 'low',
        isPinned: false,
        createdAt: new Date('2024-01-12'),
        dueDate: new Date('2024-01-16'),
      },
      {
        id: '5',
        title: 'Code Review',
        content: 'Review pull requests from the development team',
        color: 'violet',
        status: 'in-progress',
        priority: 'medium',
        isPinned: true,
        createdAt: new Date('2024-01-11'),
        dueDate: new Date('2024-01-19'),
      },
    ];
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
    setNotes((prev: Note[]) => prev.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes((prev: Note[]) => prev.filter(note => note.id !== id));
  };

  const filteredNotes = processedNotes.filter(note =>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back</span>
            </motion.button>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Logo size={28} className="sm:w-8" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Sticky Memo</h1>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* View Switcher */}
            <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto justify-between sm:justify-start">
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
                        ? 'bg-white shadow-sm text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={16} className={activeView === view.id ? view.color : ''} />
                    <span className="hidden sm:inline text-sm font-medium">{view.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}