import axios from 'axios';
import 'dotenv/config';

const tmdb = axios.create({
  baseURL: `https://api.themoviedb.org/3`
});

export function searchMovie(search: string, page?: number) {
  const apiKey = process.env.REACT_APP_API_KEY;

  tmdb
    .get(`search/movie?api_key=${apiKey}&query=${search}&page=${page ?? 1}`)
    .then((res) => {
      console.log(res.data);
    });
}
