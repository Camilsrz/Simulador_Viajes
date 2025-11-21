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
      a.download = `viaje.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error al descargar el PDF");
    }
  };

  return (
    <div className="wizard-container">
      <h2 className="title-step">RESUMEN DEL VIAJE</h2>
      <div className="wizard-buttons">
        <button className="btn-return" onClick={back}>Volver</button>
        <button className="btn-small" onClick={downloadPDF}>Crear presupuesto (PDF)</button>
      </div>
    </div>
  );
};
