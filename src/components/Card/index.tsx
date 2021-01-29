import { FC } from 'react';

import IMovie from '../../interfaces/IMovie';

import './styles.css';

interface CardProps {
  movie: IMovie;
}
//=============================================================================
const Card: FC<CardProps> = () => {
  return <section className="card-container"></section>;
};

export default Card;
