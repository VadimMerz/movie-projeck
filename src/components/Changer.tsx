import { useMovieContext } from '../hooks/useMovieContext';

function Changer() {
  const context = useMovieContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    context.setOption(e.target.value);
  };

  return (
    <>
      <div>
        <label>
          <input
            className='with-gap'
            onChange={handleChange}
            type='radio'
            name='group1'
            value='popular'
            checked={context.option === 'popular'}
          ></input>
          <span>
            {' '}
            <strong>Popular</strong>
          </span>
        </label>
        <label>
          <input
            className='with-gap'
            onChange={handleChange}
            type='radio'
            name='group1'
            value='top_rated'
            checked={context.option === 'top_rated'}
          ></input>
          <span>
            <strong>Top Rated</strong>
          </span>
        </label>
        <label>
          <input
            className='with-gap'
            onChange={handleChange}
            type='radio'
            name='group1'
            value='favourites'
            checked={context.option === 'favourites'}
          ></input>
          <span>
            <strong>Favourites</strong>
          </span>
        </label>
      </div>
    </>
  );
}

export { Changer };
