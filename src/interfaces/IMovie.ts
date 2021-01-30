import IGenre from './IGenre';

interface IMovie {
  id: number;
  posterPath?: string;
  title?: string;
  voteAverage?: number;
  releaseDate?: string;
  overview?: string;
  genres?: IGenre[];
}

export default IMovie;
