import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './CategorySection.css';

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

const containerVariants: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

type Props = { section: CatSection };

export default function CategorySection({ section }: Props) {
  const navigate = useNavigate();

  return (
    <section className="p-6 bg-[#0b0e3b]">
      <h2 className="text-white italic mb-4">{section.title}</h2>

      {/* <- Aquí volvemos a usar el grid de Tailwind */}
      <motion.div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-6
          gap-2
        "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {section.items.map((item) => (
          <motion.div
            key={item.id}
            className="cm-cat-item"
            variants={itemVariants}
            whileHover="visible"
            whileTap="visible"
            onClick={() => navigate(`/software/${item.id}`, { state: { item } })}
          >
            {/* Estado normal */}
            <div className="normal-content">
              <div className="cat-icon-wrapper">
                <img src={item.icon} alt={item.name} />
              </div>
              <div className="cat-name">{item.name}</div>
            </div>

            {/* Estado hover: card-side */}
            <div className="hover-overlay">
              <div className="hover-img">
                <img src={item.icon} alt={item.name} />
              </div>
              <div className="hover-content">
                <h3>{item.name}</h3>
                <p className="hover-desc">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
