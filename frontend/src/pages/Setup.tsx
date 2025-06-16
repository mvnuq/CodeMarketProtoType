// src/pages/Setup.tsx
import React, { useState } from 'react';
import './Setup.css';
import AppHeader from '../components/AppHeader';
import Footer    from '../components/Footer';

type Option = { id: number; label: string };

const OPTIONS: Option[] = [
  { id: 1, label: 'Quiero gestionar inventario' },
  { id: 2, label: 'Necesito facturación electrónica' },
  { id: 3, label: 'Busco control de proyectos' },
  { id: 4, label: 'Otros…' },
];

export default function Setup() {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleContinue = () => {
    // próximamente: cargar preguntas según `selected`
    console.log('Seleccionados:', Array.from(selected));
    // p. ej. navigate('/questions', { state: { selected: Array.from(selected) } })
  };

  return (
    <div className="setup-page">
      <AppHeader />

      <main className="setup-content">
        <h1>¿Qué quieres lograr con CodeMarket?</h1>
        <p>Selecciona todas las opciones que apliquen:</p>

        <div className="options-grid">
          {OPTIONS.map(opt => (
            <button
              key={opt.id}
              className={selected.has(opt.id) ? 'opt-btn selected' : 'opt-btn'}
              onClick={() => toggle(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button
          className="continue-btn"
          onClick={handleContinue}
          disabled={selected.size === 0}
        >
          Continuar
        </button>
      </main>

      <Footer />
    </div>
  );
}
