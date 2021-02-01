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

  console.log('a');

  return (
    <li {...props} className="card-container">
      <img src={movie.posterPath} alt={movie.title} />
      <Link className="header" to={`/${movie.id}`}>
        <Circle className="vote-container" size={5}>
          {movie.voteAverage}
        </Circle>
        <div className="text">
          <h2 className="title">{movie.title}</h2>
          <h1>{movie.releaseDate}</h1>
        </div>
      </Link>
      <main>
        <p>{movie.overview}</p>
        <div className="tags-container">
          {movie.genres?.map((genre) => (
            <Tag key={genre.id}>{genre.name}</Tag>
          ))}
        </div>
      </main>
    </li>
  );
};

export default memo(Card);
