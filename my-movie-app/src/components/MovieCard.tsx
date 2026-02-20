import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../api';
import type { Movie } from '../types/movietype';
import type { favMovie } from '../types/movietype';
import { Search } from './Search';
import { Changer } from './Changer';
import { Favourites } from './Favourites';

export function MovieCard() {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [name, setName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [option, setOption] = useState('popular');
  const [isHovered, setIsHovered] = useState<{
    id: number;
    hovered: boolean;
  } | null>(null);
  const [favourites, setFavourites] = useState<favMovie[]>([]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem('favourit');
    const favArray = storedFavourites ? JSON.parse(storedFavourites) : [];
    setFavourites(favArray);
  }, []);

  useEffect(() => {
    const getMovie = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMovie(data.results);
    };

    const getTopRatedMovie = async () => {
      const resTopRated = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
      );
      const dataTopRated = await resTopRated.json();
      setMovie(dataTopRated.results);
    };
    if (option === 'top_rated') {
      getTopRatedMovie();
    } else {
      getMovie();
    }
    setSearchQuery('');
    setName('');
  }, [option]);

  const SearchMovie = async () => {
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}`,
    );
    const searchData = await searchRes.json();
    setMovie(searchData.results);
  };

  const filterMovie = () => {
    if (option === 'favourites') {
      setSearchQuery(name);
    } else {
      SearchMovie();
    }
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

    setFavourites(newFav);
  }

  return (
    <>
      <Search
        name={name}
        setName={setName}
        filterMovie={filterMovie}
      />
      <Changer
        option={option}
        setOption={setOption}
      />
      <div className='container'>
        <div className='cards-grid'>
          {(option === 'favourites' ? favourites : movie)
            .filter((f) =>
              f.title
                .trim()
                .toLowerCase()
                .includes(searchQuery.trim().toLowerCase()),
            )
            .map((movies) => (
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
                    setFavourites={setFavourites}
                    favourites={favourites}
                    isHovered={isHovered}
                    setIsHovered={setIsHovered}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
