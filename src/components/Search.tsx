import type { SearchProps } from '../types/movietype';
import { useMovieContext } from '../hooks/useMovieContext';

function Search({ filterMovie }: SearchProps) {
  const context = useMovieContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    context.setName(e.target.value);
  };

  return (
    <div>
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            filterMovie(context.name);
          }
        }}
        value={context.name}
        onChange={handleChange}
        type='text'
        placeholder='Find movie'
      ></input>
    </div>
  );
}

export { Search };
