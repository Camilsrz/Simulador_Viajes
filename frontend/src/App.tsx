import React, { useState } from 'react';
import TravelForm from './components/TravelForm';
import TravelList from './components/TravelList';
import AuthPage from './pages/AuthPage';
import './index.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const token = localStorage.getItem('token');

  const onCreated = () => {
    setRefreshKey(k => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <>
      {!token ? (
        <AuthPage />
      ) : (
        <div className="container">
          <header>
            <h1>Travel Planner</h1>
            <button onClick={logout} className="btn-logout">Cerrar sesión</button>
          </header>

          <TravelForm onCreated={onCreated} />
          <TravelList key={refreshKey} />

          <footer>
            <small>Frontend conectado a <code>http://localhost:3000</code></small>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;

