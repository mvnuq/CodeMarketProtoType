// src/components/CategorySection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './CategorySection.css';

export type CatItem = { id: number; name: string; icon: string };
export type CatSection = { title: string; items: CatItem[] };

type Props = { section: CatSection };

export default function CategorySection({ section }: Props) {
  const navigate = useNavigate();

  const goDetail = (item: CatItem) => {
    navigate(`/software/${item.id}`, { state: { item } });
  };

  return (
    <section className="cm-cat">
      <h2>{section.title}</h2>
      <div className="cm-cat-grid">
        {section.items.map(item => (
          <motion.div
            key={item.id}
            className="cm-cat-item"
            whileHover={{ y: -5, backgroundColor: '#6A37A1' }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => goDetail(item)}                // <-- aquí
          >
            <img src={item.icon} alt={item.name} />
            <span>{item.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
