import axios from 'axios';
import 'dotenv/config';
import IDiscoverMoviesResponse from '../interfaces/IDiscoverMoviesResponse';
import IGenre from '../interfaces/IGenre';

import IMovie from '../interfaces/IMovie';
import IMovieResponse from '../interfaces/IMovieDetailsResponse';
import ISpokenLanguages from '../interfaces/ISpokenLanguages';

import movieMock from '../mock/movie';

const tmdb = axios.create({
  baseURL: `https://api.themoviedb.org/3`
});

export async function searchMoviesByTitle(
  searchText: string,
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
export async function searchMoviesByGenre(
  genres: IGenre[],
  page: number
): Promise<IDiscoverMoviesResponse | undefined> {
  if (!genres.length) return;

  const apiKey = process.env.REACT_APP_API_KEY;

  let genresString = genres[0].id + '';
  for (let i = 1; i < genres.length; i++)
    genresString = genresString + ',' + genres[i].id;

  const response = await tmdb.get<IDiscoverMoviesResponse>(
    `discover/movie?api_key=${apiKey}` +
      `&language=pt` +
      `&sort_by=popularity.desc` +
      `&include_adult=true` +
      `&page=${page}` +
      `&with_genres=${genresString}`
  );

  return response.data;
}
//-----------------------------------------------------------------------------
export async function getAllGenres(): Promise<IGenre[]> {
  const apiKey = process.env.REACT_APP_API_KEY;

  const response = await tmdb.get<IGenre[]>(
    `genre/movie/list?api_key=${apiKey}&language=pt`
  );

  return response.data;
}
//-----------------------------------------------------------------------------
function parseMovie(movieResponse: IMovieResponse): IMovie {
  return {
    posterPath: getImage(movieResponse.poster_path),
    title: movieResponse.title,
    voteAverage: movieResponse.vote_average,
    releaseDate: movieResponse.release_date,
    overview: movieResponse.overview,
    genres: getGenreNames(movieResponse.genres),
    status: movieResponse.status,
    languages: getLanguageNames(movieResponse.spoken_languages),
    runtime: movieResponse.runtime,
    budget: movieResponse.budget,
    revenue: movieResponse.revenue
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
