interface IMovieResponse {
  id: number;
  poster_path?: string;
  title?: string;
  vote_average?: number;
  release_date?: string;
  overview?: string;
  genre_ids?: number[];
}

export default IMovieResponse;
