import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Note } from '../types/Note';

interface ColorPickerProps {
  currentColor: Note['color'];
  onColorSelect: (color: Note['color']) => void;
  onClose: () => void;
}

const colors: { id: Note['color']; label: string; class: string }[] = [
  { 
    id: 'indigo', 
    label: 'In', 
    class: 'bg-indigo-400 hover:bg-indigo-500'
  },
  { 
    id: 'emerald', 
    label: 'Em', 
    class: 'bg-emerald-400 hover:bg-emerald-500'
  },
  { 
    id: 'sky', 
    label: 'Sk', 
    class: 'bg-sky-400 hover:bg-sky-500'
  },
  { 
    id: 'rose', 
    label: 'Ro', 
    class: 'bg-rose-400 hover:bg-rose-500'
  },
  { 
    id: 'violet', 
    label: 'Vi', 
    class: 'bg-violet-400 hover:bg-violet-500'
  },
  { 
    id: 'amber', 
    label: 'Am', 
    class: 'bg-amber-400 hover:bg-amber-500'
  },
  { 
    id: 'fuchsia', 
    label: 'Fu', 
    class: 'bg-fuchsia-400 hover:bg-fuchsia-500'
  },
  { 
    id: 'slate', 
    label: 'Sl', 
    class: 'bg-slate-400 hover:bg-slate-500'
  },
  { 
    id: 'cyan', 
    label: 'Cy', 
    class: 'bg-cyan-400 hover:bg-cyan-500'
  },
  { 
    id: 'lime', 
    label: 'Li', 
    class: 'bg-lime-400 hover:bg-lime-500'
  },
  { 
    id: 'orange', 
    label: 'Or', 
    class: 'bg-orange-400 hover:bg-orange-500'
  },
  { 
    id: 'teal', 
    label: 'Te', 
    class: 'bg-teal-400 hover:bg-teal-500'
  }
];

export default function ColorPicker({ currentColor, onColorSelect, onClose }: ColorPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={pickerRef}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 p-3 z-50 w-[280px]"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Color</span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={14} />
        </motion.button>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {colors.map((color) => (
          <motion.button
            key={color.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onColorSelect(color.id)}
            className="flex flex-col items-center gap-1"
          >
            <div 
              className={`
                w-7 h-7 rounded-md transition-all duration-200
                ${color.class}
                ${currentColor === color.id 
                  ? 'ring-2 ring-offset-2 ring-gray-400' 
                  : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-200'
                }
              `}
            />
            <span className="text-[10px] font-medium text-gray-500">
              {color.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}