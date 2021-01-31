import { useContext, useEffect, useState } from 'react';

import IMovie from '../../interfaces/IMovie';

import Card from '../../components/Card';

import { searchMoviesByGenre } from '../../services/tmdb';

import './styles.css';
import { getGenresByIDs } from '../../utils/getGenre';
import MovieContext from '../../contexts/MovieContext';

import history from '../../history';
import Details from '../Details';
//=============================================================================
const Search = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [movieContext, setMovieContext] = useContext(MovieContext);

  useEffect(() => {
    if (setMovieContext) setMovieContext(undefined);

    (async () => {
      const genres = await getGenresByIDs([16, 28]);

      if (genres)
        searchMoviesByGenre(genres).then((_movies) => {
          if (_movies) setMovies(_movies);
        });
    })();
  }, []);

  const handleCardClick = (movie: IMovie) => {
    if (setMovieContext) setMovieContext(movie);
    history.push('/details');
  };

  return (
    <main className="search-container">
      <input
        className="title"
        placeholder="Busque um filme por nome, ano ou gênero"
      />
      <ul>
        {movieContext ? (
          <Details />
        ) : (
          <>
            {movies.map((movie) => (
              <Card
                key={movie.id}
                movie={movie}
                onClick={() => handleCardClick(movie)}
              />
            ))}
          </>
        )}
      </ul>
    </main>
  );
};

export default Search;
