import IGenre from './IGenre';
import ISpokenLanguages from './ISpokenLanguages';

interface IMovieDetailsResponse {
  id: number;
  poster_path?: string;
  title?: string;
  vote_average?: number;
  release_date?: string;
  overview?: string;
  genres?: IGenre[];
  status?: string;
  spoken_languages?: ISpokenLanguages[];
  runtime?: number;
  budget?: number;
  revenue?: number;
}

export default IMovieDetailsResponse;
