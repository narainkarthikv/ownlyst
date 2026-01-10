/**
 * Toast/Notification System
 * Displays temporary notifications for user actions
 * Supports success, error, info, and warning messages
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const toastConfig = {
  success: {
    bgColor: 'bg-green-500 dark:bg-green-600',
    icon: Check,
    label: 'Success',
  },
  error: {
    bgColor: 'bg-red-500 dark:bg-red-600',
    icon: AlertCircle,
    label: 'Error',
  },
  info: {
    bgColor: 'bg-blue-500 dark:bg-blue-600',
    icon: Info,
    label: 'Info',
  },
  warning: {
    bgColor: 'bg-yellow-500 dark:bg-yellow-600',
    icon: AlertTriangle,
    label: 'Warning',
  },
};

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const config = toastConfig[toast.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={`${config.bgColor} text-white rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px] max-w-[500px]`}>
      <Icon size={20} className='flex-shrink-0' />
      <div className='flex-1'>
        <p className='font-medium'>{toast.message}</p>
      </div>
      {toast.action && (
        <button
          onClick={() => {
            toast.action?.onClick();
            onRemove(toast.id);
          }}
          className='text-sm font-medium hover:opacity-90 transition-opacity'>
          {toast.action.label}
        </button>
      )}
      <button
        onClick={() => onRemove(toast.id)}
        className='flex-shrink-0 hover:opacity-90 transition-opacity'
        aria-label='Close notification'>
        <X size={18} />
      </button>
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', duration = 5000) => {
      const id = Date.now().toString();
      const newToast: Toast = { id, message, type };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className='fixed bottom-4 right-4 z-50 pointer-events-none flex flex-col gap-2'>
        <AnimatePresence mode='popLayout'>
          {toasts.map((toast) => (
            <div key={toast.id} className='pointer-events-auto'>
              <ToastItem toast={toast} onRemove={removeToast} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
