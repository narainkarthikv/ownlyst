import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  COLOR_PICKER_PALETTE,
  type NoteColor,
} from '../constants/colors';

interface ColorPickerProps {
  currentColor: NoteColor;
  onColorSelect: (color: NoteColor) => void;
  onClose: () => void;
}

export default function ColorPicker({
  currentColor,
  onColorSelect,
  onClose,
}: ColorPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
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
      className='absolute bottom-full right-0 mb-1 bg-white rounded-lg shadow-lg border border-gray-100 p-3 z-50 w-[280px]'>
      <div className='flex items-center justify-between mb-2'>
        <span className='text-sm font-medium text-gray-700'>Color</span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className='text-gray-400 hover:text-gray-600'>
          <X size={14} />
        </motion.button>
      </div>

      <div className='grid grid-cols-6 gap-2'>
        {COLOR_PICKER_PALETTE.map((color) => (
          <motion.button
            key={color.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onColorSelect(color.id)}
            className='flex flex-col items-center gap-1'>
            <div
              className={`
                w-7 h-7 rounded-md transition-all duration-200
                ${color.class}
                ${
                  currentColor === color.id
                    ? 'ring-2 ring-offset-2 ring-gray-400'
                    : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-200'
                }
              `}
            />
            <span className='text-[10px] font-medium text-gray-500'>
              {color.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
