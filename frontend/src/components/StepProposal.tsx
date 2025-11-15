import type { Option } from '../types';

interface Props {
  destination: Option;
  lodging: Option;
  transport: Option;
  activities: Option[];
  days: number;
  travelers: number;
  back: () => void;
  onConfirm: () => void;
}

export const StepProposal = ({ destination, lodging, transport, activities, days, travelers, back, onConfirm }: Props) => {
  const activitiesSum = activities.reduce((s, a) => s + a.price, 0);
  const perPerson = destination.price + transport.price + (lodging.price * days) + activitiesSum;
  const total = perPerson * travelers;

  return (
    <div style={{ padding: 12 }}>
      <h2>5. Resumen y confirmación</h2>

      <div className="card">
        <h4>Destino</h4>
        <p>{destination.title} — ₲{destination.price.toLocaleString('es-CO')}</p>
      </div>

      <div className="card">
        <h4>Alojamiento</h4>
        <p>{lodging.title} — ₲{lodging.price.toLocaleString('es-CO')} /día</p>
      </div>

      <div className="card">
        <h4>Transporte</h4>
        <p>{transport.title} — ₲{transport.price.toLocaleString('es-CO')}</p>
      </div>

      <div className="card">
        <h4>Actividades</h4>
        <p>{activities.length > 0 ? activities.map(a => a.title).join(', ') : 'Ninguna'}</p>
      </div>

      <h3>Total por persona: ₲{perPerson.toLocaleString('es-CO')}</h3>
      <h2>Total (x{travelers}): ₲{total.toLocaleString('es-CO')}</h2>

      <div className="wizard-buttons" style={{ marginTop: 12 }}>
        <button className="btn-small" onClick={back}>Atrás</button>
        <button 
          className="btn-small" 
          onClick={onConfirm} 
          style={{ marginLeft: 8 }}
        >
          Confirmar y crear presupuesto
        </button>
      </div>
    </div>
  );
};
