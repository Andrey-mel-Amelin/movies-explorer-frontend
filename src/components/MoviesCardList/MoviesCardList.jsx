import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  isSavedSearch,
  savedFilterMovies,
  filterMovies,
  isSearchError,
  onMovieLike,
  isUploadError,
  isLoading,
  savedMovies,
  location,
}) {
  const [moviesList, setMoviesList] = useState([]);
  const [stepShowMovies, setStepShowMovies] = useState(7);

  useEffect(() => {
    if (location.pathname === '/movies') {
      window.addEventListener('resize', () => {
        setTimeout(() => {
          window.screen.width <= 768 ? setStepShowMovies(5) : setStepShowMovies(7);
        }, 3000);
      });
    } else {
      window.removeEventListener('resize', () => {});
    }
  }, [location.pathname]);

  useEffect(() => {
    setMoviesList(
      location.pathname === '/movies'
        ? filterMovies.slice(0, stepShowMovies)
        : isSavedSearch
        ? savedFilterMovies
        : savedMovies
    );
  }, [filterMovies, savedMovies, isSavedSearch, savedFilterMovies, stepShowMovies, location.pathname]);

  function handleButton() {
    setMoviesList(filterMovies.slice(0, moviesList.length + stepShowMovies));
  }

  return (
    <section className="movies-card-list">
      {!moviesList.length && !isLoading && (
        <p className="movies-card-list__error-message">
          {!savedMovies.length ? 'Нет сохраненных фильмов.' : 'Ничего не найдено.'}
        </p>
      )}
      {isLoading ? (
        <Preloader />
      ) : isUploadError ? (
        <p className="movies-card-list__error-message">
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и
          попробуйте ещё раз.
        </p>
      ) : isSearchError ? (
        <p className="movies-card-list__error-message">Ничего не найдено</p>
      ) : (
        <>
          {moviesList.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id || movie._id}
              savedMovies={savedMovies}
              onMovieLike={onMovieLike}
              location={location}
            />
          ))}
          {location.pathname === '/movies' && filterMovies.length !== moviesList.length && (
            <button onClick={handleButton} className="movies-card-list__button">
              Ещё
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
