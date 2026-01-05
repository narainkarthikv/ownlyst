import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotesApp from './pages/NotesApp';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import UpdatesPage from './pages/UpdatesPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import HelpCenterPage from './pages/HelpCenterPage';
import DocumentationPage from './pages/DocumentationPage';
import CommunityPage from './pages/CommunityPage';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
