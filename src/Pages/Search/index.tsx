import { useEffect, useState } from 'react';

import IMovie from '../../interfaces/IMovie';

import Card from '../../components/Card';
import Navigator from '../../components/Navigator';

import { searchMoviesByGenre, searchMoviesByTitle } from '../../services/tmdb';

import useStorageState from '../../hooks/useStorageState';

import { getGenreByName } from '../../utils/getGenre';

import './styles.css';
import PageContext from '../../contexts/PageContext';
import IGenre from '../../interfaces/IGenre';
//=============================================================================
const Search = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useStorageState('query', '');

  useEffect(() => {
    (async () => {
      if (query.length > 1) {
        setCurrentPage(1);
        const genres = await getGenreByName(query);
        if (genres?.length) searchWithGenre(genres);
        else searchWithTitle(query);
      }
    })();
  }, [query]);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      if (!getRelativePage(currentPage)) {
        const genres = await getGenreByName(query);
        if (genres?.length) searchWithGenre(genres);
        else searchWithTitle(query);
      }
    })();
  }, [currentPage]);

  const parseBuffer = (page: number) => parseInt((page / 4 + 1).toFixed(0));
  const getRelativePage = (page: number) => (page - 1) % 4;

  const searchWithGenre = async (genres: IGenre[]) => {
    const bufferRequest = parseBuffer(currentPage);

    if (genres)
      searchMoviesByGenre(genres, bufferRequest).then((response) => {
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
    const bufferRequest = parseBuffer(currentPage);

    const response = await searchMoviesByTitle(query, bufferRequest);

    const somethingChanges =
      JSON.stringify(response.movies) !== JSON.stringify(movies);

    if (somethingChanges) {
      setMovies(response.movies);
      setTotalPages(response.totalPages);
    }
  };

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
              {movies
                .slice(
                  getRelativePage(currentPage) * 5,
                  getRelativePage(currentPage) * 5 + 5
                )
                .map((movie) => {
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
