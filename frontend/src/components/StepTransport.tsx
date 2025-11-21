import type { Option } from "../types";
import { TRANSPORTS } from "../data/options";
import { CardOption } from "./CardOption";
import { CoverflowCarousel } from "../components/CoverflowCarousel";
import { isEnabledForCity } from "../utils/isEnableForCity";
import "../pages/wizard.css";

type Props = {
  selected: Option | null;
  onSelect: (o: Option) => void;
  selectedCity: string;
  next: () => void;
  back: () => void;
};

export const StepTransport = ({ selected, onSelect, selectedCity, next, back }: Props) => {
//Filtro de actividades disponibles para la ciudad seleccionada
  const availableTransports = TRANSPORTS.filter(t => isEnabledForCity(t, selectedCity));

  return (
    <div className="wizard-container">
      <h2 className="title-step">3. SELECCIONA TU TRANSPORTE</h2>

      <CoverflowCarousel
        items={availableTransports.map(t => (
          <CardOption
            key={t.title}
            title={t.title}
            price={t.price}
            image={t.image}
            selected={selected?.title === t.title}
            onClick={() => onSelect(t)}
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
