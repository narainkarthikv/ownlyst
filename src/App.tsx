import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotesProvider } from './controllers/NotesProvider';
import LoadingSpinner from './components/shared/LoadingSpinner';
import { BG_CLASSES } from './constants/ui-colors';

// Lazy load page components for code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));
const NotesApp = lazy(() => import('./pages/NotesApp'));

// Fallback component for lazy loading
function PageFallback() {
  return (
    <div
      className={`flex items-center justify-center min-h-screen ${BG_CLASSES.surface}`}>
      <LoadingSpinner />
    </div>
  );
}

function App() {
  return (
    <NotesProvider>
      <Router>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/app' element={<NotesApp />} />
          </Routes>
        </Suspense>
      </Router>
    </NotesProvider>
  );
}

export default App;
