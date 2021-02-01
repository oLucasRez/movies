import IMovie from './IMovie';

interface ISearchMovies {
  page: number;
  movies: IMovie[];
  totalPages: number;
  totalMovies: number;
}

export default ISearchMovies;
