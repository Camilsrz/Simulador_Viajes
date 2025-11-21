
import "./LandingPage.css";

interface Props {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: Props) {

  useEffect(() => {
    document.body.className = "landing";

    return () => {
      document.body.className = "";  
    };
  }, []);

  return (
    <div className="landing-container">

      <header>
        <div className="logo">
          Simulador <span>de Viajes</span>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h1>GENERA EL PRESUPUESTO DE TU VIAJE IDEAL</h1>
          <p>Explora destinos, calcula presupuestos y planea aventuras únicas.</p>

          <div className="hero-buttons">
            <button onClick={onLogin}>
              Iniciar sesión
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
