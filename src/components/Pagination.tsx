import type { PaginationProps } from '../types/movietype';

function Pagination({ table }: PaginationProps) {
  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const lastPage = pageCount - 1;
  const allPages = Array.from({ length: pageCount }, (_, i) => i);
  console.log(lastPage);

  return (
    <ul className='pagination'>
      <li>
        <button
          disabled={currentPage === 0}
          className='btn-flat'
          onClick={() => {
            if (currentPage !== 0) table.previousPage();
          }}
        >
          <i className='material-icons'>chevron_left</i>
        </button>
      </li>
      {allPages.map((page) => (
        <li
          key={page}
          className={page === currentPage ? 'active' : 'waves-effect'}
        >
          <button
            className='btn-flat'
            onClick={() => table.setPageIndex(page)}
          >
            {page + 1}
          </button>
        </li>
      ))}
      <li>
        <button
          disabled={currentPage === lastPage}
          className='btn-flat'
          onClick={() => {
            if (currentPage !== lastPage) table.nextPage();
          }}
        >
          <i className='material-icons'>chevron_right</i>
        </button>
      </li>
    </ul>
  );
}

export { Pagination };
