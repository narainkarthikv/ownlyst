import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <motion.button
      type='button'
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      className='
        p-2 rounded-lg
        text-gray-600 hover:text-gray-900
        dark:text-gray-400 dark:hover:text-gray-100
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-gray-300 dark:focus:ring-gray-700
      '>
      {isLight ? <Moon size={20} /> : <Sun size={20} />}
    </motion.button>
  );
}
