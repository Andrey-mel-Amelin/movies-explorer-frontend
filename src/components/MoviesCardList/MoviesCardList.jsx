import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  isSavedSearch,
  savedFilterMovies,
  isSearchError,
  onMovieLike,
  isUploadError,
  isLoading,
  movies,
  savedMovies,
  location,
}) {
  const [moviesList, setMoviesList] = useState([]);
  const [stepShowMovies, setStepShowMovies] = useState(7);
  window.addEventListener('resize', () => {
    setTimeout(() => {
      window.screen.width <= 768 ? setStepShowMovies(5) : setStepShowMovies(7);
    }, 3000);
  });

  useEffect(() => {
    setMoviesList(
      location.pathname === '/movies'
        ? movies.slice(0, stepShowMovies)
        : isSavedSearch
        ? savedFilterMovies
        : savedMovies
    );
  }, [movies, stepShowMovies, savedMovies, location.pathname, isSavedSearch, savedFilterMovies]);

  function handleButton() {
    setMoviesList(movies.slice(0, moviesList.length + stepShowMovies));
  }

  return (
    <section className="movies-card-list">
      {(movies || savedMovies).length === 0 ? (
        <p className="movies-card-list__error-message">Ничего не найдено.</p>
      ) : isLoading ? (
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
              key={movie.id || movie.movieId}
              savedMovies={savedMovies}
              movie={movie}
              onMovieLike={onMovieLike}
              location={location}
            />
          ))}
          {location.pathname === '/movies' && movies.length !== moviesList.length && (
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
