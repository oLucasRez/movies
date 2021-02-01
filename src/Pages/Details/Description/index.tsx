import { FC, HTMLAttributes, useEffect, useState } from 'react';

import IMovieDetails from '../../../interfaces/IMovieDetails';

import Circle from '../../../components/Circle';
import Tag from '../../../components/Tag';

import './styles.css';
import { getMovieDetails } from '../../../services/tmdb';
import IMovie from '../../../interfaces/IMovie';

interface DescriptionProps extends HTMLAttributes<HTMLElement> {
  movie: IMovie;
}
//=============================================================================
const Description: FC<DescriptionProps> = ({ movie, ...props }) => {
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>(movie);

  useEffect(() => {
    (async () => {
      const movieDetails = await getMovieDetails(movie.id);

      setMovieDetails(movieDetails);
    })();
  }, []);

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
    if (movieDetails.revenue && movieDetails.budget)
      return getCurrency(movieDetails.revenue - movieDetails.budget);
    else return 'NA';
  };

  return (
    <div {...props} className="description-container">
      <h1 className="title">Sinopse</h1>
      <p>{movieDetails.overview}</p>
      <h1 className="title">Informações</h1>
      <div className="info-container">
        <div>
          <h1 className="title">Situação</h1>
          <p>{movieDetails.status ?? 'NA'}</p>
        </div>
        <div>
          <h1 className="title">Idioma</h1>
          <p>{movieDetails.languages ? movieDetails.languages[0] : 'NA'}</p>
        </div>
        <div>
          <h1 className="title">Duração</h1>
          <p>{getRuntime(movieDetails.runtime)}</p>
        </div>
        <div>
          <h1 className="title">Orçamento</h1>
          <p>{getCurrency(movieDetails.budget)}</p>
        </div>
        <div>
          <h1 className="title">Receita</h1>
          <p>{getCurrency(movieDetails.revenue)}</p>
        </div>
        <div>
          <h1 className="title">Lucro</h1>
          <p>{getProfit()}</p>
        </div>
      </div>
      <div className="tagvote-container">
        <div className="tags-container">
          {movieDetails.genres?.map((genre) => (
            <Tag className="title" key={genre.id}>
              {genre.name}
            </Tag>
          ))}
        </div>
        <div className="vote-container">
          <Circle size={7}>{movieDetails.voteAverage}</Circle>
        </div>
      </div>
    </div>
  );
};

export default Description;
