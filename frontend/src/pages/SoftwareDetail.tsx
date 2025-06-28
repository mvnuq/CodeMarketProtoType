import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import './SoftwareDetail.css';

// Importamos el JSON (o haz fetch a tu API)
import data from '../data/software-items.json';

type Plan = { id: number; price: number; description: string };
type LocationState = {
  item?: never; // no viene por state, lo buscamos por params
};

export default function SoftwareDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<typeof data[0] | null>(null);

  useEffect(() => {
    const found = data.find(d => d.id === Number(id));
    setItem(found ?? null);
  }, [id]);

  // if (!item) return <p>Cargando o software no encontrado…</p>;

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
          {/* Logo */}
          <div className="detail-logo">
            <img src={item?.companyLogo} alt={`${item?.title} logo`} />
          </div>

          {/* Header */}
          <div className="detail-header">
            <h1>{item?.title}</h1>
            <span className="detail-label">{item?.label}</span>
          </div>

          {/* Descripción */}
          <h3 className="detail-subtitle">Descripción</h3>
          <p className="detail-desc">{item?.desc}</p>

          {/* Íconos */}
          <div className="detail-icons">
            {item?.icons.map(src => (
              <img key={src} src={src} alt="" />
            ))}
          </div>

          {/* Ilustración */}
          <div className="detail-illu">
            <img src={item?.illustration} alt="Ilustración" />
          </div>
        </div>

        {/* PLANES */}
        <section className="detail-plans">
          <h2>Planes</h2>
          <div className="plans-grid">
            {item?.plans.map(plan => (
              <div key={plan.id} className="plan-card">
                <div className="plan-price">{plan.price.toLocaleString()} CLP</div>
                <div className="plan-desc">{plan.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* DEMO | RESEÑAS | CALENDARIO */}
        <div className="detail-extra">
          <section className="extra-section demo">
            <h2>Demo</h2>
            <div className="demo-content">
              <a
                href={item?.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="demo-link"
              >
                Ver video demo
              </a>
            </div>
          </section>

          <section className="extra-section reviews">
            <h2>Reseñas</h2>
            <div className="reviews-content">
              {item?.reviews.map((r, i) => (
                <p key={i}>"{r}"</p>
              ))}
            </div>
          </section>

          <section className="extra-section calendar">
            <h2>Calendario</h2>
            <div className="calendar-content">
              <iframe
                src={item?.calendarUrl}
                style={{ border: 0, width: '100%', height: '250px' }}
                title="Calendario"
              />
            </div>
          </section>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
