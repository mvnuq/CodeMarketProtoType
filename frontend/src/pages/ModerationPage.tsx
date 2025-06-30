// src/pages/ModerationPage.tsx
import React, { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';
import Footer    from '../components/Footer';
import './ModerationPage.css';

type Pending = { id: number; title: string; desc: string };
const STORAGE_KEY = 'pending_publications';

function loadPending(): Pending[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
function savePending(list: Pending[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function ModerationPage() {
  const [pending, setPending] = useState<Pending[]>([]);

  useEffect(() => {
    const loaded = loadPending();
    if (loaded.length === 0) {
      const demo: Pending[] = [
        { id: 1, title: 'NewApp',   desc: 'Una nueva app de demo.' },
        { id: 2, title: 'CoolTool', desc: 'Herramienta súper cool.' },
        { id: 3, title: 'ERPPro',   desc: 'ERP para PYMEs.' },
      ];
      savePending(demo);
      setPending(demo);
    } else {
      setPending(loaded);
    }
  }, []);

  const handleApprove = (id: number) => {
    const next = pending.filter(x => x.id !== id);
    savePending(next);
    setPending(next);
    alert(`✅ Publicación ${id} aprobada.`);
  };
  const handleReject = (id: number) => {
    const next = pending.filter(x => x.id !== id);
    savePending(next);
    setPending(next);
    alert(`❌ Publicación ${id} rechazada.`);
  };

  return (
    <div className="mod-page">
      <AppHeader/>
      <main className="mod-content">
        <h1>Panel de Moderación</h1>
        {pending.length === 0 ? (
          <p className="mod-empty">🎉 ¡No hay publicaciones pendientes!</p>
        ) : (
          <div className="mod-grid">
            {pending.map(item => (
              <div key={item.id} className="mod-card">
                <div className="mod-header">
                  <h2>{item.title}</h2>
                  <span className="mod-id">#{item.id}</span>
                </div>
                <p className="mod-desc">{item.desc}</p>
                <div className="mod-actions">
                  <button className="btn-approve" onClick={()=>handleApprove(item.id)}>
                    Aprobar
                  </button>
                  <button className="btn-reject" onClick={()=>handleReject(item.id)}>
                    Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer/>
    </div>
  );
}
