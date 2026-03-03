import type { FavouritesProps } from '../types/movietype';

function Favourites({
  movie,
  isHovered,
  setIsHovered,
  favourites,
  addMovieToLS,
}: FavouritesProps) {
  return (
    <>
      <a className=' btn-flat'>
        <i
          onClick={() => addMovieToLS(movie)}
          onMouseEnter={() => setIsHovered({ id: movie.id, hovered: true })}
          onMouseLeave={() => setIsHovered({ id: movie.id, hovered: false })}
          className='icon material-icons'
        >
          {favourites.some((f) => f.id === movie.id) ||
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
