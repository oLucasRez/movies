import IGenre from '../interfaces/IGenre';

import { getAllGenres } from '../services/tmdb';

const key = 'genres';
//=============================================================================
export async function getGenresByIDs(
  genreIDs: number[]
): Promise<IGenre[] | undefined> {
  const genres: IGenre[] = [];

  for (let i = 0; i < genreIDs.length; i++) {
    const genre = await getGenreByID(genreIDs[i]);

    if (!genre) return undefined;
    genres.push(genre);
  }

  return genres;
}
//-----------------------------------------------------------------------------
export async function getGenreByID(
  genreID: number
): Promise<IGenre | undefined> {
  if (!genreFoundInStorage(genreID)) await updateStorageGenres();

  const genre = getStorageGenres().find(({ id }) => id === genreID);

  return genre;
}
//-----------------------------------------------------------------------------
function everyGenresFoundInStorage(genreIDs: number[]): boolean {
  const storageGenres = getStorageGenres();

  if (!storageGenres.length) return false;

  const everyGenresFound = genreIDs.every((genreID) =>
    genreFoundInStorage(genreID)
  );

  return everyGenresFound;
}
//-----------------------------------------------------------------------------
function genreFoundInStorage(genreID: number): boolean {
  const storageGenres = getStorageGenres();

  if (!storageGenres.length) return false;

  const genreFound = storageGenres.some(({ id }) => genreID === id);

  return genreFound;
}
//-----------------------------------------------------------------------------
function getStorageGenres(): IGenre[] {
  const storageValue = localStorage.getItem(key);

  return storageValue ? JSON.parse(storageValue)[key] : [];
}
//-----------------------------------------------------------------------------
async function updateStorageGenres() {
  const genres = await getAllGenres();
  setStorageGenres(genres);
}
//-----------------------------------------------------------------------------
function setStorageGenres(genres: IGenre[]) {
  localStorage.setItem(key, JSON.stringify(genres));
}
