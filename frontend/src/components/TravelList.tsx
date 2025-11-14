import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

interface Travel {
  id: number;
  destination: string;
  totalbudget: number;
  travelers: number;
}

export default function TravelList() {
  const [travels, setTravels] = useState<Travel[]>([]);

  const loadTravels = async () => {
    const res = await api.get('/travels');
    setTravels(res.data);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar viaje?')) return;
    await api.delete(`/travels/${id}`);
    loadTravels();
  };

  useEffect(() => {
    loadTravels();
  }, []);

  return (
    <div>
      <h2>Lista de viajes</h2>
      <ul>
        {travels.map(t => (
          <li key={t.id}>
            ✈️ {t.destination} — {t.travelers} viajeros — {t.totalbudget}
            <button onClick={() => handleDelete(t.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


