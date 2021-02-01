import { useEffect, useState } from 'react';

import IMovie from '../../interfaces/IMovie';

import Card from '../../components/Card';
import Navigator from '../../components/Navigator';

import { searchMoviesByGenre } from '../../services/tmdb';

import { getGenreByName } from '../../utils/getGenre';

import './styles.css';
import PageContext from '../../contexts/PageContext';
import IGenre from '../../interfaces/IGenre';
//=============================================================================
const Search = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  // useEffect(() => {
  //   (async () => {
  //     searchMoviesByGenre
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      if (query.length > 1) {
        const genres = await getGenreByName(query);
        if (genres) searchWithGenre(genres);
      }
    })();
  }, [query]);

  const searchWithGenre = async (genres: IGenre[]) => {
    if (genres)
      searchMoviesByGenre(genres, currentPage).then((response) => {
        if (response) {
          const nothingChanges =
            JSON.stringify(response.movies) !== JSON.stringify(movies);
          if (nothingChanges) {
            setMovies(response.movies);
            setTotalPages(response.totalPages);
          }

          console.log(response.movies);
        } else {
          setMovies([]);
          setTotalPages(0);
        }
      });
  };

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
        placeholder="Busque um filme por nome, ano ou gênero..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <PageContext.Provider value={[currentPage, setCurrentPage]}>
        {movies.length ? (
          <>
            <ul>
              {movies.map((movie, index) => {
                if (index > 4) return null;

                return <Card key={movie.id} movie={movie} />;
              })}
            </ul>
            <Navigator totalPages={totalPages} />
          </>
        ) : (
          <p>sem resultados</p>
        )}
      </PageContext.Provider>
    </main>
  );
};

export default Search;
