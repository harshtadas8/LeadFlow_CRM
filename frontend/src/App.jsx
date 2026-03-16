import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CreateLead from './pages/CreateLead.jsx';
import LeadDetail from './pages/LeadDetail.jsx';

/**
 * Main Application Component
 * Handles client-side routing and basic authentication guarding
 */
function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="app-container" style={{ padding: '20px 20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <Navbar />
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />          
          
          {/* Protected Application Routes */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/leads/new" 
            element={isAuthenticated ? <CreateLead /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/leads/:id" 
            element={isAuthenticated ? <LeadDetail /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;