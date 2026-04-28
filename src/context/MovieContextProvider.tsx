import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { favMovie, MovieContextType } from '../types/movietype';

export const MovieContext = createContext<MovieContextType | null>(null);

const MovieContextProvider = ({ children }: PropsWithChildren) => {
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [option, setOption] = useState('popular');
  const [favourites, setFavourites] = useState<favMovie[]>([]);
  const [tableOption, setTableOption] = useState('card');
  return (
    <MovieContext.Provider
      value={{
        name,
        setName,
        searchQuery,
        setSearchQuery,
        option,
        setOption,
        favourites,
        setFavourites,
        tableOption,
        setTableOption,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContextProvider };
