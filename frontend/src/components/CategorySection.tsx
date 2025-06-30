import React from 'react';
import './CategorySection.css';
import { useNavigate } from 'react-router-dom';

export type CatItem = {
  id: number;
  name: string;
  icon: string;
  description: string;
};

export type CatSection = {
  title: string;
  items: CatItem[];
};

type Props = { section: CatSection };

export default function CategorySection({ section }: Props) {
  const navigate = useNavigate();

  return (
    <section className="category-section">
      <h2>{section.title}</h2>
      <div className="category-grid">
        {section.items.map((item) => (
          <div
            key={item.id}
            className="software-card"
            onClick={() => navigate(`/software/${item.id}`, { state: { item } })}
          >
            <img className="software-illustration" src={item.icon} alt={item.name} />
            <div className="software-info">
              <h3 className="software-title">{item.name}</h3>
              <p className="software-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
