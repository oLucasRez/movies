import { Dispatch, SetStateAction, createContext } from 'react';

type PageContextType =
  | [number, Dispatch<SetStateAction<number>>]
  | [undefined, undefined];
//=============================================================================
const PageContext = createContext<PageContextType>([undefined, undefined]);

export default PageContext;
