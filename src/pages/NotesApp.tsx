import { useEffect, useState, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  StickyNote,
  Table,
  LayoutDashboard,
  Baseline as Timeline,
  ArrowLeft,
} from 'lucide-react';
import { NotesView, KanbanView, TableView, RoadmapView } from '../views';
import ImportExport from '../components/ImportExport';
import CommandPalette from '../components/CommandPalette';
import { useNotesContext } from '../controllers/NotesProvider';
import Logo from '../components/Logo';
import UserPreferencesMenu from '../components/UserPreferencesMenu';
import { ThemeToggle } from '../theme';
import { HEADER_CLASSES, BG_CLASSES } from '../constants/ui-colors';
import { useUserPreferences } from '../context/UserPreferencesContext';
import type { DefaultView } from '../models/user-preferences.model';
import type { NoteStatus, NotePriority } from '../models/note.model';

const views: {
  id: DefaultView;
  name: string;
  icon: typeof StickyNote;
}[] = [
  { id: 'notes', name: 'Notes', icon: StickyNote },
  {
    id: 'kanban',
    name: 'Boards',
    icon: LayoutDashboard,
  },
  { id: 'table', name: 'Table', icon: Table },
  { id: 'roadmap', name: 'Roadmap', icon: Timeline },
];

export default memo(function NotesApp() {
  const navigate = useNavigate();
  const { preferences, setPreferences } = useUserPreferences();
  const [activeView, setActiveView] = useState<DefaultView>(
    preferences.defaultView
  );
  const [statusFilter, setStatusFilter] = useState<NoteStatus | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<NotePriority | null>(null);

  useEffect(() => {
    setActiveView(preferences.defaultView);
  }, [preferences.defaultView]);

  // Get notes from controller
  const { notes, createNote, updateNote, deleteNote, importNotes } =
    useNotesContext();

  // Apply filters to notes
  const filteredNotes = useMemo(() => {
    let filtered = notes;
    
    if (statusFilter) {
      filtered = filtered.filter(note => note.status === statusFilter);
    }
    
    if (priorityFilter) {
      filtered = filtered.filter(note => note.priority === priorityFilter);
    }
    
    return filtered;
  }, [notes, statusFilter, priorityFilter]);

  const renderView = () => {
    const props = {
      notes: filteredNotes,
      onAddNote: createNote,
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
    <div className={`min-h-screen flex flex-col ${BG_CLASSES.page}`}>
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`px-3 sm:px-6 py-3 sm:py-4 ${HEADER_CLASSES.container}`}>
        <div className='flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0'>
          <div className='flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-start'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              title='Back to home'
              className={`flex items-center space-x-1 sm:space-x-2 ${HEADER_CLASSES.link}`}>
              <ArrowLeft size={28} />
              <span className='hidden sm:inline'></span>
            </motion.button>
            <div className='flex items-center space-x-2 sm:space-x-3'>
              <Logo size={28} className='sm:w-8' />
              <h1
                className={`text-lg sm:text-xl font-bold ${HEADER_CLASSES.title}`}>
                Ownlyst
              </h1>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto'>
            {/* View Switcher */}
            <div
              className={`flex rounded-lg p-1 w-full sm:w-auto justify-between sm:justify-start ${HEADER_CLASSES.tabContainer}`}>
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <motion.button
                    key={view.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveView(view.id)}
                    className={`flex items-center justify-center sm:justify-start space-x-0 sm:space-x-2 px-3 py-2 rounded-md transition-all flex-1 sm:flex-initial font-medium text-sm ${
                      activeView === view.id
                        ? 'bg-white dark:bg-slate-600 shadow-sm text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}>
                    <Icon size={16} />
                    <span className='hidden sm:inline'>{view.name}</span>
                  </motion.button>
                );
              })}
            </div>
            {/* Theme Toggle and Import/Export */}
            <div className='flex items-center gap-2'>
              <ThemeToggle />
              <ImportExport
                notes={notes}
                onImportNotes={importNotes}
                userPreferences={preferences}
                onImportPreferences={setPreferences}
              />
              <UserPreferencesMenu
                viewOptions={views.map(({ id, name }) => ({ id, name }))}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content - Flex grow to fill space */}
      <main className={`flex-1 p-6 ${BG_CLASSES.page}`}>
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
        {/* Command Palette */}
        <CommandPalette 
          onCreateNote={createNote}
          onChangeView={setActiveView}
          onFilterByStatus={setStatusFilter}
          onFilterByPriority={setPriorityFilter}
        />
    </div>
  );
});
