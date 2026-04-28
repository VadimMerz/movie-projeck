import { useParams, useNavigate } from 'react-router-dom';
import { Preloader } from '../components/Preloader';
import { useGetOneMovie } from '../hooks/useGetOneMovie';
import { useGetAge } from '../hooks/useGetAge';
import type { Genre, ProductionCompany, CountryAge } from '../types/movietype';

function Movies() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { id } = useParams();
  const data = useGetOneMovie(id);
  const ageData = useGetAge(id);

  if (!data || !ageData) return <Preloader />;

  return (
    <>
      <div className='movie-title'>
        <h2>{data.title}</h2>
      </div>
      <div className='sec-card'>
        <div className='card-image'>
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
          />
        </div>
        <div className='sec-card-content'>
          <table className='movie-info'>
            {' '}
            <tbody>
              <tr>
                <td className='l'>Genres:</td>
                <td>{data.genres?.map((g: Genre) => g.name).join(', ')}</td>
              </tr>
              <tr>
                <td className='l'>Certification:</td>
                <td>
                  {ageData.results.find(
                    (r: CountryAge) => r.iso_3166_1 === 'CA',
                  )?.release_dates[0].certification || 'N/A'}
                </td>
              </tr>
              <tr>
                <td className='l'>Runtime:</td>
                <td>{data.runtime} min</td>
              </tr>
              <tr>
                <td className='l'>Release date:</td>
                <td>{data.release_date.slice(0, 4)}</td>
              </tr>
              <tr>
                <td className='l'>Budget:</td>
                <td>{data.budget}$</td>
              </tr>
              <tr>
                <td className='l'>Country:</td>
                <td>{data.origin_country?.join(', ')}</td>
              </tr>
              <tr>
                <td className='l'>Popularity :</td>
                <td>{data.vote_average}</td>
              </tr>
              <tr>
                <td className='l'>Production Companies:</td>
                <td>
                  {data.production_companies
                    ?.map((pc: ProductionCompany) => pc.name)
                    .join(', ')}
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
          {data.overview}
        </p>
      </div>
    </>
  );
}

export { Movies };
