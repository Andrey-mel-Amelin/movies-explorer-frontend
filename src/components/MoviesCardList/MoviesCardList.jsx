import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ location }) {
  return (
    <section className="movies-card-list">
      <MoviesCard location={location} />
      {location.pathname === '/movies' && <button className="movies-card-list__button">Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
