import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import './AppHeader.css';
import { useAuth } from '../auth/useAuth';

export default function AppHeader() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const nav = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate({
        pathname: '/search',
        search: createSearchParams({ q: query.trim() }).toString()
      });
      setQuery('');
    }
  };

  return (
    <header className="cm-header">
      <div className="cm-header-inner">
        <img src="/assets/logo-codemarket.png" alt="CodeMarket" className="cm-logo" />

        <form className="cm-search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Busca tu software..."
            aria-label="Buscar software"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="Buscar">
            <img src="/assets/icons/search.png" alt="" className="cm-icon cm-icon--search" />
          </button>
        </form>

          <button
            className="cm-publish-btn"
            onClick={() => navigate('/publish-software')}
          >
            📤 Publicar software
          </button>

        <button className="cm-user" aria-label="Perfil de usuario">
          <img src="/assets/icons/user.png" alt="" className="cm-icon cm-icon--user" />
        </button>
      </div>
    </header>
  );
}
