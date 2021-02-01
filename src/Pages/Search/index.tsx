import { useCallback, useEffect, useMemo, useState } from 'react';

import IMovie from '../../interfaces/IMovie';

import Card from '../../components/Card';
import Navigator from '../../components/Navigator';

import { searchMoviesByGenre, searchMoviesByTitle } from '../../services/tmdb';

import useStorageState from '../../hooks/useStorageState';

import { getGenreByName } from '../../utils/getGenre';

import './styles.css';
import PageContext from '../../contexts/PageContext';
import ISearchMovies from '../../interfaces/ISearchMovies';
//=============================================================================
const Search = () => {
  const [movieSearch, setMovieSearch] = useState<ISearchMovies>();
  const [currentPage, setCurrentPage] = useStorageState('current-page', 1);
  const [query, setQuery] = useStorageState('query', '');

  useEffect(() => {
    (async () => {
      const _movieSearch = await searchMovies(query, currentPage);
      if (movieSearch !== _movieSearch) setMovieSearch(_movieSearch);
    })();
  }, [query, currentPage, movieSearch]);

  useCallback(() => setCurrentPage(1), [query]);
  useEffect(() => window.scrollTo(0, 0), [currentPage]);

  const getRelativePage = (page: number) => (page - 1) % 4;

  return (
    <main className="search-container">
      <input
        className="title"
        placeholder="Busque um filme por nome ou gênero..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <PageContext.Provider value={[currentPage, setCurrentPage]}>
        {movieSearch ? (
          <>
            <ul>
              {movieSearch.movies
                .slice(
                  getRelativePage(currentPage) * 5,
                  getRelativePage(currentPage) * 5 + 5
                )
                .map((movie) => {
                  return <Card key={movie.id} movie={movie} />;
                })}
            </ul>
            <Navigator totalPages={movieSearch.totalPages} />
          </>
        ) : (
          <p>sem resultados</p>
        )}
      </PageContext.Provider>
    </main>
  );
};

const searchMovies = async (
  query: string,
  page: number
): Promise<ISearchMovies> => {
  const emptySearchMovie = {
    movies: [],
    page: 0,
    totalMovies: 0,
    totalPages: 0
  };

  if (!query.length) return emptySearchMovie;

  const buffer = parseBuffer(page);

  const genres = await getGenreByName(query);

  const response = genres?.length
    ? await searchMoviesByGenre(genres, buffer)
    : await searchMoviesByTitle(query, buffer);

  return response ?? emptySearchMovie;
};

const parseBuffer = (page: number) => parseInt((page / 4 + 1).toFixed(0));

export default Search;
