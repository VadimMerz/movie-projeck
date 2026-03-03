import type { Movie } from '../types/movietype';
import type { MovieAge } from '../types/movietype';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getOneMovie, getAge } from '../api';
import { Preloader } from '../components/Preloader';

function Movies() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [age, setAge] = useState<MovieAge | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getOneMovie(id);
      setMovie(data);
      const dataAge = await getAge(id);
      setAge(dataAge);
    }
    fetchData();

    // const getOneMovie = async () => {
    //   const res = await fetch(
    //     `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    //   );
    //   const data = await res.json();
    //   setMovie(data);
    // };
    // getOneMovie();
    // const getAge = async () => {
    //   const resAge = await fetch(
    //     `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`,
    //   );
    //   const dataAge = await resAge.json();
    //   setAge(dataAge);
    // };
    // getAge();
  }, [id]);

  if (!movie) return <Preloader />;

  return (
    <>
      <div className='movie-title'>
        <h2>{movie.title}</h2>
      </div>
      <div className='sec-card'>
        <div className='card-image'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className='sec-card-content'>
          <table className='movie-info'>
            {' '}
            <tbody>
              <tr>
                <td className='l'>Genres:</td>
                <td>{movie.genres?.map((g) => g.name).join(', ')}</td>
              </tr>
              <tr>
                <td className='l'>Certification:</td>
                <td>
                  {age?.results.find((r) => r.iso_3166_1 === 'CA')
                    ?.release_dates[0].certification || 'N/A'}
                </td>
              </tr>
              <tr>
                <td className='l'>Runtime:</td>
                <td>{movie.runtime} min</td>
              </tr>
              <tr>
                <td className='l'>Release date:</td>
                <td>{movie.release_date.slice(0, 4)}</td>
              </tr>
              <tr>
                <td className='l'>Budget:</td>
                <td>{movie.budget}$</td>
              </tr>
              <tr>
                <td className='l'>Country:</td>
                <td>{movie.origin_country?.join(', ')}</td>
              </tr>
              <tr>
                <td className='l'>Popularity :</td>
                <td>{movie.vote_average}</td>
              </tr>
              <tr>
                <td className='l'>Production Companies:</td>
                <td>
                  {movie.production_companies?.map((pc) => pc.name).join(', ')}
                </td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={goBack}
            className='btn'
          >
            {' '}
            Go Back
          </button>
        </div>
        <p className='l'>
          <strong>Overview: </strong>
          {movie.overview}
        </p>
      </div>
    </>
  );
}

export { Movies };
