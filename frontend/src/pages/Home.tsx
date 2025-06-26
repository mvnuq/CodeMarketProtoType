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
  const navigate = useNavigate();                 // <-- hook

  const handleStart = () => {
    navigate('/setup');
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
            Encuentra<br/>
            Tu <span>software</span>
          </motion.h1>
          <motion.button
            className="hero-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
             onClick={handleStart}  
          >
            No se como comenzar
          
          </motion.button>
        </div>
      </section>

      {/* Categorías */}
      {(data as CatSection[]).map(sec =>
        <CategorySection key={sec.title} section={sec} />
      )}

      {/* Proyecto + Planes
      <motion.section
        className="home-project"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden:  { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } }
        }}
      >
        <motion.div className="project-card" variants={{ hidden:{opacity:0}, visible:{opacity:1} }}>
          <div className="project-header">
            <h2>{project.title}</h2>
            <span className="label">{project.label}</span>
          </div>
          <p className="project-desc">{project.desc}</p>
          <div className="project-icons">
            {project.icons.map(i => <img key={i} src={i} alt="" />)}
          </div>
        </motion.div>

        <div className="plans">
          {[1,2,3].map(n => (
            <motion.div
              key={n}
              className="plan-card"
              variants={{ hidden:{opacity:0}, visible:{opacity:1} }}
              whileHover={{ y: -4, backgroundColor: '#5E2E8C' }}
            >
              <div className="plan-price">
                Coste mensual<br />9.900 CLP
              </div>
              <div className="plan-desc">
                descripción de qué trae etc…
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section> */}
      <ChatBot />
      <Footer />
    </div>
  );
}
