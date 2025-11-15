import { LODGINGS } from '../data/options';
import { CardOption } from './CardOption';
import type { Option } from '../types';

interface Props {
  selected: Option | null;
  onSelect: (opt: Option) => void;
  next?: () => void;
  back?: () => void;
}

export const StepLodging = ({ selected, onSelect, next, back }: Props) => {
  return (
    <div>
      <h2 className="title-step">2. Selecciona alojamiento</h2>
      <div className="grid">
        {LODGINGS.map((l) => (
          <CardOption
            key={l.title}
            title={l.title}
            price={l.price}
            image={l.image}
            selected={selected?.title === l.title}
            onClick={() => onSelect(l)}
          />
        ))}
      </div>

      <div className="wizard-buttons">
        <button className="btn-small" onClick={back}>Atrás</button>
        <button 
          className="btn-small" 
          onClick={next} 
          disabled={!selected} 
          style={{ marginLeft: 8 }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
