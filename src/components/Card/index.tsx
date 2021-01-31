import { FC, LiHTMLAttributes } from 'react';

import IMovie from '../../interfaces/IMovie';
import Circle from '../Circle';

import './styles.css';

interface CardProps extends LiHTMLAttributes<HTMLLIElement> {
  movie: IMovie;
}
//=============================================================================
const Card: FC<CardProps> = (props) => {
  const { movie } = props;

  const getVoteAverage = () => {
    if (movie.voteAverage) return movie.voteAverage * 10 + '%';
    else return 'NA';
  };

  const getReleaseDate = () => {
    if (movie.releaseDate) {
      const releaseDateArray = movie.releaseDate.split('-');
      const releaseDate =
        releaseDateArray[2] +
        '/' +
        releaseDateArray[1] +
        '/' +
        releaseDateArray[0];

      return releaseDate;
    } else return 'NA';
  };

  console.log('a');

  return (
    <li {...props} className="card-container">
      <div
        className="image-container"
        style={{
          backgroundImage: `url(${movie.posterPath})`
        }}
      ></div>
      <div className="info-container">
        <header>
          <Circle className="vote-container" size={5}>
            {getVoteAverage()}
          </Circle>
          <div className="text">
            <h2 className="title">{movie.title}</h2>
            <h1>{getReleaseDate()}</h1>
          </div>
        </header>
        <main>
          <p>{movie.overview}</p>
          <div className="tag-container">
            {movie.genres?.map((genre) => (
              <div className="title" key={genre.id}>
                {genre.name}
              </div>
            ))}
          </div>
        </main>
      </div>
    </li>
  );
};

export default Card;
