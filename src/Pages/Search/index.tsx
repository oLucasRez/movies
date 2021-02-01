import { useEffect, useState } from 'react';

import IMovie from '../../interfaces/IMovie';

import Card from '../../components/Card';
import Navigator from '../../components/Navigator';

import { searchMoviesByGenre } from '../../services/tmdb';

import { getGenresByIDs } from '../../utils/getGenre';

import './styles.css';
import movie from '../../mock/movie';
import PageContext from '../../contexts/PageContext';
//=============================================================================
const Search = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const genres = await getGenresByIDs([16, 28]);

      if (genres)
        searchMoviesByGenre(genres, currentPage).then((response) => {
          if (response) {
            setMovies(response.movies);
            setTotalPages(response.totalPages);
          }
        });
    })();
  }, []);

  // const getMoviePage = () => {
  //   // let displayPageNumber = 0;
  //   const _movies = [...movies];

  //   let pages = [];
  //   let moviesPerPage = [];

  //   while (_movies.length) {
  //     for (let i = 0; i < 5; i++) {
  //       const popped = _movies.pop();
  //       if (popped) moviesPerPage.push(popped);
  //       console.log(popped?.title);
  //     }
  //     pages.push(moviesPerPage);
  //     console.log('page');
  //   }

  //   return pages;
  // };

  return (
    <main className="search-container">
      <input
        className="title"
        placeholder="Busque um filme por nome, ano ou gênero"
      />
      <ul>
        {movies.map((movie, index) => {
          if (index > 4) return null;

          return <Card key={movie.id} movie={movie} />;
        })}
      </ul>
      <PageContext.Provider value={[currentPage, setCurrentPage]}>
        <Navigator totalPages={totalPages} />
      </PageContext.Provider>
    </main>
  );
};

export default Search;
