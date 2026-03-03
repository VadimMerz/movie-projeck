function Header() {
  return (
    <nav className='black'>
      <div className='nav-wrapper  '>
        <a
          href='/'
          className='brand-logo center'
        >
          Movies
        </a>
        <ul className='left hide-on-med-and-down'>
          <li>
            <a href='!#'>Repo</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export { Header };
