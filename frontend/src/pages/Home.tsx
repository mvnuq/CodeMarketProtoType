import React from 'react';
import './Home.css';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import CategorySection, { CatSection } from '../components/CategorySection';
import data from '../data/categories.json';
import { useNavigate } from 'react-router-dom';
import ChatBot from '../components/ChatBot';
import { motion } from 'framer-motion';
import BannerSlider from '../components/BannerSlide';

/** Variants padre para stagger */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5
    }
  }
};

/** Variants para cada banner */
const bannerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const navigate = useNavigate();
  const slides = [
    {
      id: 's1',
      variant: 'software' as const,
      title: <>Encuentra<br/><span>Tu software</span></>,
      btnText: 'No sé cómo comenzar',
      onClick: () => navigate('/setup'),
    },
    {
      id: 's2',
      variant: 'dev' as const,
      title: <>¿Buscas<br/><span>nuevos clientes?</span></>,
      btnText: '¡Sí! Tengo un sistema',
      onClick: () => navigate('/setup-dev'),
    }
  ];
  return (
    <div className="home-page">
      <AppHeader />
      <motion.div
        className="banner-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      </motion.div>
      <BannerSlider slidesConfig={slides} />
      {/* Secciones de categorías */}
      {(data as CatSection[]).map(sec =>
        <CategorySection key={sec.title} section={sec} />
      )}

      <ChatBot />
      <Footer />
    </div>
  );
}
