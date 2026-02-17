import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './components/ThemeProvider';
import { ToastProvider } from './components/shared/Toast';
import { UserPreferencesProvider } from './context/UserPreferencesContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserPreferencesProvider>
      <ThemeProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeProvider>
    </UserPreferencesProvider>
  </StrictMode>
);
