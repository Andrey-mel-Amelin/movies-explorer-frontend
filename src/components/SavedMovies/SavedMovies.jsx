import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({
  showMovies,
  savedMovies,
  savedFilterMovies,
  resStatus,
  isSavedSearch,
  location,
  onSearchSavedFilms,
  onMovieLike,
  checkboxFilter,
}) {
  return (
    <section className="saved-movies">
      <SearchForm checkboxFilter={checkboxFilter} onSearchSavedFilms={onSearchSavedFilms} location={location} />
      {!savedMovies.length ? (
        <p className="saved-movies__error-message">Нет сохраненных фильмов.</p>
      ) : (
        !savedFilterMovies.length && isSavedSearch && <p className="saved-movies__error-message">Ничего не найдено.</p>
      )}
      <MoviesCardList
        showMovies={showMovies}
        savedMovies={savedMovies}
        savedFilterMovies={savedFilterMovies}
        resStatus={resStatus}
        location={location}
        onMovieLike={onMovieLike}
      />
    </section>
  );
}

export default SavedMovies;
