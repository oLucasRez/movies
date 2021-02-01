import IMovie from './IMovie';

interface IMovieDetails extends IMovie {
  status?: string;
  languages?: string[];
  runtime?: number;
  budget?: number;
  revenue?: number;
  video?: string;
}

export default IMovieDetails;
