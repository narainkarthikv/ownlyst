import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Sun, Moon, Settings } from 'lucide-react';
import { useUserPreferences } from '../context/UserPreferencesContext';
import { EMOTE_AVATARS } from '../constants/emotes';
import type { DefaultView } from '../models/user-preferences.model';

interface ViewOption {
  id: DefaultView;
  name: string;
}

interface UserPreferencesMenuProps {
  viewOptions: ViewOption[];
}

export default function UserPreferencesMenu({
  viewOptions,
}: UserPreferencesMenuProps) {
  const {
    preferences,
    setThemePreference,
    setDefaultView,
    setAvatar,
    setUsername,
  } = useUserPreferences();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions = useMemo(
    () => [
      { id: 'system' as const, label: 'System', icon: Monitor },
      { id: 'light' as const, label: 'Light', icon: Sun },
      { id: 'dark' as const, label: 'Dark', icon: Moon },
    ],
    []
  );

  return (
    <div className='relative'>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        title='User preferences'
        className='flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'>
        <span className='text-lg'>{preferences.avatar}</span>
        <span className='hidden sm:inline max-w-[120px] truncate'>
          {preferences.username}
        </span>
        <Settings size={16} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className='fixed inset-0 z-40'
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className='absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg z-50'>
              <div className='p-4 space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-semibold text-gray-900 dark:text-white'>
                      Preferences
                    </p>
                  </div>
                  <div className='text-2xl'>{preferences.avatar}</div>
                </div>

                <div>
                  <p className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2'>
                    Username
                  </p>
                  <div className='flex items-center gap-2'>
                    <input
                      value={preferences.username}
                      onChange={(event) => setUsername(event.target.value)}
                      maxLength={24}
                      placeholder='Your name'
                      className='flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-md text-sm text-gray-700 dark:text-gray-200'
                    />
                    <div className='text-xs text-gray-400 dark:text-gray-500 min-w-[28px] text-right'>
                      {preferences.username.length}/24
                    </div>
                  </div>
                  <p className='mt-1 text-[11px] text-gray-500 dark:text-gray-400'>
                    Shows next to your avatar in the header.
                  </p>
                </div>

                <div>
                  <p className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2'>
                    Theme
                  </p>
                  <div className='grid grid-cols-3 gap-2'>
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      const isActive =
                        preferences.themePreference === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setThemePreference(option.id)}
                          className={`flex items-center justify-center gap-1 rounded-md px-2 py-2 text-xs font-medium transition-colors border ${
                            isActive
                              ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white'
                              : 'text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700'
                          }`}>
                          <Icon size={14} />
                          {option.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className='flex items-center justify-between mb-2'>
                    <p className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                      Avatar
                    </p>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                      {EMOTE_AVATARS.length} emotes
                    </span>
                  </div>
                  <div className='grid grid-cols-5 gap-2'>
                    {EMOTE_AVATARS.map((emote) => {
                      const isSelected = preferences.avatar === emote;
                      return (
                        <motion.button
                          key={emote}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setAvatar(emote)}
                          className={`flex items-center justify-center text-lg rounded-lg border transition-colors ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/20'
                              : 'border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700'
                          }`}>
                          {emote}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2'>
                    Default View
                  </p>
                  <select
                    value={preferences.defaultView}
                    onChange={(event) =>
                      setDefaultView(event.target.value as DefaultView)
                    }
                    className='w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-md text-sm text-gray-700 dark:text-gray-200'>
                    {viewOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
