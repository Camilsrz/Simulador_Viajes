import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../auth.css';

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="info">
        <p className="txt-1">Gracias por visitarnos</p>
        <h2>Bienvenidos</h2>
        <hr />
        <p className="txt-2">
          Prepárate para embarcarte en una experiencia única donde podrás explorar destinos increíbles,
          descubrir culturas fascinantes y vivir aventuras inolvidables.
        </p>
      </div>

      <div className="form">
        {showLogin ? (
          <>
            <LoginForm onAuth={() => window.location.reload()} />
            <p>
              ¿No tienes cuenta?{' '}
              <a href="#" onClick={() => setShowLogin(false)}>Regístrate aquí</a>
            </p>
          </>
        ) : (
          <>
            <RegisterForm onAuth={() => setShowLogin(true)} />
            <p>
              ¿Ya tienes cuenta?{' '}
              <a href="#" onClick={() => setShowLogin(true)}>Inicia sesión</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

