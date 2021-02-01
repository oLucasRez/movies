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
export async function getGenreByName(
  genreName: string
): Promise<IGenre[] | undefined> {
  if (!genreFoundInStorage(genreName)) await updateStorageGenres();

  const genre = getStorageGenres().filter(({ name }) => {
    const treatedName = removeSpecialChar(name.toUpperCase());
    const treatedGenre = removeSpecialChar(genreName.toString().toUpperCase());

    return treatedName.includes(treatedGenre);
  });

  return genre;
}
//-----------------------------------------------------------------------------
function genreFoundInStorage(genre: number | string): boolean {
  const storageGenres = getStorageGenres();

  if (!storageGenres.length) return false;

  const genreFound = storageGenres.some(({ id, name }) => {
    const treatedName = removeSpecialChar(name.toUpperCase());
    const treatedGenre = removeSpecialChar(genre.toString().toUpperCase());

    return genre === id || treatedName.includes(treatedGenre);
  });

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
//-----------------------------------------------------------------------------
function removeSpecialChar(string: string): string {
  return string.normalize('NFD').replace(/[^a-zA-Zs]/g, '');
}
