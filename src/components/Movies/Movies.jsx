import { useEffect, useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { api } from '../../utils/MoviesApi';

function Movies({ onMovieLike, savedMovies, location }) {
  const [allMovieslist, setAllMoviesList] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [isUploadError, setIsUploadError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(`movies`)) {
      setAllMoviesList(JSON.parse(localStorage.getItem(`movies`)));
    }
  }, []);

  useEffect(() => {
    const valueLocal = localStorage.getItem('search-value');
    const checkboxLocal = localStorage.getItem('search-checkbox');
    if (allMovieslist.length && valueLocal && checkboxLocal) {
      handleSearchFilms(JSON.parse(valueLocal), JSON.parse(checkboxLocal));
    }
  }, [allMovieslist]);

  function handleSearchFilms(value, checkbox) {
    if (!allMovieslist.length) {
      setIsLoading(true);
      return api
        .getMovies()
        .then((movies) => {
          setAllMoviesList(movies);
          localStorage.setItem('movies', JSON.stringify(movies));
          setIsLoading(false);
          setIsUploadError(false);
        })
        .catch(() => {
          setIsUploadError(true);
        });
    } else {
      return setFilterMovies(
        allMovieslist.filter((i) => {
          if (checkbox) {
            return i.nameRU.toLowerCase().includes(value.toLowerCase()) && i.duration <= 40;
          } else {
            return i.nameRU.toLowerCase().includes(value.toLowerCase());
          }
        })
      );
    }
  }

  return (
    <section className="movies">
      <SearchForm location={location} onSearchFilms={handleSearchFilms} />
      {!allMovieslist.length ? '' : !filterMovies.length && (<p className="movies__error-message">Ничего не найдено.</p>)}
      <MoviesCardList
        onMovieLike={onMovieLike}
        isUploadError={isUploadError}
        isLoading={isLoading}
        filterMovies={filterMovies}
        savedMovies={savedMovies}
        location={location}
      />
    </section>
  );
}

export default Movies;
