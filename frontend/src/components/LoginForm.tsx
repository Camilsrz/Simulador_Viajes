import React, { useState } from 'react';
import { api } from '../api/api';

export default function LoginForm({ onAuth }: { onAuth?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setMsg('Ingreso exitoso');
      onAuth?.();
    } catch (err: any) {
      setMsg(err.response?.data?.error || err.message);
    }
  };

  return (
    <>
      <h2>Ingresa</h2>
      <p>Inicia sesión para continuar explorando el mundo sin límites.</p>
      <form onSubmit={handle} className="inputs">
        <input
          type="email"
          className="box"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="box"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <a href="#">¿Olvidaste tu contraseña?</a>
        <input type="submit" value="Ingresar" className="submit" />
        {msg && <p className="msg">{msg}</p>}
      </form>
    </>
  );
}


