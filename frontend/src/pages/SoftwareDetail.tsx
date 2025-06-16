// src/pages/SoftwareDetail.tsx
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppHeader from '../components/AppHeader';
import Footer    from '../components/Footer';
import './SoftwareDetail.css';

type LocationState = {
  item: {
    id: number;
    title: string;
    label: string;
    desc: string;
    icons: string[];
    illustration: string;
  };
};

export default function SoftwareDetail() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const item = (state as LocationState)?.item || {
    id: 0,
    title: 'Proyecto genérico',
    label: 'DevTest SPA',
    desc: 'El proyecto genérico se basa para el uso de sistema erp adaptado a microempresas',
    icons: ['/assets/python.png','/assets/react.png','/assets/digitalocean.png'],
    illustration: '/assets/illustration.png'
  };

  return (
    <div className="detail-page">
      <AppHeader />

      <motion.main
        className="detail-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Volver
        </button>

        {/* CARD PRINCIPAL */}
        <div className="detail-card">
          <div className="detail-header">
            <h1>{item.title}</h1>
            <span className="detail-label">{item.label}</span>
          </div>
          <h3 className="detail-subtitle">Descripción</h3>
          <p className="detail-desc">{item.desc}</p>
          <div className="detail-icons">
            {item.icons?.map(src => <img key={src} src={src} alt="" />)}
          </div>
          <div className="detail-illu">
            <img src={item.illustration} alt="Ilustración" />
          </div>
        </div>

        {/* PLANES */}
        <section className="detail-plans">
          <h2>Planes</h2>
          <div className="plans-grid">
            {[1,2,3].map(n => (
              <div key={n} className="plan-card">
                <div className="plan-price">Coste mensual<br/>9.900 CLP</div>
                <div className="plan-desc">descripción de qué trae etc…</div>
              </div>
            ))}
          </div>
        </section>

        {/* NUEVAS SECCIONES */}
        <div className="detail-extra">

          {/* Demo */}
          <section className="extra-section demo">
            <h2>Demo</h2>
            <div className="demo-content">
              {/* aquí podrías incrustar un iframe de video o un enlace */}
              <a href="#" className="demo-link">Link video demo</a>
            </div>
          </section>

          {/* Reseñas */}
          <section className="extra-section reviews">
            <h2>Reseñas</h2>
            <div className="reviews-content">
              {/* tarjetas o párrafos con reseñas */}
              <p>Reseñas generales</p>
            </div>
          </section>

          {/* Calendario */}
          <section className="extra-section calendar">
            <h2>Calendario</h2>
            <div className="calendar-content">
              {/* por ej: <iframe src="https://calendar.google.com/..." /> */}
              <p>Calendario de Google</p>
            </div>
          </section>

        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
