import { FC, LiHTMLAttributes, memo } from 'react';
import { Link } from 'react-router-dom';

import IMovie from '../../interfaces/IMovie';

import Circle from '../Circle';
import Tag from '../Tag';

import './styles.css';

interface CardProps extends LiHTMLAttributes<HTMLLIElement> {
  movie: IMovie;
}
//=============================================================================
const Card: FC<CardProps> = (props) => {
  const { movie } = props;

  return (
    <Link className="card-container" to={`/${movie.id}`}>
      <img src={movie.posterPath} alt={movie.title} />
      <header className="header">
        <Circle className="vote-container" size={5}>
          {movie.voteAverage}
        </Circle>
        <div className="text">
          <h2 className="title">{movie.title}</h2>
          <h1>{movie.releaseDate}</h1>
        </div>
      </header>
      <main>
        <p>{movie.overview}</p>
        <div className="tags-container">
          {movie.genres?.map((genre) => (
            <Tag key={genre.id}>{genre.name}</Tag>
          ))}
        </div>
      </main>
    </Link>
  );
};

export default memo(Card);
