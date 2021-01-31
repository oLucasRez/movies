import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import IMovieDetails from '../../interfaces/IMovieDetails';
import { getMovieDetails } from '../../services/tmdb';
import Description from './Description';

import './styles.css';

interface RouteParams {
  movieID: string;
}
//=============================================================================
const Details = () => {
  const { movieID } = useParams<RouteParams>();
  const [movie, setMovie] = useState<IMovieDetails>();

  useEffect(() => {
    (async () => {
      const movieDetails = await getMovieDetails(parseInt(movieID));
      setMovie(movieDetails);
    })();
  }, [movieID]);

  if (movie)
    return (
      <div className="details-container">
        <header>
          <h2 className="title">{movie.title}</h2>
          <p>{movie.releaseDate}</p>
        </header>
        <main>
          <Description id="description" movie={movie} />
          <img src={movie.posterPath} alt={movie.title} />
        </main>
      </div>
    );
  else return <div>loading...</div>;
};

export default Details;
