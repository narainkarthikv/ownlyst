import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Pin,
  Clock,
  CheckCircle,
  Circle,
  BarChart3} from 'lucide-react';
import { Note } from '../types/Note';
import NoteModal from './NoteModal';

interface RoadmapViewProps {
  notes: Note[];
  onAddNote: (note: Note) => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

const statusIcons: Record<Note['status'], React.ElementType> = {
  'todo': Circle,
  'in-progress': Clock,
  'done': CheckCircle,
};

const statusColors: Record<Note['status'], string> = {
  'todo': 'text-gray-700 bg-gray-100',
  'in-progress': 'text-blue-700 bg-blue-100',
  'done': 'text-emerald-700 bg-emerald-100',
};


interface GanttTask {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  priority: Note['priority'];
  status: Note['status'];
  isPinned: boolean;
}

export default function RoadmapView({ notes, onAddNote }: RoadmapViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'quarter'>('month');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Convert notes to Gantt tasks
  const ganttTasks = useMemo(() => {
    return notes
      .filter(note => note.dueDate)
      .filter(note => filterStatus === 'all' || note.status === filterStatus)
      .map(note => ({
        id: note.id,
        title: note.title,
        startDate: new Date(note.createdAt),
        endDate: new Date(note.dueDate!),
        progress: note.status === 'done' ? 100 : note.status === 'in-progress' ? 50 : 0,
        priority: note.priority,
        status: note.status,
        isPinned: note.isPinned,
      }))
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.startDate.getTime() - b.startDate.getTime();
      });
  }, [notes, filterStatus]);

  // Generate time periods for the timeline
  const timelineData = useMemo(() => {
    const periods = [];
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + (viewMode === 'quarter' ? 3 : 1), 0);
    
    if (viewMode === 'month') {
      // Generate days for the month
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        periods.push(new Date(d));
      }
    } else {
      // Generate weeks for the quarter
      const current = new Date(startDate);
      while (current <= endDate) {
        periods.push(new Date(current));
        current.setDate(current.getDate() + 7);
      }
    }
    
    return periods;
  }, [currentDate, viewMode]);

  const navigatePeriod = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    const increment = viewMode === 'quarter' ? 3 : 1;
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? increment : -increment));
    setCurrentDate(newDate);
  };

  const handleAddNote = (date?: Date) => {
    setSelectedDate(date || null);
    setIsModalOpen(true);
  };

  const formatPeriodHeader = () => {
    if (viewMode === 'month') {
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(currentDate);
    } else {
      return `Q${Math.floor(currentDate.getMonth() / 3) + 1} ${currentDate.getFullYear()}`;
    }
  };

  const getTaskPosition = (task: GanttTask) => {
    const totalDays = timelineData.length;
    const startIndex = timelineData.findIndex(date => 
      date.toDateString() === task.startDate.toDateString()
    );
    const endIndex = timelineData.findIndex(date => 
      date.toDateString() === task.endDate.toDateString()
    );
    
    const left = startIndex >= 0 ? (startIndex / totalDays) * 100 : 0;
    const width = endIndex >= 0 && startIndex >= 0 ? ((endIndex - startIndex + 1) / totalDays) * 100 : 10;
    
    return { left: `${left}%`, width: `${Math.max(width, 5)}%` };
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="space-y-4">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 px-2 sm:px-0">
        {[
          { 
            label: 'Total Tasks', 
            value: ganttTasks.length, 
            color: 'bg-blue-100 text-blue-800 border-blue-200',
            icon: <BarChart3 size={20} className="text-blue-600" />
          },
          { 
            label: 'In Progress', 
            value: ganttTasks.filter(t => t.status === 'in-progress').length, 
            color: 'bg-amber-100 text-amber-800 border-amber-200',
            icon: <Clock size={20} className="text-amber-600" />
          },
          { 
            label: 'Completed', 
            value: ganttTasks.filter(t => t.status === 'done').length, 
            color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            icon: <CheckCircle size={20} className="text-emerald-600" />
          },
          { 
            label: 'Overdue', 
            value: ganttTasks.filter(t => t.endDate < new Date() && t.status !== 'done').length, 
            color: 'bg-rose-100 text-rose-800 border-rose-200',
            icon: <Calendar size={20} className="text-rose-600" />
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white p-3 sm:p-4 rounded-lg shadow-sm border ${stat.color.split(' ')[2]} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium mb-1 truncate">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold tabular-nums">{stat.value}</p>
              </div>
              <div className={`p-1.5 sm:p-2 rounded-lg ml-3 ${stat.color.split(' ')[0]}`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200 mx-2 sm:mx-0">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between space-y-3 sm:space-y-0">
          {/* Period Navigation */}
          <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto space-x-2 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigatePeriod('prev')}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronLeft size={20} className="sm:size-6 text-gray-600" />
            </motion.button>
            
            <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 min-w-[140px] sm:min-w-[200px] text-center">
              {formatPeriodHeader()}
            </h3>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigatePeriod('next')}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronRight size={20} className="sm:size-6 text-gray-600" />
            </motion.button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1.5 space-x-2 w-full sm:w-auto">
              <button
                onClick={() => setViewMode('month')}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  viewMode === 'month'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('quarter')}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  viewMode === 'quarter'
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Quarter
              </button>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto pl-3 pr-8 py-1.5 border border-gray-300 rounded-md text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Timeline Header */}
        <div className="grid" style={{ gridTemplateColumns: '200px 1fr' }}>
          <div className="sticky left-0 bg-white p-3 sm:p-4 border-r border-gray-200 z-10">
            <h4 className="font-semibold text-gray-900 text-sm">Tasks</h4>
          </div>
          <div className="overflow-x-auto min-w-0">
            <div 
              className="grid border-b border-gray-200 bg-gray-50"
              style={{ 
                gridTemplateColumns: `repeat(${timelineData.length}, minmax(80px, 1fr))`,
                width: `max(100%, ${timelineData.length * 80}px)`
              }}
            >
              {timelineData.map((date) => (
                <div
                  key={date.toISOString()}
                  className={`p-2 sm:p-4 text-center border-r border-gray-200 last:border-r-0 ${
                    isToday(date) ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">
                    {viewMode === 'month' 
                      ? date.getDate()
                      : `W${Math.ceil(date.getDate() / 7)}`
                    }
                  </div>
                  {viewMode === 'month' && (
                    <div className="text-[10px] sm:text-xs font-medium uppercase text-gray-500 mt-0.5 sm:mt-1">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="overflow-hidden">
          {ganttTasks.length === 0 ? (
            <div className="text-center p-6 sm:py-12">
              <Calendar size={40} className="mx-auto mb-3 sm:mb-4 text-gray-400" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No tasks with due dates</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">Add due dates to your notes to see them in the timeline</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddNote()}
                className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Task
              </motion.button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid min-w-0" style={{ gridTemplateColumns: '200px 1fr' }}>
                {/* Task Names Column */}
                <div className="sticky left-0 bg-white z-10 border-r border-gray-200">
                  {ganttTasks.map(task => (
                    <div key={task.id} className="flex items-center min-h-[3rem] sm:min-h-[4rem] px-2 sm:px-4 py-2 sm:py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5 sm:space-x-2">
                          {React.createElement(statusIcons[task.status], {
                            size: 14,
                            className: `${statusColors[task.status]} p-0.5 rounded-full shrink-0`
                          })}
                          <span className="text-sm sm:text-base font-medium text-gray-900 truncate">
                            {task.title}
                          </span>
                          {task.isPinned && (
                            <Pin size={10} className="text-blue-600 shrink-0" />
                          )}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">
                          {task.startDate.toLocaleDateString()} - {task.endDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline Column */}
                <div className="overflow-x-auto">
                  <div 
                    className="grid bg-white"
                    style={{ 
                      gridTemplateColumns: `repeat(${timelineData.length}, minmax(80px, 1fr))`,
                      width: `max(100%, ${timelineData.length * 80}px)`
                    }}
                  >
                    {ganttTasks.map(task => (
                      <div 
                        key={task.id}
                        className="relative border-b border-gray-200 min-h-[3rem] sm:min-h-[4rem]"
                        style={getTaskPosition(task)}
                      >
                        <motion.div
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                          className={`absolute top-1/2 -translate-y-1/2 mx-1.5 sm:mx-2 h-6 sm:h-8 rounded-md shadow-sm ${
                            task.status === 'done'
                              ? 'bg-emerald-100'
                              : task.status === 'in-progress'
                              ? 'bg-blue-100'
                              : 'bg-gray-100'
                          }`}
                        >
                          <div 
                            className={`h-full rounded-md transition-all duration-500 ${
                              task.status === 'done'
                                ? 'bg-emerald-200 w-full'
                                : task.status === 'in-progress'
                                ? 'bg-blue-200 w-1/2'
                                : 'bg-gray-200 w-0'
                            }`}
                          />
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Note Modal */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        note={null}
        defaultDueDate={selectedDate}
        onSave={(noteData) => {
          onAddNote({
            ...noteData,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            dueDate: selectedDate || noteData.dueDate,
          });
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}