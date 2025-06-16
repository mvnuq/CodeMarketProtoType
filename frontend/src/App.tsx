import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider }   from './auth/AuthProvider';
import Login              from './pages/Login';
import Home               from './pages/Home';
import Setup              from './pages/Setup';
import SoftwareDetail     from './pages/SoftwareDetail';

export default function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"           element={<Login />} />
          <Route path="/home"       element={<Home />} />
          <Route path="/setup"      element={<Setup />} />
          <Route path="/software/:id" element={<SoftwareDetail />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}
