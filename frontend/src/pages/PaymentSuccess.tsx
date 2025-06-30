import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../data/software-items.json';
import './PaymentSuccess.css';

export default function PaymentSuccess() {
  const { id } = useParams<{id:string;}>();
  const navigate = useNavigate();
  const item = data.find(d => d.id === Number(id));

  return (
    <div className="psu-page">
      <h1>¡Pago exitoso!</h1>
      {item && (
        <p>
          Gracias por adquirir <strong>{item.title}</strong>.<br/>
          Nuestro equipo se comunicará contigo en las próximas 24 horas.
        </p>
      )}
      <button className="psu-btn" onClick={() => navigate('/home')}>
        Volver al inicio
      </button>
    </div>
  );
}
    