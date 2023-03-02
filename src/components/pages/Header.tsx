import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('auth-token');
    navigate('/login');
  };

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header>
      {currentPath === '/home' || currentPath === '/' ? (
        <>
          <button onClick={logout}>Logout</button>
          <button onClick={() => navigate('/profile')}>Profile</button>
        </>
      ) : currentPath === '/login' ? (
              <button onClick={() => navigate('/register')}>Register</button>
      ) : currentPath === '/profile' ? (
        <>
        <button onClick={() => navigate('/home')}>Home</button>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
              <button onClick={() => navigate('/login')}>Login</button>
      )}
    </header>
    );
};

export default Header;
