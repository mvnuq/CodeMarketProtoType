import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PaymentSimulation.css';

export default function PaymentSimulation() {
  const { id, planId } = useParams<{id:string;planId:string;}>();
  const navigate       = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(`/software/${id}/success`);
    }, 2000);
    return () => clearTimeout(t);
  }, [id, navigate]);

  return (
    <div className="ps-page">
      <div className="ps-card">
        <h2>Procesando pago…</h2>
        <p>Plan #{planId}</p>
        <div className="ps-spinner" />
      </div>
    </div>
  );
}
