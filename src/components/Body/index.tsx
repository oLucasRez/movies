import { useEffect, useState } from 'react';

import IMovie from '../../interfaces/IMovie';

import Card from '../Card';

import { searchMovies } from '../../services/tmdb';

import './styles.css';
//=============================================================================
const Body = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    searchMovies('thor').then((_movies) => {
      setMovies(_movies);
    });
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
