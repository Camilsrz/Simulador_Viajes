import React, { useEffect, useState } from "react";
import { api } from "../api/api";

interface Props {
  onBack: () => void;
}

interface Travel {
  id: number;
  destination: string;
  lodging: string;
  transport: string;
  activities: string[];
  days: number;
  travelers: number;
  budgetperperson: number;
  totalbudget: number;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function BudgetHistory({ onBack }: Props) {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuario no autenticado");

        const res = await api.get<Travel[]>("/travels", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTravels(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.error || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchTravels();
  }, []);

  const downloadPDF = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuario no autenticado");

      const res = await fetch(`${API_URL}/travels/${id}/export?format=pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al generar PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `viaje-${id}.pdf`;
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
    <div style={{ padding: 20, marginTop: "90px" }}>
      <h2>Historial de presupuestos</h2>

      <button
        onClick={onBack}
        style={{
          backgroundColor: "#ccc",
          padding: "10px 18px",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
          marginBottom: 20,
          fontWeight: "bold",
        }}
      >
        ← Volver
      </button>

      {loading && <p>Cargando presupuestos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && travels.length === 0 && <p>No se encontraron presupuestos.</p>}

      {travels.map((t) => (
        <div
          key={t.id}
          style={{
            border: "1px solid #ccc",
            padding: 20,
            marginBottom: 20,
            borderRadius: 8,
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{t.destination}</h3>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div>
              <p><strong>Alojamiento:</strong> {t.lodging}</p>
              <p><strong>Transporte:</strong> {t.transport}</p>
              <p><strong>Actividades:</strong> {t.activities.length > 0 ? t.activities.join(", ") : "Ninguna"}</p>
            </div>
            <div>
              <p><strong>Días:</strong> {t.days}</p>
              <p><strong>Viajeros:</strong> {t.travelers}</p>
              <p><strong>Presupuesto por persona:</strong> ${t.budgetperperson.toLocaleString("es-CO")}</p>
              <p><strong>Presupuesto total:</strong> ${t.totalbudget.toLocaleString("es-CO")}</p>
            </div>
          </div>
          <button
            onClick={() => downloadPDF(t.id)}
            style={{
              marginTop: 15,
              backgroundColor: "#4CAF50",
              color: "#fff",
              padding: "8px 14px",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Descargar PDF
          </button>
        </div>
      ))}
    </div>
  );
}
