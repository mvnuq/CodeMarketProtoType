import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BannerSlider.css';

export type Slide = {
  id: string;
  variant: 'software' | 'dev';
  title: React.ReactNode;
  btnText: string;
  action: () => void;
};

export default function BannerSlider({
  slidesConfig
}: {
  slidesConfig: Slide[];
}) {
  const [idx, setIdx] = useState(0);
  const count = slidesConfig.length;

  // Autoplay opcional
  useEffect(() => {
    const iv = setInterval(() => setIdx(i => (i + 1) % count), 8000);
    return () => clearInterval(iv);
  }, [count]);

  const prev = () => setIdx(i => (i - 1 + count) % count);
  const next = () => setIdx(i => (i + 1) % count);

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 100 : -100 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir < 0 ? 100 : -100 })
  };

  return (
    <div className="slider-container">
      <button className="slider-nav prev" onClick={prev}>‹</button>
      <button className="slider-nav next" onClick={next}>›</button>

      <AnimatePresence initial={false} custom={idx}>
        <motion.div
          key={slidesConfig[idx].id}
          className={`banner banner--${slidesConfig[idx].variant}`}
          custom={1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          <div className="banner-inner">
            <h1 className="banner-title">
              {slidesConfig[idx].title}
            </h1>
            <button
              className={`banner-btn banner-btn--${slidesConfig[idx].variant}`}
              onClick={slidesConfig[idx].action}
            >
              {slidesConfig[idx].btnText}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
