// src/pages/SetupDev.tsx
import React, { useState } from 'react';
import './Setup.css';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

type Option = { id: number; label: string };

// Bloques de preguntas
const TECHNOLOGIES: Option[] = [
  { id: 1, label: 'Node.js / Java / .NET / Python / PHP / Ruby' },
  { id: 2, label: 'React / Angular / Vue / HTML/CSS/JS' },
  { id: 3, label: 'Android (Java/Kotlin) / iOS (Swift/Obj-C)' },
  { id: 4, label: 'Flutter / React Native / Ionic' },
  { id: 5, label: 'MySQL/PostgreSQL / MongoDB / Otros' },
  { id: 6, label: 'AWS / Azure / Google Cloud' },
  { id: 7, label: 'IA/ML / IoT / Blockchain' },
  { id: 8, label: 'Otros lenguajes o frameworks' },
];

const SOLUTION_TYPES: Option[] = [
  { id: 1, label: 'Aplicaciones web / SaaS' },
  { id: 2, label: 'Aplicaciones móviles' },
  { id: 3, label: 'Sistemas de escritorio' },
  { id: 4, label: 'Integraciones / APIs' },
  { id: 5, label: 'E-commerce / Marketplaces' },
  { id: 6, label: 'ERP / CRM / Contabilidad' },
  { id: 7, label: 'Análisis de datos / BI' },
  { id: 8, label: 'Otros (videojuegos, embebido, etc.)' },
];

const INDUSTRIES: Option[] = [
  { id: 1, label: 'Retail / Comercio' },
  { id: 2, label: 'Manufactura / Producción' },
  { id: 3, label: 'Finanzas / Fintech' },
  { id: 4, label: 'Educación / Edtech' },
  { id: 5, label: 'Salud / e-salud' },
  { id: 6, label: 'Logística / Transporte' },
  { id: 7, label: 'Gobierno / Sector público' },
  { id: 8, label: 'Agricultura / Agro' },
  { id: 9, label: 'Servicios profesionales' },
  { id: 10, label: 'Otros sectores' },
];

const STRENGTHS: Option[] = [
  { id: 1, label: 'UX/UI amigable' },
  { id: 2, label: 'Integración con sistemas' },
  { id: 3, label: 'Personalización a medida' },
  { id: 4, label: 'Seguridad y cumplimiento' },
  { id: 5, label: 'Escalabilidad y rendimiento' },
  { id: 6, label: 'Innovación tecnológica' },
  { id: 7, label: 'Soporte y capacitación' },
  { id: 8, label: 'Conocimiento del negocio' },
  { id: 9, label: 'Costo accesible' },
  { id: 10, label: 'Otras fortalezas' },
];

const LICENSE_MODELS: Option[] = [
  { id: 1, label: 'SaaS (suscripción)' },
  { id: 2, label: 'Licencia perpetua' },
  { id: 3, label: 'Open Source' },
  { id: 4, label: 'Freemium' },
  { id: 5, label: 'Desarrollo a medida' },
  { id: 6, label: 'Pago por usuario/asiento' },
  { id: 7, label: 'Pago por uso/consumo' },
  { id: 8, label: 'Otros esquemas' },
];

const SUPPORT_TYPES: Option[] = [
  { id: 1, label: 'Soporte 24/7' },
  { id: 2, label: 'Soporte horario laboral' },
  { id: 3, label: 'Capacitación inicial' },
  { id: 4, label: 'Documentación y FAQs' },
  { id: 5, label: 'Actualizaciones periódicas' },
  { id: 6, label: 'Soporte in-situ' },
  { id: 7, label: 'Acuerdos de nivel de servicio (SLA)' },
  { id: 8, label: 'Otros tipos de soporte' },
];

