import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { Favourites } from './Favourites';
import { Pagination } from './Pagination';
import type { ColumnDef } from '@tanstack/react-table';
import type { Movie, MovieTableProps } from '../types/movietype';

function MovieTable({
  data,
  addMovieToLS,
  isHovered,
  setIsHovered,
}: MovieTableProps) {
  const columns: ColumnDef<Movie>[] = [
    {
      id: 'id',
      cell: (i) => {
        const rows = i.row.original;
        return (
          <div className='movie-table'>
            <img
              className='table-img'
              src={`https://image.tmdb.org/t/p/w500${rows.poster_path}`}
            />
            <div className='one-colomn'>
              <p>
                <strong>{rows.title}</strong>
              </p>
              <div className='table-content'>
                <p>{rows.overview.slice(0, 100)}...</p>
                <p>{rows.release_date.slice(0, 4)}</p>
                <p>
                  {rows.vote_average}{' '}
                  <i className='y tiny material-icons'>star</i>
                </p>
              </div>
            </div>
            <Link
              to={`/movie/${rows.id}`}
              className='table-btn btn'
            >
              Details
            </Link>
            <Favourites
              addMovieToLS={addMovieToLS}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
              movie={rows}
            />
          </div>
        );
      },
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <table>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination table={table} />
    </>
  );
}

export { MovieTable };
