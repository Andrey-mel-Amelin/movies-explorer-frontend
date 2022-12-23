import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  showMovies,
  savedMovies,
  filterMovies,
  resStatus,
  isLoading,
  location,
  onMovieLike,
  onButtonMore,
}) {
  return (
    <section className="movies-card-list">
      {isLoading ? (
        <Preloader />
      ) : !resStatus ? (
        <p className="movies-card-list__error-message">
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и
          попробуйте ещё раз.
        </p>
      ) : (
        <>
          {showMovies.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id || movie._id}
              savedMovies={savedMovies}
              onMovieLike={onMovieLike}
              location={location}
            />
          ))}
          {location.pathname === '/movies' && filterMovies.length !== showMovies.length && (
            <button onClick={onButtonMore} className="movies-card-list__button">
              Ещё
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
