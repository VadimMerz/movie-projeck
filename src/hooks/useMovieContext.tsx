import { MovieContext } from '../context/MovieContextProvider';
import { useContext } from 'react';

export const useMovieContext = () => {
  const val = useContext(MovieContext);
  if (val === null) {
    throw 'error';
  }
  return val;
};
