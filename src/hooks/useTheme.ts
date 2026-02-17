import { createContext, useContext, useEffect, useState } from 'react';
import { useUserPreferences } from '../context/UserPreferencesContext';
import type { ThemePreference } from '../models/user-preferences.model';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  themePreference: ThemePreference;
  setThemePreference: (value: ThemePreference) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeProvider() {
  const { preferences, setThemePreference } = useUserPreferences();
  const { themePreference } = preferences;
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applySystemTheme = (isDark: boolean) => {
      setTheme(isDark ? 'dark' : 'light');
    };

    if (themePreference === 'system') {
      applySystemTheme(prefersDarkQuery.matches);
      const handler = (event: MediaQueryListEvent) => {
        applySystemTheme(event.matches);
      };
      prefersDarkQuery.addEventListener('change', handler);
      return () => prefersDarkQuery.removeEventListener('change', handler);
    }

    setTheme(themePreference);
    return undefined;
  }, [themePreference]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setThemePreference(nextTheme);
  };

  return {
    theme,
    themePreference,
    setThemePreference,
    toggleTheme,
  };
}
