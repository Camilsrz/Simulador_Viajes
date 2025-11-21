import type { Option } from "../types";

interface StepSummaryProps {
  destination: Option;
  lodging: Option;
  transport: Option;
  activities: Option[];
  days: number;
  travelers: number;
  travelId: number;
  back: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export const StepSummary: React.FC<StepSummaryProps> = ({
  destination,
  lodging,
  transport,
  activities,
  days,
  travelers,
  travelId,
  back,
}) => {
  const downloadPDF = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuario no autenticado");

      const response = await fetch(`${API_URL}/travels/${travelId}/export?format=pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al generar PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `viaje-${travelId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error al descargar el PDF");
    }
  };

  const activitiesSum = activities.reduce((sum, a) => sum + a.price, 0);
  const perPerson = destination.price + transport.price + lodging.price * days + activitiesSum;
  const total = perPerson * travelers;

  return (
    <div className="wizard-container resumen-bg">
      <h2 className="title-step">RESUMEN DEL VIAJE</h2>

      <div className="summary-wrapper">
        <div className="card summary-card">
          <h4>Destino</h4>
          <p>{destination.title} — ${destination.price.toLocaleString('es-CO')}</p>
        </div>

        <div className="card summary-card">
          <h4>Alojamiento</h4>
          <p>{lodging.title} — ${lodging.price.toLocaleString('es-CO')} /día</p>
        </div>

        <div className="card summary-card">
          <h4>Transporte</h4>
          <p>{transport.title} — ${transport.price.toLocaleString('es-CO')}</p>
        </div>

        <div className="card summary-card">
          <h4>Actividades</h4>
          <p>{activities.length > 0 ? activities.map(a => a.title).join(', ') : 'Ninguna'}</p>
        </div>

        <div className="card summary-card">
          <h4>Días</h4>
          <p>{days}</p>
        </div>

        <div className="card summary-card">
          <h4>Viajeros</h4>
          <p>{travelers}</p>
        </div>

        <div className="card summary-card total-box">
          <h3>Total por persona: ${perPerson.toLocaleString('es-CO')}</h3>
          <h2>Total (x{travelers}): ${total.toLocaleString('es-CO')}</h2>
        </div>
      </div>

      <div className="wizard-buttons" style={{ marginTop: 12 }}>
        <button className="btn-return" onClick={back}>Volver</button>
        <button 
          className="btn-small"
          onClick={downloadPDF}
          style={{ marginLeft: 8 }}
        >
          Crear presupuesto (PDF)
        </button>
      </div>
    </div>
  );
};
