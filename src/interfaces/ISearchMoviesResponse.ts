import IMovieResponse from './IMovieResponse';

interface IDiscoverMoviesResponse {
  page: number;
  results: IMovieResponse[];
  total_pages: number;
  total_results: number;
}

export default IDiscoverMoviesResponse;
