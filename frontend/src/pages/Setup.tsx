// src/pages/Setup.tsx
import React, { useState } from 'react';
import './Setup.css';
import AppHeader from '../components/AppHeader';
import Footer    from '../components/Footer';
import { useNavigate } from 'react-router-dom';

type Option = { id: number; label: string };

// Pregunta 1: Etapa empresa (selección única)
const STAGES: Option[] = [
  { id: 1, label: 'Startup (etapa inicial)' },
  { id: 2, label: 'PYME consolidada' },
];

// Pregunta 2: Tipo/software (multi)
const SOFT_TYPES: Option[] = [
  { id: 1, label: 'Sistema de gestión general' },
  { id: 2, label: 'Sistema ERP' },
  { id: 3, label: 'Contabilidad/finanzas' },
  { id: 4, label: 'Ventas / CRM' },
  { id: 5, label: 'E-commerce' },
  { id: 6, label: 'Marketing digital' },
  { id: 7, label: 'Innovación / I+D' },
  { id: 8, label: 'Otros (especificar)' },
];

// Pregunta 3: Barreras (multi)
const BARRIERS: Option[] = [
  { id: 1, label: 'Presupuesto limitado / alto costo' },
  { id: 2, label: 'Falta de información para elegir' },
  { id: 3, label: 'Herramientas complejas' },
  { id: 4, label: 'Personal no capacitado' },
  { id: 5, label: 'Falta de tiempo' },
  { id: 6, label: 'Resistencia al cambio' },
  { id: 7, label: 'Preocupaciones de seguridad' },
  { id: 8, label: 'Integración con sistemas actuales' },
  { id: 9, label: 'Falta de soporte local' },
  { id: 10, label: 'No existe solución adecuada' },
];

// Pregunta 4: Necesidades prioritarias (multi)
const NEEDS: Option[] = [
  { id: 1, label: 'Automatizar tareas manuales' },
  { id: 2, label: 'Mejorar seguimiento de ventas' },
  { id: 3, label: 'Control financiero/contable' },
  { id: 4, label: 'Gestionar inventario' },
  { id: 5, label: 'Vender online' },
  { id: 6, label: 'Colaboración interna' },
  { id: 7, label: 'Analizar datos (BI)' },
  { id: 8, label: 'Implementar IA / analítica' },
  { id: 9, label: 'Cumplir normativas' },
  { id: 10, label: 'Otro (especificar)' },
];

export default function Setup() {
  const navigate = useNavigate();

  // Estados de respuestas
  const [stage, setStage] = useState<number | null>(null);
  const [softTypes, setSoftTypes] = useState<Set<number>>(new Set());
  const [barriers, setBarriers]   = useState<Set<number>>(new Set());
  const [needs, setNeeds]         = useState<Set<number>>(new Set());

  // Handlers
  const toggleMulti = (
    id: number,
    setter: React.Dispatch<React.SetStateAction<Set<number>>>
  ) => {
    setter(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleContinue = () => {
    // aquí vas a procesar todas las respuestas
    // console.log({ stage, softTypes: [...softTypes], barriers: [...barriers], needs: [...needs] });
    // p.ej navigate('/questions', { state: { stage, softTypes, barriers, needs }})
    navigate('/suggestions-software');
  };

  // Mostrar WhatsApp en cuanto respondan la primera pregunta
  const showWA = stage !== null;

  return (
    <div className="setup-page">
      <AppHeader />
      <main className="setup-content">
        <h1>¿Qué quieres lograr con CodeMarket?</h1>

        {/* Etapa (única) */}
        <fieldset className="question-block">
          <legend>Etapa de tu empresa:</legend>
          <div className="options-grid">
            {STAGES.map(opt => (
              <button
                key={opt.id}
                className={stage === opt.id ? 'opt-btn selected' : 'opt-btn'}
                onClick={() => setStage(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Mostrar resto sólo si etapa elegida */}
        {stage !== null && (
          <>
            {/* Tipo/software */}
            <fieldset className="question-block">
              <legend>Tipo de software que buscas:</legend>
              <div className="options-grid">
                {SOFT_TYPES.map(opt => (
                  <button
                    key={opt.id}
                    className={softTypes.has(opt.id) ? 'opt-btn selected' : 'opt-btn'}
                    onClick={() => toggleMulti(opt.id, setSoftTypes)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Barreras */}
            <fieldset className="question-block">
              <legend>Principales barreras al adoptar software:</legend>
              <div className="options-grid">
                {BARRIERS.map(opt => (
                  <button
                    key={opt.id}
                    className={barriers.has(opt.id) ? 'opt-btn selected' : 'opt-btn'}
                    onClick={() => toggleMulti(opt.id, setBarriers)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Necesidades */}
            <fieldset className="question-block">
              <legend>Necesidades prioritarias:</legend>
              <div className="options-grid">
                {NEEDS.map(opt => (
                  <button
                    key={opt.id}
                    className={needs.has(opt.id) ? 'opt-btn selected' : 'opt-btn'}
                    onClick={() => toggleMulti(opt.id, setNeeds)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </>
        )}

        {/* Botón Continuar */}
        <button
          className="continue-btn"
          onClick={handleContinue}
          disabled={stage === null || softTypes.size === 0 || barriers.size === 0 || needs.size === 0}
        >
          Continuar
        </button>
      </main>

      {showWA && (
        <a
          href="https://api.whatsapp.com/send?phone=56954615765&text=Necesito%20asesoramiento"
          className="whatsapp-agent"
          target="_blank"
          rel="noreferrer"
        >
          💬 Necesito asesoramiento
        </a>
      )}

      <Footer />
    </div>
  );
}
