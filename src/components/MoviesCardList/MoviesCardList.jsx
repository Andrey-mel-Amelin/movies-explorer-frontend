import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  isBlockingButton,
  showMovies,
  savedMovies,
  filterMovies,
  resStatus,
  isLoadingMovies,
  location,
  onMovieLike,
  onButtonMore,
}) {
  return (
    <section className="movies-card-list">
      {isLoadingMovies ? (
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
              isBlockingButton={isBlockingButton}
              location={location}
            />
          ))}
          {location.pathname === '/movies' && filterMovies.length !== showMovies.length && (
            <button type="button" onClick={onButtonMore} className="movies-card-list__button">
              Ещё
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
