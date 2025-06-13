import React from 'react'
import AppHeader from '../components/AppHeader'
import './Home.css'

const Home: React.FC = () => {
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
        <div className="card">
          <img src="/assets/erp.png" alt="ERP Logo" />
          <h3>Sistema ERP</h3>
          <p>Optimiza tus procesos empresariales con esta solución innovadora.</p>
        </div>
        <div className="card">
          <img src="/assets/erp.png" alt="ERP Logo" />
          <h3>Sistema ERP 2</h3>
          <p>Una alternativa eficiente y escalable para negocios medianos.</p>
        </div>
        <div className="card">
          <img src="/assets/erp.png" alt="ERP Logo" />
          <h3>ERP Modular</h3>
          <p>Flexibilidad total para adaptarse al crecimiento de tu empresa.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
