import React from 'react';
import AppHeader from '../components/AppHeader';
import Footer    from '../components/Footer';
import companies from '../data/companies.json';
import './Suggestions.css';

export default function SuggestionsClients() {
  return (
    <div className="suggestions-page">
      <AppHeader />
      <main className="suggestions-content">
        <h1>Empresas en busca de soluciones</h1>
        <div className="clients-grid">
          {companies?.map(c => (
            <div key={c.id} className="client-card">
              <div className="client-icon">🏢</div>
              <h3 className="client-title">{c.name}</h3>
              <p className="client-industry">{c.industry}</p>
              <ul className="client-issues">
                {c.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
