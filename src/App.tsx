import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotesApp from './pages/NotesApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/notes' element={<NotesApp />} />
      </Routes>
    </Router>
  );
}

export default App;
