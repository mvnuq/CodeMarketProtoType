// src/pages/Home.tsx
import React from 'react';
import AppHeader from '../components/AppHeader';
import BannerSlider, { Slide } from '../components/BannerSlider';
import CategorySection, { CatSection } from '../components/CategorySection';
import data from '../data/categories.json';
import ChatBot from '../components/ChatBot';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const nav = useNavigate();

  const slides: Slide[] = [
    {
      id: 's1',
      variant: 'software',
      title: <>Encuentra<br/><span>Tu software</span></>,
      btnText: 'No sé cómo comenzar',
      action: () => nav('/setup'),
    },
    {
      id: 's2',
      variant: 'dev',
      title: <>¿Buscas<br/><span>nuevos clientes?</span></>,
      btnText: '¡Sí! Tengo un sistema',
      action: () => nav('/setup-dev'),
    }
  ];

  return (
    <div className="home-page">
      <AppHeader />
      <BannerSlider slidesConfig={slides} />
      {(data as CatSection[])?.map(sec =>
        <CategorySection key={sec.title} section={sec} />
      )}
      <ChatBot />
      <Footer />
    </div>
  );
}
