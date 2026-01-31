import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/dashboard';
import EditResume from './pages/EditResume';
import ViewResume from './pages/viewResume';
import Home from './pages/Home';
import ResumeCard from './components/resume/ResumeCard';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ResumeCard" element={<ResumeCard />} />
          <Route path="/view/:id" element={<ViewResume />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
