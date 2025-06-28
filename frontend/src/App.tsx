import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider }   from './auth/AuthProvider';
import Login              from './pages/Login';
import Home               from './pages/Home';
import Setup              from './pages/Setup';
import SoftwareDetail     from './pages/SoftwareDetail';
import SetupDev from './pages/SetupDev';
import SuggestionsSoftware from './pages/SuggestionsSoftware';
import SuggestionsClients from './pages/SuggestionsClients';
import SearchResults from './pages/SearchResults';

export default function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"           element={<Login />} />
          <Route path="/home"       element={<Home />} />
          <Route path="/setup"      element={<Setup />} />
          <Route path="/setup-dev"      element={<SetupDev />} />
          <Route path="/suggestions-software" element={<SuggestionsSoftware />} />
          <Route path="/suggestions-clients"  element={<SuggestionsClients />} />
          <Route path="/software/:id" element={<SoftwareDetail />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}
