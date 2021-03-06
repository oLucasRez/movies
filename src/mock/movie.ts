import IMovieDetails from '../interfaces/IMovieDetails';

const movie: IMovieDetails = {
  id: 284053,
  budget: 180000000,
  genres: [
    {
      id: 28,
      name: 'Ação'
    },
    {
      id: 12,
      name: 'Aventura'
    },
    {
      id: 35,
      name: 'Comédia'
    },
    {
      id: 14,
      name: 'Fantasia'
    },
    {
      id: 878,
      name: 'Ficção científica'
    }
  ],
  languages: ['English'],
  overview:
    'Thor encontra-se preso do outro lado do universo, sem o seu martelo poderoso, numa corrida contra o tempo para voltar a Asgard e impedir Ragnarok - a destruição do seu mundo e o fim da civilização Asgardiana – que se encontra nas mãos de uma nova e poderosa ameaça, a implacável Hela. Mas primeiro, Thor precisa de sobreviver a uma luta mortal de gladiadores, que o coloca contra um seu ex-aliado e companheiro Vingador – Hulk.',
  posterPath: 'https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
  releaseDate: '2017-10-25',
  revenue: 853977126,
  runtime: 131,
  status: 'Released',
  title: 'Thor: Ragnarok',
  voteAverage: '76%'
};

export default movie;
