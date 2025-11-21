import React, { useState } from "react";
import "./coverflow.css";

type CardProps = {
  isActive?: boolean;
};

type Props = {
  items: React.ReactElement<CardProps>[];
};

export const CoverflowCarousel: React.FC<Props> = ({ items }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  return (
    <div className="coverflow-container">
      <button className="nav-btn left" onClick={prev}>‹</button>

      <div className="coverflow-wrapper">
        {items.map((item, i) => {
          const offset = i - index;
          const isCenter = offset === 0;

          const clonedItem = React.cloneElement(item, { isActive: isCenter });

          return (
            <div
              key={i}
              className={`coverflow-item ${isCenter ? "center" : ""}`}
              style={{
                transform: `
                  translateX(${offset * 180}px)
                  scale(${isCenter ? 1 : 0.8})
                  rotateY(${offset * -35}deg)
                `,
                zIndex: isCenter ? 10 : 1,
                opacity: Math.abs(offset) > 2 ? 0 : 1,
              }}
            >
              {clonedItem}
            </div>
          );
        })}
      </div>

      <button className="nav-btn right" onClick={next}>›</button>
    </div>
  );
};
