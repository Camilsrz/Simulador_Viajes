
import TopBar from "./components/TopBar";
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
        <>
          
          <TopBar 
            onLogout={logout} 
            onHome={() => setView("landing")} 
            onCreateBudget={() => setView("wizard")}
            onViewHistory={() => setView("history")} 
          />

          {/* Contenido principal */}
          <div className="page">
            <section className="hero-header">
              <h1 className="hero-title"></h1>
            </section>

            <div className="wizard-wrapper">
              <TravelWizard />
            </div>
          </div>
        </>
      )}

      {view === "history" && token && (
        <>
          <TopBar 
            onLogout={logout} 
            onHome={() => setView("landing")} 
            onCreateBudget={() => setView("wizard")}
            onViewHistory={() => setView("history")}
          />
          <BudgetHistory onBack={() => setView("wizard")} />
        </>
      )}
    </>
  );
}

export default App;

