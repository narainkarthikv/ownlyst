import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './theme';
import { ToastProvider } from './components/shared/Toast';
import { UserPreferencesProvider } from './context/UserPreferencesContext';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <UserPreferencesProvider>
        <ThemeProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ThemeProvider>
      </UserPreferencesProvider>
    </HelmetProvider>
  </StrictMode>
);
