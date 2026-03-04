import type { ChangeProps } from '../types/movietype';

function Changer({ option, setOption }: ChangeProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
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
            checked={option === 'popular'}
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
            checked={option === 'top_rated'}
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
            checked={option === 'favourites'}
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
