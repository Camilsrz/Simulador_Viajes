import React from "react";
import type { Option } from "../types";
import { TRANSPORTS } from "../data/options";
import { CardOption } from "./CardOption";
import "../pages/wizard.css";

type Props = {
  selected: Option | null;
  onSelect: (o: Option) => void;
  next: () => void;
  back: () => void;
};

export const StepTransport = ({ selected, onSelect, next, back }: Props) => {
  return (
    <div>
      <h2>3. Selecciona tu transporte</h2>

      <div className="grid">
        {TRANSPORTS.map((t: Option) => (
          <CardOption
            key={t.title}
            title={t.title}
            price={t.price}
            image={t.image}
            selected={selected?.title === t.title}
            onClick={() => onSelect(t)}
          />
        ))}
      </div>

      <div className="wizard-buttons" style={{ marginTop: 16 }}>
        <button className="btn-small" onClick={back}>
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
