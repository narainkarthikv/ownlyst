import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotesProvider } from './context/NotesContext';
import LoadingSpinner from './components/shared/LoadingSpinner';

// Lazy load all page components for code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));
const NotesApp = lazy(() => import('./pages/NotesApp'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const UpdatesPage = lazy(() => import('./pages/UpdatesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const HelpCenterPage = lazy(() => import('./pages/HelpCenterPage'));
const DocumentationPage = lazy(() => import('./pages/DocumentationPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));

// Fallback component for lazy loading
function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
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
            {/* Main App Routes */}
            <Route path='/' element={<LandingPage />} />
            <Route path='/notes' element={<NotesApp />} />

            {/* Product Routes */}
            <Route path='/features' element={<FeaturesPage />} />
            <Route path='/pricing' element={<PricingPage />} />
            <Route path='/updates' element={<UpdatesPage />} />

            {/* Company Routes */}
            <Route path='/about' element={<AboutPage />} />
            <Route path='/blog' element={<BlogPage />} />
            <Route path='/contact' element={<ContactPage />} />

            {/* Support Routes */}
            <Route path='/help' element={<HelpCenterPage />} />
            <Route path='/docs' element={<DocumentationPage />} />
            <Route path='/community' element={<CommunityPage />} />
          </Routes>
        </Suspense>
      </Router>
    </NotesProvider>
  );
}

export default App;
