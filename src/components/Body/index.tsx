import { useEffect, useState } from 'react';

import IMovie from '../../interfaces/IMovie';

import Card from '../Card';

import { searchMoviesByGenre } from '../../services/tmdb';

import './styles.css';
import { getGenreByID, getGenresByIDs } from '../../utils/getGenre';
//=============================================================================
const Body = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    (async () => {
      const genres = await getGenresByIDs([16, 28]);

      if (genres)
        searchMoviesByGenre(genres).then((_movies) => {
          if (_movies) setMovies(_movies);
        });
    })();
  }, []);

  return (
    <main className="body-container">
      <input
        className="title"
        placeholder="Busque um filme por nome, ano ou gênero"
      />
      {movies.map((movie, index) => (
        <Card key={index} movie={movie} />
      ))}
    </main>
  );
};

export default Body;
