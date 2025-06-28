import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import data from '../data/software-items.json';
import './SearchResults.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery().get('q')?.toLowerCase() || '';
  const results = data.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.desc.toLowerCase().includes(query)
  );

  return (
    <div className="search-page">
      <h1>Resultados para "{query}"</h1>
      {results.length === 0 ? (
        <p className="no-results">No se encontraron coincidencias.</p>
      ) : (
        <ul className="results-list">
          {results.map(item => (
            <li key={item.id} className="result-card">
              <Link to={`/software/${item.id}`}>
                <img src={item.companyLogo} alt={`${item.title} logo`} className="result-logo" />
                <div className="result-info">
                  <h2>{item.title}</h2>
                  <p>{item.desc}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
