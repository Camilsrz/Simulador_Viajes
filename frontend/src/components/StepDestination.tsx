import { DESTINOS } from "../data/options";
import { CardOption } from "../components/CardOption";
import type { Option } from "../types";
import { CoverflowCarousel } from "../components/CoverflowCarousel";

interface Props {
  selected: Option | null;
  onSelect: (opt: Option) => void;
  next?: () => void;
}

export const StepDestination = ({ selected, onSelect, next }: Props) => {
  return (
    <div className="wizard-container">
      <h2 className="title-step">1. SELECCIONA TU DESTINO</h2>

      <CoverflowCarousel
        items={DESTINOS.map((d) => (
          <CardOption
            key={d.title}
            title={d.title}
            price={d.price}
            image={d.image}
            selected={selected?.title === d.title}
            onClick={() => onSelect(d)}
          />
        ))}
      />

      <div className="wizard-buttons" style={{ marginTop: "20px" }}>
        <button className="btn-small" onClick={next} disabled={!selected}>
          Siguiente
        </button>
      </div>
    </div>
  );
};
