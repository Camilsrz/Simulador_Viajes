import React, { useState } from "react";
import { StepDestination } from "../components/StepDestination";
import { StepLodging } from "../components/StepLodging";
import { StepTransport } from "../components/StepTransport";
import { StepActivities } from "../components/StepActivities";
import { StepProposal } from "../components/StepProposal";
import { StepSummary } from "../components/StepSummary";
import type { Option } from "../types";
import './wizard.css';

export const TravelWizard = () => {
  const [step, setStep] = useState(1);

  // Datos principales
  const [destination, setDestination] = useState<Option | null>(null);
  const [lodging, setLodging] = useState<Option | null>(null);
  const [transport, setTransport] = useState<Option | null>(null);

  // Datos adicionales
  const [activities, setActivities] = useState<Option[]>([]);
  const [days, setDays] = useState<number>(1);
  const [travelers, setTravelers] = useState<number>(1);

  const [savedTravelId, setSavedTravelId] = useState<number | null>(null);

  const toggleActivity = (a: Option) => {
    setActivities((prev) =>
      prev.some((x) => x.title === a.title)
        ? prev.filter((x) => x.title !== a.title)
        : [...prev, a]
    );
  };

  // Función para guardar el viaje en la base de datos
  const saveTravel = async (): Promise<number | null> => {
    if (!destination || !lodging || !transport) return null;

    try {
      const travelData = {
        destination: destination.title,
        lodging: lodging.title,
        transport: transport.title,
        activities: activities.map(a => a.title),
        days,
        travelers,
        budgetPerPerson: 100000, // o el valor que uses
      };

      const token = localStorage.getItem('token'); // si usas auth
      const res = await fetch('http://localhost:3000/travels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(travelData),
      });

      if (!res.ok) throw new Error('Error al guardar viaje');

      const savedTravel = await res.json();
      return savedTravel.id;

    } catch (err) {
      console.error(err);
      alert('No se pudo guardar el viaje');
      return null;
    }
  };

  return (
    <div style={{ padding: 40 }}>
      {/* 1. DESTINO */}
      {step === 1 && (
        <StepDestination
          selected={destination}
          onSelect={setDestination}
          next={() => setStep(2)}
        />
      )}

      {/* 2. ALOJAMIENTO */}
      {step === 2 && (
        <StepLodging
          selected={lodging}
          onSelect={setLodging}
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      )}

      {/* 3. TRANSPORTE */}
      {step === 3 && (
        <StepTransport
          selected={transport}
          onSelect={setTransport}
          next={() => setStep(4)}
          back={() => setStep(2)}
        />
      )}

      {/* 4. ACTIVIDADES + DÍAS + VIAJEROS */}
      {step === 4 && (
        <StepActivities
          selectedActivities={activities}
          toggleActivity={toggleActivity}
          days={days}
          setDays={setDays}
          travelers={travelers}
          setTravelers={setTravelers}
          next={() => setStep(5)}
          back={() => setStep(3)}
        />
      )}

      {/* 5. PROPUESTA */}
      {step === 5 &&
        destination &&
        lodging &&
        transport && (
          <StepProposal
            destination={destination}
            lodging={lodging}
            transport={transport}
            activities={activities}
            days={days}
            travelers={travelers}
            back={() => setStep(4)}
            onConfirm={async () => {
              const id = await saveTravel();
              if (id) {
                setSavedTravelId(id);
                setStep(6);
              }
            }}
          />
        )}

      {/* 6. RESUMEN — CREAR Y DESCARGAR */}
      {step === 6 &&
        destination &&
        lodging &&
        transport &&
        savedTravelId && (
          <StepSummary
            destination={destination}
            lodging={lodging}
            transport={transport}
            activities={activities}
            days={days}
            travelers={travelers}
            travelId={savedTravelId}
            back={() => setStep(5)}
            onDone={() => alert('Viaje finalizado!')}
          />
        )}
    </div>
  );
};
