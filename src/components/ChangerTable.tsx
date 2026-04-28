import { useMovieContext } from '../hooks/useMovieContext';

function ChangerTable() {
  const context = useMovieContext();

  const handleChangeTable = (e: React.ChangeEvent<HTMLInputElement>) => {
    context.setTableOption(e.target.value);
  };

  return (
    <>
      <div>
        <label>
          <input
            className='with-gap'
            onChange={handleChangeTable}
            type='radio'
            name='group2'
            value='card'
            checked={context.tableOption === 'card'}
          ></input>
          <span>
            {' '}
            <strong>Cards</strong>
          </span>
        </label>
        <label>
          <input
            className='with-gap'
            onChange={handleChangeTable}
            type='radio'
            name='group2'
            value='table'
            checked={context.tableOption === 'table'}
          ></input>
          <span>
            <strong>Table</strong>
          </span>
        </label>
      </div>
    </>
  );
}

export { ChangerTable };
