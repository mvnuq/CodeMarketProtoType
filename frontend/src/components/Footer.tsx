import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  return (
    <motion.footer
      className="cm-footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="cm-footer-inner">
        <div>© 2025 CodeMarket</div>
        <nav>
          <a href="#privacy">Privacidad</a>
          <a href="#terms">Términos</a>
          <a href="#help">Ayuda</a>
        </nav>
      </div>
    </motion.footer>
  );
}
