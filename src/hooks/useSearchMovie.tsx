import { url, API_KEY } from '../api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function searchMovie(name: string) {
  const search = `/search/movie?api_key=${API_KEY}&query=${name}`;
  const response = await axios.get(url + search);
  const resSearch = response.data;
  return resSearch;
}

function useSearchMovie(name: string) {
  const { data } = useQuery({
    queryKey: ['search_movie', name],
    queryFn: () => searchMovie(name),
    enabled: !!name,
    select: (data) => data.results,
  });
  return data;
}

export { useSearchMovie };
