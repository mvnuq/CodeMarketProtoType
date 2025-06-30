import React, { useState } from 'react';
import './PaymentModal.css';

export type PaymentInfo = {
  planId: number;
  planDesc: string;
  price: number;
};

export default function PaymentModal({
  info,
  onSuccess,
  onCancel
}: {
  info: PaymentInfo;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    // Simula el procesamiento de pago
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="pm-overlay">
      <div className="pm-modal">
        <h2>Procesar pago</h2>
        <p>
          <strong>Plan:</strong> {info.planDesc}
        </p>
        <p>
          <strong>Precio:</strong> {info.price.toLocaleString()} CLP
        </p>

        <button
          className="pm-btn pm-btn--pay"
          onClick={handlePay}
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Pagar ahora'}
        </button>
        <button
          className="pm-btn pm-btn--cancel"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
