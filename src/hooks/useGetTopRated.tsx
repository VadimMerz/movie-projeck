import { url, API_KEY } from '../api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getTopRated() {
  const topRated = `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
  const response = await axios.get(url + topRated);
  const resTopRated = response.data;
  return resTopRated;
}

function useGetTopRated() {
  const { data } = useQuery({
    queryKey: ['top_rated'],
    queryFn: getTopRated,
    select: (data) => data.results,
  });
  return data;
}

export { useGetTopRated };
