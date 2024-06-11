// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './App.css';
import CampaignsPage from './pages/Campaigns';
import { CookiesProvider } from 'react-cookie';
function App() {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
      </Routes>
    </Router>
    </CookiesProvider>
  );
}

export default App;
