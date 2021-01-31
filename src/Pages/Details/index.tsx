import { FC, HTMLAttributes, useContext, useEffect } from 'react';
import MovieContext from '../../contexts/MovieContext';
import IMovie from '../../interfaces/IMovie';

// import './styles.css';
interface DetailsProps extends HTMLAttributes<HTMLElement> {
  movie: IMovie;
}
//=============================================================================
const Details = () => {
  const [movieContext] = useContext(MovieContext);

  useEffect(() => {
    // get detailed movie
  });

  if (movieContext)
    return (
      <div>
        {movieContext.title}
        {movieContext.releaseDate}
        {movieContext.overview}
      </div>
    );
  else return <div>loading...</div>;
};

export default Details;
