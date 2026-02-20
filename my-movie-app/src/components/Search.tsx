import type { SearchProps } from '../types/movietype';

function Search({ name, setName, filterMovie }: SearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            filterMovie(name);
          }
        }}
        value={name}
        onChange={handleChange}
        type='text'
        placeholder='Find movie'
      ></input>
    </div>
  );
}

export { Search };
