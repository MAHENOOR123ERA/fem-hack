import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-blue-500 dark:bg-gray-800 p-4 flex justify-between">
      <Link to="/" className="text-white">Resume Builder</Link>
      {user ? (
        <div>
          <button onClick={toggleDarkMode} className="text-white mr-4">Toggle Dark Mode</button>
          <button onClick={handleLogout} className="text-white">Logout</button>
        </div>
      ) : (
        <Link to="/login" className="text-white">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;