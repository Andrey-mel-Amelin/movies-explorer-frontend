import { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({ onMovieLike, savedMovies, location }) {
  const [savedFilterMovies, setSavedFilterMovies] = useState([]);
  const [isSavedSearch, setIsSavedSearch] = useState(false);

  function handleSearchSavedFilms(value, checkbox) {
    setIsSavedSearch(true);

    const savedSearch = savedMovies.filter((i) => i.nameRU.toLowerCase().includes(value.toLowerCase()));

    const savedShortSearch = savedMovies.filter(
      (i) => i.nameRU.toLowerCase().includes(value.toLowerCase()) && i.duration <= 40
    );

    if (savedSearch || savedShortSearch) {
      if (checkbox && savedShortSearch) {
        setSavedFilterMovies([...savedShortSearch]);
      } else {
        setSavedFilterMovies([...savedSearch]);
      }
    }
  }

  return (
    <section className="saved-movies">
      <SearchForm onSearchSavedFilms={handleSearchSavedFilms} location={location} />
      {!savedMovies.length
        ? ''
        : !savedFilterMovies.length && isSavedSearch && <p className="movies__error-message">Ничего не найдено.</p>}
      <MoviesCardList
        isSavedSearch={isSavedSearch}
        savedFilterMovies={savedFilterMovies}
        savedMovies={savedMovies}
        onMovieLike={onMovieLike}
        location={location}
      />
    </section>
  );
}

export default SavedMovies;
