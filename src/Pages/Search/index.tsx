import { useEffect, useState } from 'react';

import IMovie from '../../interfaces/IMovie';

import Card from '../../components/Card';
import Navigator from '../../components/Navigator';

import { searchMoviesByGenre, searchMoviesByTitle } from '../../services/tmdb';

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

  const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     searchMoviesByGenre
  //   })();
  // }, []);

  useEffect(() => {
    // setLoaded(false);
    (async () => {
      searchWithTitle('thor');

      // if (query.length > 1) {
      //   const genres = await getGenreByName(query);
      //   if (genres?.length) searchWithGenre(genres);
      //   else searchWithTitle(query);
      //   // setLoaded(true);
      // }
    })();
  }, [query]);

  console.log('render');

  const searchWithGenre = async (genres: IGenre[]) => {
    if (genres)
      searchMoviesByGenre(genres, currentPage).then((response) => {
        if (response) {
          const somethingChanges =
            JSON.stringify(response.movies) !== JSON.stringify(movies);
          if (somethingChanges) {
            setMovies(response.movies);
            setTotalPages(response.totalPages);
          }
        } else {
          setMovies([]);
          setTotalPages(0);
        }
      });
  };

  const searchWithTitle = async (query: string) => {
    const response = await searchMoviesByTitle(query);

    console.log(response);

    const somethingChanges =
      JSON.stringify(response.movies) !== JSON.stringify(movies);

    if (somethingChanges) {
      setMovies(response.movies);
      setTotalPages(response.totalPages);
    }
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
