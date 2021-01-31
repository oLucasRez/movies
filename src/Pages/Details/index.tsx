import { useContext, useEffect } from 'react';

import Circle from '../../components/Circle';
import Tag from '../../components/Tag';

import MovieContext from '../../contexts/MovieContext';
// import IMovie from '../../interfaces/IMovie';

import './styles.css';
// interface DetailsProps extends HTMLAttributes<HTMLElement> {
//   movie: IMovie;
// }
//=============================================================================
const Details = () => {
  const [movieContext] = useContext(MovieContext);

  useEffect(() => {
    // get detailed movie
  });

  if (movieContext)
    return (
      <div className="details-container">
        <header>
          <h2 className="title">{movieContext.title}</h2>
          <p>{movieContext.releaseDate}</p>
        </header>
        <main>
          <div className="description-container">
            <h1 className="title">Sinopse</h1>
            <p>{movieContext.overview}</p>
            <h1 className="title">Informações</h1>
            <div className="info-container">
              <div>
                <h1 className="title">Situação</h1>
                <p>Lançado</p>
              </div>
              <div>
                <h1 className="title">Idioma</h1>
                <p>Inglês</p>
              </div>
              <div>
                <h1 className="title">Duração</h1>
                <p>2h 10min</p>
              </div>
              <div>
                <h1 className="title">Orçamento</h1>
                <p>$ 180 000 000,00</p>
              </div>
              <div>
                <h1 className="title">Receita</h1>
                <p>$ 853 977 000,00</p>
              </div>
              <div>
                <h1 className="title">Lucro</h1>
                <p>$ 673 977 000,00</p>
              </div>
            </div>
            <div className="tagvote-container">
              <div className="tags-container">
                {movieContext.genres?.map((genre) => (
                  <Tag className="title" key={genre.id}>
                    {genre.name}
                  </Tag>
                ))}
              </div>
              <div className="vote-container">
                <Circle size={7}>{movieContext.voteAverage}</Circle>
              </div>
            </div>
          </div>
          <div
            className="image-container"
            style={{
              backgroundImage: `url(${movieContext.posterPath})`
            }}
          />
        </main>
      </div>
    );
  else return <div>loading...</div>;
};

export default Details;
