import { FC, HTMLAttributes } from 'react';

import IMovieDetails from '../../../interfaces/IMovieDetails';

import Circle from '../../../components/Circle';
import Tag from '../../../components/Tag';

import './styles.css';

interface DescriptionProps extends HTMLAttributes<HTMLElement> {
  movie: IMovieDetails;
}
//=============================================================================
const Description: FC<DescriptionProps> = ({ movie, ...props }) => {
  return (
    <div {...props} className="description-container">
      <h1 className="title">Sinopse</h1>
      <p>{movie.overview}</p>
      <h1 className="title">Informações</h1>
      <div className="info-container">
        <div>
          <h1 className="title">Situação</h1>
          <p>Lançado</p>
        </div>
        <div>
          <h1 className="title">Idioma</h1>
          <p>Inglês</p>
        </div>
        <div>
          <h1 className="title">Duração</h1>
          <p>2h 10min</p>
        </div>
        <div>
          <h1 className="title">Orçamento</h1>
          <p>$ 180.000.000,00</p>
        </div>
        <div>
          <h1 className="title">Receita</h1>
          <p>$ 853.977.000,00</p>
        </div>
        <div>
          <h1 className="title">Lucro</h1>
          <p>$ 673.977.000,00</p>
        </div>
      </div>
      <div className="tagvote-container">
        <div className="tags-container">
          {movie.genres?.map((genre) => (
            <Tag className="title" key={genre.id}>
              {genre.name}
            </Tag>
          ))}
        </div>
        <div className="vote-container">
          <Circle size={7}>{movie.voteAverage}</Circle>
        </div>
      </div>
    </div>
  );
};

export default Description;
