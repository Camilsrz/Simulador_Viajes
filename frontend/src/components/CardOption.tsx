interface Props {
  title: string;
  price: number;
  image: string;
  isActive?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const CardOption = ({
  title,
  price,
  image,
  isActive = false,
  selected = false,
  disabled = false,
  onClick,
}: Props) => {
  return (
    <div
      className={`card-option ${selected ? "selected" : ""} ${
        isActive ? "active" : "inactive"
      } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={!disabled ? onClick : undefined}
    >
      <img src={image} alt={title} />
      <div className="center-overlay">
        <h2 className="place-title">{title}</h2>
        <h3 className="place-price">$ {price.toLocaleString("es-CO")}</h3>
      </div>
    </div>
  );
};