export default function SetupDev() {
  const navigate = useNavigate();

  // estados de selección múltiple
  const [tech, setTech] = useState<Set<number>>(new Set());
  const [sol, setSol] = useState<Set<number>>(new Set());
  const [ind, setInd] = useState<Set<number>>(new Set());
  const [str, setStr] = useState<Set<number>>(new Set());
  const [lic, setLic] = useState<Set<number>>(new Set());
  const [sup, setSup] = useState<Set<number>>(new Set());

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

  // habilita continuar sólo si todas las preguntas tienen al menos una opción
  const canContinue =
    tech.size > 0 &&
    sol.size > 0 &&
    ind.size > 0 &&
    str.size > 0 &&
    lic.size > 0 &&
    sup.size > 0;

  const handleContinue = () => {
    // aquí procesas / envías las respuestas
    // navigate('/software'); // o la ruta que siga
    navigate('/suggestions-clients');
  };

  // mostramos enlace a WhatsApp tras la primera selección
  const showWA = tech.size > 0;

  return (
    <div className="setup-page">
      <AppHeader />
      <main className="setup-content">
        <h1>Formulario para Desarrolladores de Software</h1>

        {/* Tecnologías */}
        <fieldset className="question-block">
          <legend>Tecnologías y stacks dominados</legend>
          <div className="options-grid">
            {TECHNOLOGIES.map(o => (
              <button
                key={o.id}
                className={tech.has(o.id) ? 'opt-btn selected' : 'opt-btn'}
                onClick={() => toggleMulti(o.id, setTech)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Mostrar resto sólo si respondieron Tecnologías */}
        {tech.size > 0 && (
          <>
            {/* Tipos de solución */}
            <fieldset className="question-block">
              <legend>Tipo de soluciones desarrolladas</legend>
              <div className="options-grid">
                {SOLUTION_TYPES.map(o => (
                  <button
                    key={o.id}
                    className={sol.has(o.id) ? 'opt-btn selected' : 'opt-btn'}
                    onClick={() => toggleMulti(o.id, setSol)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Industrias */}
            <fieldset className="question-block">
              <legend>Industrias o sectores atendidos</legend>
              <div className="options-grid">
                {INDUSTRIES.map(o => (
                  <button
                    key={o.id}
                    className={ind.has(o.id) ? 'opt-btn selected' : 'opt-btn'}
                    onClick={() => toggleMulti(o.id, setInd)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Fortalezas */}
            <fieldset className="question-block">
              <legend>Principales fortalezas de tu oferta</legend>
              <div className="options-grid">
                {STRENGTHS.map(o => (
                  <button
                    key={o.id}
                    className={str.has(o.id) ? 'opt-btn selected' : 'opt-btn'}
                    onClick={() => toggleMulti(o.id, setStr)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Licenciamiento */}
            <fieldset className="question-block">
              <legend>Modelo de licencia y precios ofrecidos</legend>
              <div className="options-grid">
                {LICENSE_MODELS.map(o => (
                  <button
                    key={o.id}
                    className={lic.has(o.id) ? 'opt-btn selected' : 'opt-btn'}
                    onClick={() => toggleMulti(o.id, setLic)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Soporte */}
            <fieldset className="question-block">
              <legend>Tipo de soporte ofrecido</legend>
              <div className="options-grid">
                {SUPPORT_TYPES.map(o => (
                  <button
                    key={o.id}
                    className={sup.has(o.id) ? 'opt-btn selected' : 'opt-btn'}
                    onClick={() => toggleMulti(o.id, setSup)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </>
        )}

        <button
          className="continue-btn"
          onClick={handleContinue}
          disabled={!canContinue}
        >
          Continuar
        </button>
      </main>

      {showWA && (
        <a
          href="https://api.whatsapp.com/send?phone=56954615765&text=Soy%20desarrollador%20y%20necesito%20asesoramiento"
          className="whatsapp-agent"
          target="_blank"
          rel="noreferrer"
        >
          💬 Asesoría para desarrolladores
        </a>
      )}

      <Footer />
    </div>
  );
}
