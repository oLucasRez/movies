import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import IMovie from '../../interfaces/IMovie';

import Card from '../../components/Card';

import { searchMoviesByGenre } from '../../services/tmdb';

import { getGenresByIDs } from '../../utils/getGenre';

import './styles.css';
//=============================================================================
const Search = () => {
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
    <main className="search-container">
      <input
        className="title"
        placeholder="Busque um filme por nome, ano ou gênero"
      />
      <ul>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </ul>
    </main>
  );
};

export default Search;
