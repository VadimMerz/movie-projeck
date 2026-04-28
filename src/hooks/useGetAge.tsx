import { url, API_KEY } from '../api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getAge(id: string | undefined) {
  const ageUrl = `/movie/${id}/release_dates?api_key=${API_KEY}`;
  const response = await axios.get(url + ageUrl);
  const resAge = response.data;
  return resAge;
}

function useGetAge(id: string | undefined) {
  const { data } = useQuery({
    queryKey: ['age', id],
    queryFn: () => getAge(id),
    enabled: !!id,
  });
  return data;
}

export { useGetAge };