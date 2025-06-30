import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import Footer    from '../components/Footer';
import './SignupPage.css';

export default function SignupPage() {
  const navigate = useNavigate();

  const [role,    setRole]    = useState<'dev'|'biz' | ''>('');
  const [acct,    setAcct]    = useState<'company'|'personal' | ''>('');
  const [email,   setEmail]   = useState('');
  const [pass,    setPass]    = useState('');
  const [error,   setError]   = useState<string|null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !acct || !email || pass.length < 6) {
      setError('Por favor completa todos los campos y contraseña ≥6 caracteres');
      return;
    }
    // Aquí harías tu llamada real al backend...
    console.log({ role, acct, email });
    // Simula éxito y redirige a login
    alert('¡Registro exitoso!');
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <AppHeader/>
      <main className="signup-content">
        <form className="signup-card" onSubmit={handleSubmit}>
          <h1>Crear cuenta</h1>

          {/* Role */}
          <div className="field-group">
            <label>¿Eres…?</label>
            <div className="radios">
              <label>
                <input
                  type="radio" name="role" value="biz"
                  checked={role==='biz'} onChange={()=>setRole('biz')}
                />
                Emprendedor
              </label>
              <label>
                <input
                  type="radio" name="role" value="dev"
                  checked={role==='dev'} onChange={()=>setRole('dev')}
                />
                Desarrollador
              </label>
            </div>
          </div>

          {/* Account type */}
          <div className="field-group">
            <label>Tipo de cuenta:</label>
            <div className="radios">
              <label>
                <input
                  type="radio" name="acct" value="personal"
                  checked={acct==='personal'} onChange={()=>setAcct('personal')}
                />
                Personal
              </label>
              <label>
                <input
                  type="radio" name="acct" value="company"
                  checked={acct==='company'} onChange={()=>setAcct('company')}
                />
                Empresa
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="field-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="field-group">
            <input
              type="password"
              placeholder="Contraseña (mín. 6 caracteres)"
              value={pass}
              onChange={e=>setPass(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn-submit">Registrarme</button>

          <p className="to-login">
            ¿Ya tienes cuenta?{' '}
            <span className="link" onClick={()=>navigate('/login')}>
              Inicia sesión
            </span>
          </p>
        </form>
      </main>
      <Footer/>
    </div>
  );
}
