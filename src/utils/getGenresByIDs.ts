import IGenre from '../interfaces/IGenre';

import { getAllGenres } from '../services/tmdb';

const key = 'genres';
//=============================================================================
async function getGenresByIDs(genreIDs: number[]): Promise<IGenre[]> {
  if (someGenreNotFound(genreIDs)) {
    const genres = await getAllGenres();
    setStorageGenres(genres);
  }

  return getStorageGenres();
}
//-----------------------------------------------------------------------------
function getStorageGenres(): IGenre[] {
  const storageValue = localStorage.getItem(key);

  return storageValue ? JSON.parse(storageValue) : [];
}
//-----------------------------------------------------------------------------
function someGenreNotFound(genreIDs: number[]) {
  const storageGenres = getStorageGenres();

  if (!storageGenres.length) return true;

  const everyGenresFound = genreIDs.every((genreID) => {
    const someStorageIDIsGenreID = storageGenres.some(
      ({ id }) => genreID === id
    );
    return someStorageIDIsGenreID;
  });

  return !everyGenresFound;
}
//-----------------------------------------------------------------------------
function setStorageGenres(genres: IGenre[]) {
  localStorage.setItem(key, JSON.stringify(genres));
}

export default getGenresByIDs;
