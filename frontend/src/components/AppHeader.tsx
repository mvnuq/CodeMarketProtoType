import React from 'react';
import './AppHeader.css';

export default function AppHeader() {
  return (
    <header className="cm-header">
      <div className="cm-header-inner">
        <img src="/assets/logo-codemarket.png" alt="CodeMarket" className="cm-logo" />
        <div className="cm-search">
          <input type="text" placeholder="Busca tu software..." />
          <button>🔍</button>
        </div>
        <button className="cm-user">👤</button>
      </div>
    </header>
  );
}
