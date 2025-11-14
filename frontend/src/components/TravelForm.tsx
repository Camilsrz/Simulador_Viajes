import React, { useState } from 'react';
import { api } from '../api/api';

export default function TravelForm({ onCreated }: { onCreated: () => void }) {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(1);
  const [travelers, setTravelers] = useState(1);
  const [transport, setTransport] = useState('');
  const [lodging, setLodging] = useState('');
  const [activities, setActivities] = useState('');
  const [budgetPerPerson, setBudgetPerPerson] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/travels', {
        destination,
        days,
        travelers,
        transport,
        lodging,
        activities: activities.split(',').map(a => a.trim()),
        budgetPerPerson,
      });
      onCreated();
      setDestination('');
      setActivities('');
    } catch (err) {
      alert('Error al crear el viaje');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nuevo viaje</h2>
      <input placeholder="Destino" value={destination} onChange={e => setDestination(e.target.value)} />
      <input type="number" placeholder="Días" value={days} onChange={e => setDays(Number(e.target.value))} />
      <input type="number" placeholder="Viajeros" value={travelers} onChange={e => setTravelers(Number(e.target.value))} />
      <input placeholder="Transporte" value={transport} onChange={e => setTransport(e.target.value)} />
      <input placeholder="Alojamiento" value={lodging} onChange={e => setLodging(e.target.value)} />
      <input placeholder="Actividades (coma separadas)" value={activities} onChange={e => setActivities(e.target.value)} />
      <input type="number" placeholder="Presupuesto por persona" value={budgetPerPerson} onChange={e => setBudgetPerPerson(Number(e.target.value))} />
      <button type="submit">Guardar</button>
    </form>
  );
}
