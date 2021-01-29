import axios from 'axios';
import 'dotenv/config';
import IGenre from '../interfaces/IGenre';

import IMovie from '../interfaces/IMovie';
import IMovieResponse from '../interfaces/IMovieResponse';
import ISpokenLanguages from '../interfaces/ISpokenLanguages';

import movieMock from '../mock/movie';

const tmdb = axios.create({
  baseURL: `https://api.themoviedb.org/3`
});

export async function searchMovies(
  search: string,
  page?: number
): Promise<IMovie[]> {
  return [movieMock, movieMock, movieMock];

  // const apiKey = process.env.REACT_APP_API_KEY;

  // const res: IMovieResponse = (
  //   await tmdb.get<IMovieResponse>(`movie/284053?api_key=${apiKey}&language=pt`)
  // ).data;

  // const movie = parseMovie(res);

  // // tmdb
  // //   .get<IMovieResponse>(`movie/284053?api_key=${apiKey}`)
  // //   .then(({ data }) => {
  // //     res = parseMovie(data);
  // //   });

  // // tmdb
  // //   .get(`search/movie?api_key=${apiKey}&query=${search}&page=${page ?? 1}`)
  // //   .then((res) => {
  // //     console.log(res.data);
  // //   });

  // return movie;
}
//-----------------------------------------------------------------------------
function parseMovie(res: IMovieResponse): IMovie {
  return {
    posterPath: getImage(res.poster_path),
    title: res.title,
    voteAverage: res.vote_average,
    releaseDate: res.release_date,
    overview: res.overview,
    genres: getGenreNames(res.genres),
    status: res.status,
    languages: getLanguageNames(res.spoken_languages),
    runtime: res.runtime,
    budget: res.budget,
    revenue: res.revenue
  };
}
//-----------------------------------------------------------------------------
function getImage(path?: string): string | undefined {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : undefined;
}
//-----------------------------------------------------------------------------
function getGenreNames(genres?: IGenre[]): string[] | undefined {
  if (!genres) return;

  let genresName: string[] = [];

  genres.forEach((genre) => genresName.push(genre.name));

  return genresName;
}
//-----------------------------------------------------------------------------
function getLanguageNames(
  languages?: ISpokenLanguages[]
): string[] | undefined {
  if (!languages) return;

  let languagesName: string[] = [];

  languages.forEach((language) => languagesName.push(language.name));

  return languagesName;
}
