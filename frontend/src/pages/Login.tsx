import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import users from '../data/users.json';

type User = { email: string; password: string; role: 'dev' | 'user' };

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = (users as User[]).find(u => u.email === email && u.password === pass);
    if (!found) {
      setError('Email o contraseña incorrectos');
      return;
    }
    // Guardamos en localStorage (o tu contexto real)
    localStorage.setItem('cm_user', JSON.stringify({ email: found.email, role: found.role }));
    setError('');
    navigate('/home');
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h2 className="login-title">Inicia sesión en CodeMarket</h2>
        {error && <p className="login-error">{error}</p>}

        <label className="login-label">
          <span>Correo electrónico</span>
          <div className="login-input-wrap">
            <span className="login-icon">👤</span>
            <input
              type="email"
              className="login-input"
              placeholder="usuario@dominio.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </label>

        <label className="login-label">
          <span>Contraseña</span>
          <div className="login-input-wrap">
            <span className="login-icon">🔒</span>
            <input
              type={showPass ? 'text' : 'password'}
              className="login-input"
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
            <button
              type="button"
              className="login-eye-btn"
              onClick={() => setShowPass(v => !v)}
            >
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </label>

        <button type="submit" className="login-btn">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
