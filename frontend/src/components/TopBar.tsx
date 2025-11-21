import React from "react";
import "./TopBar.css";

interface TopBarProps {
  onLogout: () => void;
  onHome: () => void;
  onCreateBudget: () => void;
  onViewHistory: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onLogout, onHome, onCreateBudget, onViewHistory }) => {
  return (
    <div className="topbar-global">
      <div className="topbar-left">
        <strong>Simulador de viajes</strong>
      </div>
      <div className="topbar-right">
        <button onClick={onHome}>Inicio</button>
        <button onClick={onCreateBudget}>Crear Presupuesto</button>
        <button onClick={onViewHistory}>Ver Presupuestos</button>
        <button onClick={onLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default TopBar;

