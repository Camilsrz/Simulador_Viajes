import { ACTIVITIES } from '../data/options';
import { CardOption } from './CardOption';
import type { Option } from '../types';

interface Props {
  selectedActivities: Option[];
  toggleActivity: (opt: Option) => void;
  days: number;
  setDays: (v: number) => void;
  travelers: number;
  setTravelers: (v: number) => void;
  next?: () => void;
  back?: () => void;
}

export const StepActivities = ({
  selectedActivities,
  toggleActivity,
  days,
  setDays,
  travelers,
  setTravelers,
  next,
  back
}: Props) => {
  return (
    <div>
      <h2 className="title-step">4. Actividades y detalles</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Días:</label>
        <input type="number" min={1} value={days} onChange={(e) => setDays(Number(e.target.value))} />
        <label style={{ marginLeft: 12 }}>Viajeros:</label>
        <input type="number" min={1} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} />
      </div>

      <div className="grid">
        {ACTIVITIES.map((a) => {
          const selected = selectedActivities.some(sa => sa.title === a.title);
          return (
            <CardOption
              key={a.title}
              title={a.title}
              price={a.price}
              image={a.image}
              selected={selected}
              onClick={() => toggleActivity(a)}
            />
          );
        })}
      </div>

      <div className="wizard-buttons">
        <button className="btn-small" onClick={back}>Atrás</button>
        <button 
          className="btn-small" 
          onClick={next} 
          disabled={selectedActivities.length === 0} 
          style={{ marginLeft: 8 }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
