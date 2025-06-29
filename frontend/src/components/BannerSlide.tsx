// src/components/BannerCarousel.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './BannerCarousel.css';
import { useNavigate } from 'react-router-dom';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper';

export default function BannerCarousel() {
  const nav = useNavigate();

  const slides = [
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
    },
  ];

  return (
    <div className="carousel-wrapper">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        effect="fade"
        pagination={{ clickable: true }}
        navigation
        loop
      >
        {slides.map(s => (
          <SwiperSlide key={s.id}>
            <div className={`banner banner--${s.variant}`}>
              <div className="banner-inner">
                <h1 className="banner-title">{s.title}</h1>
                <button
                  className={`banner-btn banner-btn--${s.variant}`}
                  onClick={s.action}
                >
                  {s.btnText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
