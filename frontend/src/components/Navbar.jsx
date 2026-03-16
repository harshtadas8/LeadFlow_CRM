import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Main Navigation component
 * Handles responsive layout and user logout session management
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Do not render Navbar if user is not authenticated
  if (!token) return null;

  /**
   * Clears authentication token and redirects to login
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  /**
   * Handles navigation and closes mobile menu toggle
   */
  const navTo = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="nav-container">
      <div className="nav-brand" onClick={() => navTo('/')}>
        LeadFlow<span>CRM</span>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
        <span style={{ opacity: isOpen ? 0 : 1 }}></span>
        <span style={{ transform: isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none' }}></span>
      </div>

      <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
        {location.pathname !== '/' && (
          <button onClick={() => navTo('/')} className="btn-nav dashboard-btn">
            Dashboard
          </button>
        )}
        <button onClick={handleLogout} className="btn-nav logout-btn">
          Logout
        </button>
      </div>

      <style>{`
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
          margin-bottom: 30px;
          position: relative;
          z-index: 1000;
        }
        .nav-brand {
          font-size: 28px;
          font-weight: 800;
          color: var(--accent);
          letter-spacing: -1.2px;
          cursor: pointer;
        }
        .nav-brand span { color: var(--text-h); font-weight: 300; }
        
        .nav-menu { display: flex; gap: 12px; align-items: center; }

        .btn-nav {
          color: white; border: none; padding: 8px 20px; border-radius: 8px;
          font-size: 14px; font-weight: 600; cursor: pointer; min-width: 100px; height: 38px;
        }
        .dashboard-btn { background: var(--accent); }
        .logout-btn { background: #ef4444; }

        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
        .hamburger span {
          width: 25px; height: 3px; background: var(--text-h);
          transition: 0.3s; border-radius: 2px;
        }

        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .nav-menu {
            display: none; position: absolute; top: 60px; right: 0;
            background: var(--bg); border: 1px solid var(--border);
            padding: 20px; border-radius: 12px; flex-direction: column;
            box-shadow: var(--shadow); width: 150px;
          }
          .nav-menu.open { display: flex; }
          .btn-nav { width: 100%; }
          .nav-brand { font-size: 22px; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;