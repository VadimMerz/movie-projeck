import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { favMovie, Movie } from '../types/movietype';
import { Search } from './Search';
import { Changer } from './Changer';
import { ChangerTable } from './ChangerTable';
import { Favourites } from './Favourites';
import { useMovieContext } from '../hooks/useMovieContext';
import { useGetPopular } from '../hooks/useGetPopular';
import { useGetTopRated } from '../hooks/useGetTopRated';
import { useSearchMovie } from '../hooks/useSearchMovie';
import { MovieTable } from './MovieTable';
import { Pagination } from './Pagination';

export function MovieCard() {
  const [isHovered, setIsHovered] = useState<{
    id: number;
    hovered: boolean;
  } | null>(null);
  const context = useMovieContext();
  const popularData = useGetPopular();
  const topRatedData = useGetTopRated();
  const searchData = useSearchMovie(context.searchQuery);

  useEffect(() => {
    const storedFavourites = localStorage.getItem('favourit');
    const favArray = storedFavourites ? JSON.parse(storedFavourites) : [];
    context.setFavourites(favArray);
  }, []);

  useEffect(() => {
    context.setSearchQuery('');
    context.setName('');
  }, [context.option]);

  const filterMovie = () => {
    context.setSearchQuery(context.name);
  };

  function addMovieToLS(movie: favMovie): void {
    const storedFavourites = localStorage.getItem('favourit');
    const currentFav = storedFavourites ? JSON.parse(storedFavourites) : [];

    const exists = currentFav.some((f: any) => f.id === movie.id);

    let newFav;
    if (exists) {
      newFav = currentFav.filter((f: any) => f.id !== movie.id);
    } else {
      newFav = [...currentFav, movie];
    }

    localStorage.setItem('favourit', JSON.stringify(newFav));

    context.setFavourites(newFav);
  }
  let data;
  if (context.option === 'favourites') {
    data = context.favourites.filter((f) =>
      f.title
        .trim()
        .toLowerCase()
        .includes(context.searchQuery.trim().toLowerCase()),
    );
  } else if (context.searchQuery !== '') {
    data = searchData;
  } else if (context.option === 'top_rated') {
    data = topRatedData;
  } else {
    data = popularData;
  }

  return (
    <>
      <Search filterMovie={filterMovie} />
      <Changer />
      <ChangerTable />
      {context.tableOption === 'table' ? (
        <MovieTable
          data={data}
          addMovieToLS={addMovieToLS}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
        />
      ) : (
        <div className='container'>
          <div className='cards-grid'>
            {(data ?? []).map((movies: Movie) => (
              <div
                key={movies.id}
                className='card'
              >
                <div className='card-image'>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movies?.poster_path}`}
                  />
                </div>
                <div className='card-content'>
                  <span className=' card-title'>
                    <strong>{movies?.title}</strong>
                  </span>
                  <p>{movies?.overview.slice(0, 60)}...</p>
                </div>
                <div className='card-action'>
                  <Link
                    to={`/movie/${movies.id}`}
                    className='btn'
                  >
                    View details
                  </Link>
                  <Favourites
                    movie={movies}
                    addMovieToLS={addMovieToLS}
                    isHovered={isHovered}
                    setIsHovered={setIsHovered}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
