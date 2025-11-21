import { ACTIVITIES } from "../data/options";
import { CardOption } from "./CardOption";
import type { Option } from "../types";
import { CoverflowCarousel } from "../components/CoverflowCarousel";
import { isEnabledForCity } from "../utils/isEnableForCity";

interface Props {
  selectedActivities: Option[];
  toggleActivity: (opt: Option) => void;
  days: number;
  setDays: (v: number) => void;
  travelers: number;
  setTravelers: (v: number) => void;
  selectedCity: string;   
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
  selectedCity,
  next,
  back,
}: Props) => {
  // Filtro de actividades disponibles para la ciudad seleccionada
  const availableActivities = ACTIVITIES.filter(a => isEnabledForCity(a, selectedCity));

  return (
    <div className="wizard-container">
      <h2 className="title-step">4. ACTIVIDADES Y DETALLES</h2>

      <div className="details-box">
        <div className="detail-item">
          <label>Días</label>
          <input
            type="number"
            min={1}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </div>

        <div className="detail-item">
          <label>Viajeros</label>
          <input
            type="number"
            min={1}
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
          />
        </div>
      </div>

      <CoverflowCarousel
        items={availableActivities.map((a: Option) => {
          const isSelected = selectedActivities.some(
            (sa) => sa.title === a.title
          );

          return (
            <CardOption
              key={a.title}
              title={a.title}
              price={a.price}
              image={a.image}
              selected={isSelected}
              onClick={() => toggleActivity(a)}
            />
          );
        })}
      />

      <div className="wizard-buttons" style={{ marginTop: "20px" }}>
        <button className="btn-return" onClick={back}>
          Atrás
        </button>

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
