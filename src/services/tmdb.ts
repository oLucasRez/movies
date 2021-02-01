import axios from 'axios';
import 'dotenv/config';
import IDiscoverMoviesResponse from '../interfaces/IDiscoverMoviesResponse';
import IGenre from '../interfaces/IGenre';

import IMovie from '../interfaces/IMovie';
import IMovieDetails from '../interfaces/IMovieDetails';
import IMovieDetailsResponse from '../interfaces/IMovieDetailsResponse';
import IMovieResponse from '../interfaces/IMovieResponse';
import ISearchMovies from '../interfaces/ISearchMovies';
import ISpokenLanguages from '../interfaces/ISpokenLanguages';

import movieMock from '../mock/movie';
import { getGenresByIDs } from '../utils/getGenre';

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
  pageRequest?: number
): Promise<ISearchMovies | undefined> {
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
      `&page=${pageRequest ?? 1}` +
      `&with_genres=${genresString}`
  );

  const { page, results, total_pages, total_results } = response.data;
  const movies = await parseMovies(results);

  return {
    movies,
    page,
    totalPages: total_pages,
    totalMovies: total_results
  };
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
export async function getMovieDetails(movieID: number): Promise<IMovieDetails> {
  const apiKey = process.env.REACT_APP_API_KEY;

  const response = await tmdb.get<IMovieDetailsResponse>(
    `movie/${movieID}?api_key=${apiKey}&language=pt&append_to_response=videos`
  );

  const movieDetails = parseMovieDetails(response.data);

  return movieDetails;
}
//-----------------------------------------------------------------------------
async function parseMovies(
  moviesResponse: IMovieResponse[]
): Promise<IMovie[]> {
  const promises = moviesResponse.map((movieResponse) =>
    parseMovie(movieResponse)
  );

  const movies = await Promise.all(promises);

  return movies;
}
//-----------------------------------------------------------------------------
async function parseMovie(movieResponse: IMovieResponse): Promise<IMovie> {
  const {
    id,
    poster_path,
    title,
    vote_average,
    release_date,
    overview,
    genre_ids
  } = movieResponse;

  return {
    id,
    posterPath: getImage(poster_path),
    title,
    voteAverage: formatVoteAverage(vote_average),
    releaseDate: formatReleaseDate(release_date),
    overview,
    genres: await getGenresByIDs(genre_ids ?? [])
  };
}
//-----------------------------------------------------------------------------
function parseMovieDetails(
  movieDetailsResponse: IMovieDetailsResponse
): IMovieDetails {
  const {
    id,
    poster_path,
    title,
    vote_average,
    release_date,
    overview,
    genres,
    status,
    spoken_languages,
    runtime,
    budget,
    revenue,
    videos
  } = movieDetailsResponse;

  return {
    id,
    posterPath: getImage(poster_path),
    title,
    voteAverage: formatVoteAverage(vote_average),
    releaseDate: formatReleaseDate(release_date),
    overview,
    genres,
    status,
    languages: getLanguageNames(spoken_languages),
    runtime,
    budget,
    revenue,
    video: getVideo(videos)
  };
}
//-----------------------------------------------------------------------------
function getImage(path?: string): string | undefined {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : undefined;
}
//-----------------------------------------------------------------------------
function formatReleaseDate(releaseDate: string | undefined): string {
  if (releaseDate) {
    const releaseDateArray = releaseDate.split('-');
    const newReleaseDate =
      releaseDateArray[2] +
      '/' +
      releaseDateArray[1] +
      '/' +
      releaseDateArray[0];

    return newReleaseDate;
  } else return 'NA';
}
//-----------------------------------------------------------------------------
function formatVoteAverage(voteAverage: number | undefined): string {
  if (voteAverage) return voteAverage * 10 + '%';
  else return 'NA';
}
//-----------------------------------------------------------------------------
// function getGenreNames(genres?: IGenre[]): string[] | undefined {
//   if (!genres) return;

//   let genresName: string[] = [];

//   genres.forEach((genre) => genresName.push(genre.name));

//   return genresName;
// }
//-----------------------------------------------------------------------------
function getLanguageNames(
  languages?: ISpokenLanguages[]
): string[] | undefined {
  if (!languages) return;

  let languagesName: string[] = [];

  languages.forEach((language) => languagesName.push(language.name));

  return languagesName;
}
//-----------------------------------------------------------------------------
function getVideo(
  video: { results: { key: string }[] } | undefined
): string | undefined {
  if (!video) return;

  return `https://www.youtube.com/embed/${video.results[0].key}`;
}
