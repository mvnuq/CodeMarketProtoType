// src/pages/Home.tsx
import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import AppHeader from '../components/AppHeader';
import CategorySection, { CatSection } from '../components/CategorySection';
import Footer from '../components/Footer';
import data from '../data/categories.json';
import { useNavigate } from 'react-router-dom';
import ChatBot from '../components/ChatBot';

export default function Home() {
  const navigate = useNavigate();

  const handleStartUser = () => {
    navigate('/setup');
  };

  const handleStartDev = () => {
    navigate('/setup-dev');
  };

  return (
    <div className="home-page">
      <AppHeader />

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Encuentra<br />
            Tu <span>software</span>
          </motion.h1>

          {/* Dos CTAs side by side */}
          <div className="hero-cta-group">
            <motion.button
              className="hero-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartUser}
            >
              No sé cómo comenzar
            </motion.button>

            <motion.button
              className="hero-cta hero-cta--alt"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartDev}
            >
              ¡Sí! Tengo un sistema
            </motion.button>
          </div>
        </div>
      </section>

      {/* Categorías */}
      {(data as CatSection[]).map(sec =>
        <CategorySection key={sec.title} section={sec} />
      )}

      <ChatBot />
      <Footer />
    </div>
  );
}
