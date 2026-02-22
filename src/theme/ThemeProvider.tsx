import { ReactNode } from 'react';
import { ThemeContext, useThemeProvider } from './useTheme';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeProvider();

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
