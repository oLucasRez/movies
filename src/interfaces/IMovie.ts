interface IMovie {
  posterPath?: string;
  title?: string;
  voteAverage?: number;
  releaseDate?: string;
  overview?: string;
  genres?: string[];
  status?: string;
  languages?: string[];
  runtime?: number;
  budget?: number;
  revenue?: number;
}

export default IMovie;
