import type { Dispatch, SetStateAction } from 'react';

interface Movie {
  title: string;
  id: number;
  overview: string;
  release_date: string;
  poster_path: string | null;
  genres?: { id: number; name: string }[];
  origin_country?: string[];
  vote_average?: number;
  production_companies?: {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }[];
  runtime?: number;
  certification: string;
  budget: number;
}

interface MovieAge {
  results: {
    iso_3166_1?: string;
    release_dates: {
      certification?: string;
    }[];
  }[];
}
interface SearchProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  filterMovie: (name: string) => void;
}
interface ChangeProps {
  option: string;
  setOption: Dispatch<SetStateAction<string>>;
}

type favMovie = Pick<Movie, 'id' | 'title' | 'overview' | 'poster_path'>;
interface FavouritesProps {
  addMovieToLS: (movie: favMovie) => void;
  movie: favMovie;

  isHovered: { id: number; hovered: boolean } | null;
  setIsHovered: Dispatch<
    SetStateAction<{ id: number; hovered: boolean } | null>
  >;
  favourites: favMovie[];
  setFavourites: Dispatch<SetStateAction<favMovie[]>>;
}

export type {
  Movie,
  MovieAge,
  SearchProps,
  ChangeProps,
  FavouritesProps,
  favMovie,
};
