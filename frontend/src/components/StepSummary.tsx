import React from 'react';
import type { Option } from '../types';

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
      const response = await fetch(`http://localhost:3000/travels/${travelId}/export?format=pdf`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Error al generar PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `viaje-${travelId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert('Error al descargar el PDF');
    }
  };

  return (
    <div>
      <h2 className="title-step">Resumen del viaje</h2>

      <p><strong>Destino:</strong> {destination.title} — $ {destination.price.toLocaleString('es-CO')}</p>

      <p><strong>Alojamiento:</strong> {lodging.title} — $ {lodging.price.toLocaleString('es-CO')}</p>

      <p><strong>Transporte:</strong> {transport.title} — $ {transport.price.toLocaleString('es-CO')}</p>

      <p><strong>Días:</strong> {days}</p>

      <p><strong>Viajeros:</strong> {travelers}</p>

      <p><strong>Actividades:</strong></p>
      <ul>
        {activities.length > 0 ? (
          activities.map((a, i) => (
            <li key={i}>
              {a.title} — $ {a.price.toLocaleString('es-CO')}
            </li>
          ))
        ) : (
          <li>No se registraron actividades</li>
        )}
      </ul>

      <div style={{ marginTop: 20 }}>
        <button onClick={back} style={{ marginRight: 10 }}>Volver</button>
        <button onClick={downloadPDF}>Crear presupuesto (PDF)</button>
      </div>
    </div>
  );
};
