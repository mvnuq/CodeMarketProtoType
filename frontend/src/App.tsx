import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './auth/AuthProvider';
import Login from './pages/Login';
import Home from './pages/Home';
import Setup from './pages/Setup';
import SetupDev from './pages/SetupDev';
import SuggestionsSoftware from './pages/SuggestionsSoftware';
import SuggestionsClients from './pages/SuggestionsClients';
import SoftwareDetail from './pages/SoftwareDetail';
import SearchResults from './pages/SearchResults';
import PublishSoftware from './pages/PublishSoftware';
import PaymentSimulation from './pages/PaymentSimulation';
import PaymentSuccess from './pages/PaymentSuccess';
import MySoftware from './pages/MySoftware';
import SignupPage from './pages/SignupPage';
import ModerationPage from './pages/ModerationPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/setup-dev" element={<SetupDev />} />
        <Route
          path="/suggestions-software"
          element={<SuggestionsSoftware />}
        />
        <Route
          path="/suggestions-clients"
          element={<SuggestionsClients />}
        />
        <Route path="/software/:id" element={<SoftwareDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/publish-software" element={<PublishSoftware />} />
        <Route path="/software/:id/pay/:planId" element={<PaymentSimulation />} />
         <Route path="/my-software" element={<MySoftware />} />
        <Route path="/software/:id/success"     element={<PaymentSuccess />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin/moderation" element={<ModerationPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AnimatedRoutes />
    </AuthProvider>
  );
}
