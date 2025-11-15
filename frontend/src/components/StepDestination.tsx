import { DESTINOS } from '../data/options';
import type { Option } from '../types';

interface Props {
  selected: Option | null;
  onSelect: (opt: Option) => void;
  next?: () => void;
}

export const StepDestination = ({ selected, onSelect, next }: Props) => {
  return (
    <div className="wizard-container">
      <h2 className="title-step">1. Selecciona tu destino</h2>

      <div className="grid">
        {DESTINOS.map((d) => (
          <div
            key={d.title}
            className={`card-option ${selected?.title === d.title ? 'selected' : ''}`}
            onClick={() => onSelect(d)}
          >
            <img src={d.image} alt={d.title} />
            <div className="overlay">
              <h3>{d.title}</h3>
              <p>{d.price ? `$${d.price}` : ''}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="wizard-buttons">
        <button 
  className="btn-small" 
  onClick={next} 
  disabled={!selected}
>
  Siguiente
</button>
      </div>
    </div>
  );
};

