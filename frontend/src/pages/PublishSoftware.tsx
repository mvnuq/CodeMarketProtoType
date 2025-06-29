// src/pages/PublishSoftware.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import Footer    from '../components/Footer';
import './PublishSoftware.css';

export default function PublishSoftware() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<any>({});
  const nav = useNavigate();

  const handleNext = (partial: any) => {
    // setData(d => ({ ...d, ...partial }));
    setStep(s => s + 1);
  };

  const handleFinish = () => {
    // aquí enviarías `data` a tu API
    console.log('Publicando software:', data);
    nav('/home');
  };

  return (
    <div className="publish-page">
      <AppHeader />
      <main className="publish-content">
        <h1>Publicar un software</h1>

        {step === 1 && (
          <section className="publish-step">
            <h2>1. Datos básicos</h2>
            <input
              type="text"
              placeholder="Nombre del software"
              onChange={e => handleNext({ title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Etiqueta / Categoría"
              onChange={e => handleNext({ label: e.target.value })}
            />
            <button onClick={() => setStep(2)} disabled={!data.title}>
              Siguiente
            </button>
          </section>
        )}

        {step === 2 && (
          <section className="publish-step">
            <h2>2. Descripción</h2>
            <textarea
              placeholder="Descripción detallada"
              onChange={e => handleNext({ desc: e.target.value })}
            />
            <button onClick={() => setStep(3)} disabled={!data.desc}>
              Siguiente
            </button>
          </section>
        )}

        {step === 3 && (
          <section className="publish-step">
            <h2>3. Íconos y stack</h2>
            <input
              type="text"
              placeholder="URLs de íconos (coma-separado)"
              onChange={e => handleNext({ icons: e.target.value.split(',') })}
            />
            <button onClick={() => setStep(4)} disabled={!data.icons}>
              Siguiente
            </button>
          </section>
        )}

        {step === 4 && (
          <section className="publish-step">
            <h2>4. Revisión y envío</h2>
            <pre className="publish-review">
              {JSON.stringify(data, null, 2)}
            </pre>
            <button onClick={handleFinish}>
              Enviar para revisión
            </button>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
