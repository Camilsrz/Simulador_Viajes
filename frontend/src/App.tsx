import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import { TravelWizard } from "./pages/TravelWizard";
import BudgetHistory from "./pages/BudgetHistory";
import "./App.css";

type View = "landing" | "login" | "wizard" | "history";

function App() {
  const [view, setView] = useState<View>("landing");
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    setView("login");
  };

  return (
    <>
      {view === "landing" && <LandingPage onLogin={() => setView("login")} />}

      {view === "login" && (
        <AuthPage onLoginSuccess={() => setView("wizard")} />
      )}

      {view === "wizard" && token && (
        <div className="page">

          <section className="hero-header">
            <h1 className="hero-title"></h1>
          </section>

          <div className="wizard-wrapper">
            
            <div className="wizard-actions">
              <button onClick={logout} className="btn-small">Cerrar sesión</button>
              <button onClick={() => setView("history")} className="btn-small">Ver presupuestos</button>
            </div>

            <TravelWizard />
          </div>
        </div>
      )}

      {view === "history" && token && (
        <BudgetHistory onBack={() => setView("wizard")} />
      )}
    </>
  );
}

export default App;

