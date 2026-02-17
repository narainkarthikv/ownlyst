import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { themePreference, setThemePreference } = useTheme();
  const preferenceOrder = ['system', 'light', 'dark'] as const;
  const currentIndex = preferenceOrder.indexOf(themePreference);
  const nextPreference =
    preferenceOrder[(currentIndex + 1) % preferenceOrder.length];
  const label =
    themePreference === 'system'
      ? 'System'
      : themePreference === 'light'
        ? 'Light'
        : 'Dark';
  const Icon =
    themePreference === 'system'
      ? Monitor
      : themePreference === 'light'
        ? Sun
        : Moon;

  return (
    <motion.button
      type='button'
      onClick={() => setThemePreference(nextPreference)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Theme preference: ${label}`}
      className='
        p-2 rounded-lg
        text-gray-600 hover:text-gray-900
        dark:text-gray-400 dark:hover:text-gray-100
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-gray-300 dark:focus:ring-gray-700
      '>
      <Icon size={20} />
    </motion.button>
  );
}
