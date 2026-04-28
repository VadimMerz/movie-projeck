import { url, API_KEY } from '../api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getPopular() {
  const popular = `/movie/popular?api_key=${API_KEY}`;
  const response = await axios.get(url + popular);
  const resPopular = response.data;
  return resPopular;
}

function useGetPopular() {
  const { data } = useQuery({
    queryKey: ['popular'],
    queryFn: getPopular,
    select: (data) => data.results,
  });
  return data;
}

export { useGetPopular };
