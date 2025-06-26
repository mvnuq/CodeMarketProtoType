import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import './SoftwareDetail.css'

interface SoftwareInfo {
  title: string
  desc: string
  img: string
}

const DATA: Record<string, SoftwareInfo> = {
  erp: {
    title: 'Sistema ERP',
    desc: 'Optimiza tus procesos empresariales con esta solución innovadora.',
    img: '/assets/erp.png'
  },
  'erp-2': {
    title: 'Sistema ERP 2',
    desc: 'Una alternativa eficiente y escalable para negocios medianos.',
    img: '/assets/erp.png'
  },
  modular: {
    title: 'ERP Modular',
    desc: 'Flexibilidad total para adaptarse al crecimiento de tu empresa.',
    img: '/assets/erp.png'
  }
}

const SoftwareDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const info = (slug && DATA[slug]) || {
    title: 'No encontrado',
    desc: 'El software que buscas no existe.',
    img: '/assets/erp.png'
  }

  return (
    <div className="detail-page">
      <AppHeader />
      <div className="detail-content">
        <img src={info.img} alt={info.title} />
        <h1>{info.title}</h1>
        <p>{info.desc}</p>
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      </div>
    </div>
  )
}

export default SoftwareDetail
