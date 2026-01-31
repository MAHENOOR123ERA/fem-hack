import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Resume Builder</h1>
        <p className="mb-6">Create, edit, and download professional resumes easily.</p>
        <Link to="/login" className="bg-blue-500 text-white p-3 rounded mr-4">Login</Link>
        <Link to="/signup" className="bg-green-500 text-white p-3 rounded">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;