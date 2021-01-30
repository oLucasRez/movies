import IMovie from './IMovie';

interface IMovieDetails extends IMovie {
  status?: string;
  languages?: string[];
  runtime?: number;
  budget?: number;
  revenue?: number;
}

export default IMovieDetails;
