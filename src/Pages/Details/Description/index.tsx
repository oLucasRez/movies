import { FC, HTMLAttributes, useEffect, useState } from 'react';

import IMovieDetails from '../../../interfaces/IMovieDetails';

import Circle from '../../../components/Circle';
import Tag from '../../../components/Tag';

import './styles.css';
import { getMovieDetails } from '../../../services/tmdb';
import IMovie from '../../../interfaces/IMovie';

interface DescriptionProps extends HTMLAttributes<HTMLElement> {
  movie: IMovieDetails;
}
//=============================================================================
const Description: FC<DescriptionProps> = ({ movie, ...props }) => {
  const getRuntime = (time: number | undefined) => {
    if (time) {
      const minutes = time % 60;
      const hours = (time - minutes) / 60;
      return hours + 'h ' + minutes + 'min';
    } else return 'NA';
  };

  const getCurrency = (value: number | undefined) => {
    if (value)
      return '$ ' + new Intl.NumberFormat('de-DE').format(value) + ',00';
    else return 'NA';
  };

  const getProfit = () => {
    if (movie.revenue && movie.budget)
      return getCurrency(movie.revenue - movie.budget);
    else return 'NA';
  };

  return (
    <div {...props} className="description-container">
      <h1 className="title">Sinopse</h1>
      <p>{movie.overview}</p>
      <h1 className="title">Informações</h1>
      <div className="info-container">
        <div>
          <h1 className="title">Situação</h1>
          <p>{movie.status ?? 'NA'}</p>
        </div>
        <div>
          <h1 className="title">Idioma</h1>
          <p>{movie.languages ? movie.languages[0] : 'NA'}</p>
        </div>
        <div>
          <h1 className="title">Duração</h1>
          <p>{getRuntime(movie.runtime)}</p>
        </div>
        <div>
          <h1 className="title">Orçamento</h1>
          <p>{getCurrency(movie.budget)}</p>
        </div>
        <div>
          <h1 className="title">Receita</h1>
          <p>{getCurrency(movie.revenue)}</p>
        </div>
        <div>
          <h1 className="title">Lucro</h1>
          <p>{getProfit()}</p>
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
