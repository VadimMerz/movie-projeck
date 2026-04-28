import { url, API_KEY } from '../api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getOneMovie(id: string | undefined) {
  const oneMovie = `/movie/${id}?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url + oneMovie);
  const resOneMovie = response.data;
  return resOneMovie;
}

function useGetOneMovie(id: string | undefined) {
  const { data } = useQuery({
    queryKey: ['one_movie', id],
    queryFn: () => getOneMovie(id),
    enabled: !!id,
  });
  return data;
}

export { useGetOneMovie };
