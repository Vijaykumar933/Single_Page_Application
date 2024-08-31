// src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check for token to determine authentication state

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav>
      <ul>
        {token ? (
          <>
            <li>
              <Link to="/customers">Customer List</Link>
            </li>
            <li>
              <Link to="/add-customer">Add Customer</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
