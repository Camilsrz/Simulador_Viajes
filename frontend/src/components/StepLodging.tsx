import { LODGINGS } from "../data/options";
import { CardOption } from "./CardOption";
import type { Option } from "../types";
import { CoverflowCarousel } from "../components/CoverflowCarousel";
import { isEnabledForCity } from "../utils/isEnableForCity";

interface Props {
  selected: Option | null;
  onSelect: (opt: Option) => void;
  selectedCity: string;
  next?: () => void;
  back?: () => void;
}

export const StepLodging = ({ selected, onSelect, selectedCity, next, back }: Props) => {
  // Filtro de actividades disponibles para la ciudad seleccionada
  const availableLodgings = LODGINGS.filter(l => isEnabledForCity(l, selectedCity));

  return (
    <div className="wizard-container">
      <h2 className="title-step">2. SELECCIONA ALOJAMIENTO</h2>

      <CoverflowCarousel
        items={availableLodgings.map(l => (
          <CardOption
            key={l.title}
            title={l.title}
            price={l.price}
            image={l.image}
            selected={selected?.title === l.title}
            onClick={() => onSelect(l)}
          />
        ))}
      />

      <div className="wizard-buttons" style={{ marginTop: "20px" }}>
        <button className="btn-return" onClick={back}>
          Atrás
        </button>

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
