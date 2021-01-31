import { Dispatch, SetStateAction, createContext } from 'react';

import IMovie from '../interfaces/IMovie';

type MovieContextType = [
  IMovie | undefined,
  Dispatch<SetStateAction<IMovie | undefined>>
];
//=============================================================================
const MovieContext = createContext<
  | [IMovie | undefined, Dispatch<SetStateAction<IMovie | undefined>>]
  | [undefined, undefined]
>([undefined, undefined]);

export default MovieContext;
