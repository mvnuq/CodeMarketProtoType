import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import Footer    from '../components/Footer';
import './PublishSoftware.css';

export default function PublishSoftware() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<{ 
    title?: string;
    label?: string;
    desc?: string;
    icons?: string[];
  }>({});

  const nav = useNavigate();

  const handleChange = (field: keyof typeof data, value: string) => {
    setData(d => ({ ...d, [field]: field === 'icons' 
      ? value.split(',').map(s => s.trim()).filter(Boolean) 
      : value 
    }));
  };

  const handleFinish = () => {
    console.log('Publicando software:', data);
    nav('/home');
  };

  return (
    <div className="publish-page">
      <AppHeader />
      <main className="publish-content">
        <h1>Publicar un software</h1>

        {/* Paso 1 */}
        {step === 1 && (
          <section className="publish-step">
            <h2>1. Datos básicos</h2>
            <input
              type="text"
              placeholder="Nombre del software"
              value={data.title || ''}
              onChange={e => handleChange('title', e.target.value)}
            />
            <input
              type="text"
              placeholder="Etiqueta / Categoría"
              value={data.label || ''}
              onChange={e => handleChange('label', e.target.value)}
            />
            <button
              onClick={() => setStep(2)}
              disabled={!data.title || !data.label}
            >
              Siguiente
            </button>
          </section>
        )}

        {/* Paso 2 */}
        {step === 2 && (
          <section className="publish-step">
            <h2>2. Descripción</h2>
            <textarea
              placeholder="Descripción detallada"
              value={data.desc || ''}
              onChange={e => handleChange('desc', e.target.value)}
            />
            <button
              onClick={() => setStep(3)}
              disabled={!data.desc}
            >
              Siguiente
            </button>
          </section>
        )}

        {/* Paso 3 */}
        {step === 3 && (
          <section className="publish-step">
            <h2>3. Íconos y stack</h2>
            <input
              type="text"
              placeholder="URLs de íconos (coma-separado)"
              value={data.icons?.join(', ') || ''}
              onChange={e => handleChange('icons', e.target.value)}
            />
            <button
              onClick={() => setStep(4)}
              disabled={!data.icons || data.icons.length === 0}
            >
              Siguiente
            </button>
          </section>
        )}

        {/* Paso 4 */}
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
