// src/pages/Home.tsx

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import './Home.css'

const Home: React.FC = () => {
  const navigate = useNavigate()

  // Parallax sutil en el header
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY / 4
      const headerEl = document.querySelector('.header') as HTMLElement
      if (headerEl) headerEl.style.backgroundPosition = `center ${y}px`
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const softwareItems = [
    {
      img: '/assets/erp.png',
      title: 'Sistema ERP',
      desc: 'Optimiza tus procesos empresariales con esta solución innovadora.',
      link: '/software/erp'
    },
    {
      img: '/assets/erp.png',
      title: 'Sistema ERP 2',
      desc: 'Una alternativa eficiente y escalable para negocios medianos.',
      link: '/software/erp-2'
    },
    {
      img: '/assets/erp.png',
      title: 'ERP Modular',
      desc: 'Flexibilidad total para adaptarse al crecimiento de tu empresa.',
      link: '/software/modular'
    }
  ]

  return (
    <div className="modern-home">
      <AppHeader />

      <header className="header">
        <h1 className="animated-title">
          Encuentra <span>tu software</span>
        </h1>
        <p>Soluciones diseñadas para transformar tu negocio digitalmente.</p>
      </header>

      <div className="software-grid">
        {softwareItems.map((item, i) => (
          <div className="card" key={i}>
            <img src={item.img} alt={`${item.title} Logo`} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <button
              className="btn-discover"
              onClick={() => navigate(item.link)}
            >
              Ver más
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
