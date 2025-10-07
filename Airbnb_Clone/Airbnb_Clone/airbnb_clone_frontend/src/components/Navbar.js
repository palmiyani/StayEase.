import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout, isAuthenticated, loading } = useAuth();


  const handleLogout = () => {
    logout();
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="logo">
            Airbnb Clone
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <span>Loading...</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo">
          Airbnb Clone
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {isAuthenticated() ? (
            <>
              <button onClick={handleLogout} className="btn btn-secondary">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;