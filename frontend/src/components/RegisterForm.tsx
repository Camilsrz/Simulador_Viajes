import React, { useState } from 'react';
import { api } from '../api/api';

export default function RegisterForm({ onAuth }: { onAuth?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password, name });
      setMsg('Registro exitoso');
      setEmail(''); setPassword(''); setName('');
      setTimeout(() => onAuth?.(), 1500); // redirige al login
    } catch (err: any) {
      setMsg(err.response?.data?.error || err.message);
    }
  };

  return (
    <>
      <h2>Regístrate</h2>
      <p>Crea una cuenta para comenzar tu próxima aventura.</p>
      <form onSubmit={handle} className="inputs">
        <input
          type="text"
          className="box"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
          placeholder="Crea tu contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit" value="Registrarse" className="submit" />
        {msg && <p className="msg">{msg}</p>}
      </form>
    </>
  );
}



