import React, { useState } from "react";
import { StepDestination } from "../components/StepDestination";
import { StepLodging } from "../components/StepLodging";
import { StepTransport } from "../components/StepTransport";
import { StepActivities } from "../components/StepActivities";
import { StepProposal } from "../components/StepProposal";
import { StepSummary } from "../components/StepSummary";
import type { Option } from "../types";

const API_URL = import.meta.env.VITE_API_URL; 

export const TravelWizard = () => {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState<Option | null>(null);
  const [lodging, setLodging] = useState<Option | null>(null);
  const [transport, setTransport] = useState<Option | null>(null);
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
        budgetPerPerson: 100000, 
      };

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Usuario no autenticado');

      console.log('Saving travel:', travelData, 'Token:', token);

      const res = await fetch(`${API_URL}/travels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(travelData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error saving travel:', errorData);
        throw new Error(errorData.error || 'Error al guardar viaje');
      }

      const savedTravel = await res.json();
      return savedTravel.id;
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'No se pudo guardar el viaje');
      return null;
    }
  };

  return (
    <div className="wizard-wrapper">
      {step === 1 && (
        <StepDestination selected={destination} onSelect={setDestination} next={() => setStep(2)} />
      )}

      {step === 2 && destination && (
        <StepLodging
          selected={lodging}
          onSelect={setLodging}
          selectedCity={destination.title}
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      )}

      {step === 3 && destination && (
        <StepTransport
          selected={transport}
          onSelect={setTransport}
          selectedCity={destination.title}
          next={() => setStep(4)}
          back={() => setStep(2)}
        />
      )}

      {step === 4 && destination && (
        <StepActivities
          selectedActivities={activities}
          toggleActivity={toggleActivity}
          days={days}
          setDays={setDays}
          travelers={travelers}
          setTravelers={setTravelers}
          selectedCity={destination.title}
          next={() => setStep(5)}
          back={() => setStep(3)}
        />
      )}

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
          />
        )}
    </div>
  );
};
