import type { Option } from '../types';

interface Props {
  title: string;
  price: number;
  image: string;
  selected?: boolean;
  onClick: () => void;
}

export const CardOption = ({ title, price, image, selected = false, onClick }: Props) => {
  return (
    <div className={`card-option ${selected ? 'selected' : ''}`} onClick={onClick} role="button" tabIndex={0}>
      <img src={image} alt={title} />
      <div className="overlay">
        <h3>{title}</h3>
        <p>$ {price.toLocaleString('es-CO')}</p>
      </div>
    </div>
  );
};
