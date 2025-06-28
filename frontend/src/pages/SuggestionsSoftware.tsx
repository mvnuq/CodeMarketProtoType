// src/pages/SuggestionsSoftware.tsx
import React from 'react';
import AppHeader from '../components/AppHeader';
import Footer    from '../components/Footer';
import CategorySection, { CatSection } from '../components/CategorySection';
import data      from '../data/categories.json';
import './Suggestions.css';

export default function SuggestionsSoftware() {
  return (
    <div className="suggestions-page">
      <AppHeader />
      <main className="suggestions-content">
        <h1>Software recomendado para ti</h1>
        {(data as CatSection[]).map(section => (
          <CategorySection key={section.title} section={section} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
