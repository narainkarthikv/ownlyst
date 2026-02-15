/**
 * ImportExport Component - Data Portability Controls
 *
 * Subtle, secondary UI for importing and exporting notes
 * Positioned at bottom as a utility area, not competing with core actions
 */

import { useState } from 'react';
import { Download, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImportExportService } from '../services/import-export.service';
import type { Note } from '../models/note.model';

interface ImportExportProps {
  notes: Note[];
  onImportNotes: (notes: Note[]) => void;
  layout?: 'horizontal' | 'vertical'; // For bottom utility area
}

interface Toast {
  message: string;
  type: 'success' | 'error';
}

export default function ImportExport({
  notes,
  onImportNotes,
}: ImportExportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleExportJSON = () => {
    const result = ImportExportService.exportAsJSON(notes);
    showToast(result.message, result.success ? 'success' : 'error');
    setIsOpen(false);
  };

  const handleExportCSV = () => {
    const result = ImportExportService.exportAsCSV(notes);
    showToast(result.message, result.success ? 'success' : 'error');
    setIsOpen(false);
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
    format: 'json' | 'csv'
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const result =
        format === 'json'
          ? await ImportExportService.importFromJSON(file)
          : await ImportExportService.importFromCSV(file);

      if (result.success && result.notes) {
        onImportNotes(result.notes);
        showToast(result.message, 'success');
      } else {
        showToast(result.message, 'error');
      }
    } catch {
      showToast('Failed to import notes', 'error');
    } finally {
      setIsImporting(false);
      setIsOpen(false);
      event.target.value = '';
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className='relative'>
      {/* Minimal Trigger Button - Secondary/Tertiary styling */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        title='Data import/export'
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium
          ${
            isOpen
              ? 'bg-gray-200 dark:bg-slate-600 text-gray-900 dark:text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-300'
          }`}>
        <Download size={16} />
        <span className='hidden sm:inline'>Import/Export</span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className='fixed inset-0 z-40'
            />

            {/* Menu - Position relative to button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className='absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50'>
              <div className='p-3 space-y-2'>
                {/* Export Section */}
                <div className='pb-3 border-b border-gray-200 dark:border-slate-700'>
                  <p className='px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2'>
                    Export
                  </p>
                  <motion.button
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                    onClick={handleExportJSON}
                    className='w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors'>
                    <Download size={16} />
                    <span>JSON</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                    onClick={handleExportCSV}
                    className='w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors'>
                    <Download size={16} />
                    <span>CSV</span>
                  </motion.button>
                </div>

                {/* Import Section */}
                <div>
                  <p className='px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2'>
                    Import
                  </p>
                  <label className='block cursor-pointer'>
                    <motion.div
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                      className='w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors'>
                      <Upload size={16} />
                      <span>{isImporting ? 'Importing...' : 'JSON'}</span>
                    </motion.div>
                    <input
                      type='file'
                      accept='.json'
                      onChange={(e) => handleFileSelect(e, 'json')}
                      disabled={isImporting}
                      className='hidden'
                    />
                  </label>
                  <label className='block cursor-pointer'>
                    <motion.div
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                      className='w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors'>
                      <Upload size={16} />
                      <span>{isImporting ? 'Importing...' : 'CSV'}</span>
                    </motion.div>
                    <input
                      type='file'
                      accept='.csv'
                      onChange={(e) => handleFileSelect(e, 'csv')}
                      disabled={isImporting}
                      className='hidden'
                    />
                  </label>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`fixed top-4 right-4 px-4 py-3 rounded-lg flex items-center gap-3 shadow-lg z-50 ${
              toast.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}>
            {toast.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className='text-sm font-medium'>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
