import React from "react";
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
  onDone: () => void;
}

export const StepSummary: React.FC<StepSummaryProps> = ({
  destination,
  lodging,
  transport,
  activities,
  days,
  travelers,
  travelId,
  back,
  onDone,
}) => {
  const downloadPDF = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/travels/${travelId}/export?format=pdf`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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
    } catch (err) {
      console.error(err);
      alert("Error al descargar el PDF");
    }
  };

  return (
    <div className="wizard-container">
      <h2 className="title-step">RESUMEN DEL VIAJE</h2>

      <div
        style={{
          background: "white",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.12)",
          maxWidth: "600px",
          margin: "20px auto",
          color: "#1a1a1a",
        }}
      >
        <p><strong>Destino:</strong> {destination.title} — ${" "}
          {destination.price.toLocaleString("es-CO")}
        </p>

        <p><strong>Alojamiento:</strong> {lodging.title} — ${" "}
          {lodging.price.toLocaleString("es-CO")}
        </p>

        <p><strong>Transporte:</strong> {transport.title} — ${" "}
          {transport.price.toLocaleString("es-CO")}
        </p>

        <p><strong>Días:</strong> {days}</p>

        <p><strong>Viajeros:</strong> {travelers}</p>

        <p><strong>Actividades:</strong></p>

        <ul style={{ marginLeft: "16px" }}>
          {activities.length > 0 ? (
            activities.map((a, i) => (
              <li key={i}>
                {a.title} — ${a.price.toLocaleString("es-CO")}
              </li>
            ))
          ) : (
            <li>No se registraron actividades</li>
          )}
        </ul>
      </div>

      <div className="wizard-buttons">
        <button className="btn-return" onClick={back}>
          Volver
        </button>

        <button className="btn-small" onClick={downloadPDF}>
          Crear presupuesto (PDF)
        </button>
      </div>
    </div>
  );
};
