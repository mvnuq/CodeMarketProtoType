import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppHeader from '../components/AppHeader';
import Footer    from '../components/Footer';
import data      from '../data/software-items.json';
import './SoftwareDetail.css';

type Plan = { id: number; price: number; description: string };
type Review = { rating: number; text: string };
type Software = {
  id: number;
  title: string;
  label: string;
  companyLogo: string;
  desc: string;
  icons: string[];
  icon: string;
  plans: Plan[];
  demoUrl: string;
  reviews: Review[];
  calendarUrl: string;
};


export default function SoftwareDetail() {
  const { id }         = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate       = useNavigate();
  const [item, setItem] = useState<Software | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const found = data.find(d => d.id === Number(id));
    setItem(found || null);
    if (searchParams.get('status') === 'success' && found) {
      setSuccessMsg(
        `¡Gracias por tu compra! ${found.title} se comunicará contigo en las próximas 24 horas.`
      );
    }
  }, [id, searchParams]);

  const handleBuy = (plan: Plan) => {
    // Abre en nueva pestaña el simulador de pago
    const url = `/software/${id}/pay/${plan.id}`;
    window.open(url, '_blank');
  };

  if (!item) {
    return (
      <div className="detail-page">
        <AppHeader />
        <p className="loading">Cargando software…</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="detail-page">
      <AppHeader />
      <motion.main
        className="detail-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Volver
        </button>

        {successMsg && <div className="purchase-success">{successMsg}</div>}

        <div className="detail-card">
          <div className="detail-logo">
            <img src={item.companyLogo} alt={`${item.title} logo`} />
          </div>
          <div className="detail-header">
            <h1>{item.title}</h1>
            <span className="detail-label">{item.label}</span>
          </div>
          <h3 className="detail-subtitle">Descripción</h3>
          <p className="detail-desc">{item.desc}</p>
          <div className="detail-icons">
            {item.icons.map(src => <img key={src} src={src} alt="" />)}
          </div>
          <div className="detail-illu">
            <img src={item.icon} alt="Ilustración" />
          </div>
        </div>

        <section className="detail-plans">
          <h2>Planes</h2>
          <div className="plans-grid">
            {item.plans.map(plan => (
              <div key={plan.id} className="plan-card">
                <div className="plan-price">{plan.price.toLocaleString()} CLP</div>
                <div className="plan-desc">{plan.description}</div>
                <button
                  className="plan-buy-btn"
                  onClick={() => handleBuy(plan)}
                >
                  Comprar
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="detail-extra">
          <section className="extra-section demo">
            <h2>Demo</h2>
            <div className="demo-content">
              <a
                href={item.demoUrl}
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
          {item.reviews.map((r: Review, i: number) => (
            <div key={i} className="review-item">
              <div className="review-stars">
                {Array.from({ length: 5 }, (_, idx) => (
                  <span
                    key={idx}
                    className={idx < r.rating ? 'star filled' : 'star'}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="review-text">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

          <section className="extra-section calendar">
            <h2>Calendario</h2>
            <div className="calendar-content">
              <iframe
                src={item.calendarUrl}
                title="Calendario"
                style={{ border: 0, width: '100%', height: '250px' }}
              />
            </div>
          </section>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}
