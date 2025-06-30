// src/pages/MySoftware.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/software-items.json';
import AppHeader from '../components/AppHeader';
import Footer    from '../components/Footer';
import './MySoftware.css';

type SoftwareItem = {
  id: number;
  title: string;
  desc: string;
  icon: string;
};

type Review = {
  rating: number;
  comment: string;
};

export default function MySoftware() {
  const navigate = useNavigate();

  // Lista de software “comprados” (o forzamos el primero si está vacío)
  const [mine, setMine] = useState<SoftwareItem[]>([]);
  // Estado de reseñas del usuario, clave = software id
  const [reviews, setReviews] = useState<Record<number, Review>>({});
  // ID del software cuyo formulario está abierto
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const purchased: number[] = JSON.parse(localStorage.getItem('purchased') || '[]');
    let list = (data as SoftwareItem[]).filter(s => purchased.includes(s.id));
    if (list.length === 0 && (data as SoftwareItem[]).length > 0) {
      list = [(data as SoftwareItem[])[0]];
    }
    setMine(list);

    // Carga reseñas previas de localStorage
    const loaded: Record<number, Review> = {};
    list.forEach(s => {
      const r = localStorage.getItem(`review_${s.id}`);
      if (r) loaded[s.id] = JSON.parse(r);
    });
    setReviews(loaded);
  }, []);

  // Cuando el usuario hace click en “Dejar/Editar reseña”
  const openEditor = (id: number) => {
    setEditingId(id);
  };

  // Guardar reseña en estado y localStorage
  const saveReview = (id: number, rating: number, comment: string) => {
    const newReviews = { ...reviews, [id]: { rating, comment } };
    setReviews(newReviews);
    localStorage.setItem(`review_${id}`, JSON.stringify({ rating, comment }));
    setEditingId(null);
  };

  return (
    <div className="mysoft-page">
      <AppHeader/>
      <main className="mysoft-content">
        <h1>Mis software</h1>

        <div className="mysoft-grid">
          {mine.map(s => {
            const rev = reviews[s.id];
            const isEditing = editingId === s.id;

            return (
              <div key={s.id} className="mysoft-card">
                <img
                  src={s.icon}
                  alt={s.title}
                //   onError={e => { }}
                />
                <div className="mysoft-info">
                  <h2>{s.title}</h2>
                  <p>{s.desc}</p>

                  {!isEditing ? (
                    <>
                      {rev && (
                        <div className="mysoft-user-review">
                          <div className="stars">
                            {Array.from({ length: 5 }, (_, i) => i + 1).map(n => (
                              <span
                                key={n}
                                className={n <= rev.rating ? 'star filled' : 'star'}
                              >★</span>
                            ))}
                          </div>
                          <p className="user-comment">“{rev.comment}”</p>
                        </div>
                      )}

                      <button
                        className="btn-secondary"
                        onClick={() => openEditor(s.id)}
                      >
                        {rev ? 'Editar mi reseña' : 'Dejar mi reseña'}
                      </button>
                    </>
                  ) : (
                    <ReviewForm
                      initial={rev}
                      onCancel={() => setEditingId(null)}
                      onSave={(rating, comment) => saveReview(s.id, rating, comment)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

// Formulario inline como componente hijo
type FormProps = {
  initial?: Review;
  onSave: (rating: number, comment: string)=>void;
  onCancel: ()=>void;
};

function ReviewForm({ initial, onSave, onCancel }: FormProps) {
  const [rating, setRating] = useState(initial?.rating || 0);
  const [comment, setComment] = useState(initial?.comment || '');

  return (
    <div className="review-form-inline">
      <div className="stars">
        {Array.from({ length: 5 }, (_, i) => i + 1).map(n => (
          <span
            key={n}
            className={n <= rating ? 'star filled' : 'star'}
            onClick={() => setRating(n)}
          >★</span>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Tu opinión..."
      />
      <div className="review-actions">
        <button
          className="btn-primary"
          disabled={rating===0||!comment.trim()}
          onClick={() => onSave(rating, comment)}
        >
          Guardar
        </button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}
