import type { FavouritesProps } from '../types/movietype';
import { useMovieContext } from '../hooks/useMovieContext';

function Favourites({
  movie,
  isHovered,
  setIsHovered,
  addMovieToLS,
}: FavouritesProps) {
  const context = useMovieContext();
  return (
    <>
      <a className='fav-btn btn-flat'>
        <i
          onClick={() => addMovieToLS(movie)}
          onMouseEnter={() => setIsHovered({ id: movie.id, hovered: true })}
          onMouseLeave={() => setIsHovered({ id: movie.id, hovered: false })}
          className='icon material-icons'
        >
          {context.favourites.some((f) => f.id === movie.id) ||
          (isHovered !== null &&
            isHovered.id === movie.id &&
            isHovered.hovered === true)
            ? 'favorite'
            : 'favorite_border'}
        </i>
      </a>
    </>
  );
}

export { Favourites };
