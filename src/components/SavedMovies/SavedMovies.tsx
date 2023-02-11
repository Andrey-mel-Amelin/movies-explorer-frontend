import { SavedMoviesComponent } from '../../types/componentsTypes';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({
  isBlockingButton,
  showMovies,
  savedMovies,
  savedFilterMovies,
  resStatus,
  isSavedSearch,
  location,
  onSearchSavedFilms,
  onMovieLike,
  checkboxFilter,
}: SavedMoviesComponent) {
  return (
    <section className="saved-movies">
      <SearchForm
        isBlockingButton={isBlockingButton}
        checkboxFilter={checkboxFilter}
        onSearchSavedFilms={onSearchSavedFilms}
        location={location}
      />
      {!savedMovies.length ? (
        <p className="saved-movies__error-message">Нет сохраненных фильмов.</p>
      ) : (
        !savedFilterMovies.length && isSavedSearch && <p className="saved-movies__error-message">Ничего не найдено.</p>
      )}
      <MoviesCardList
        showMovies={showMovies}
        savedMovies={savedMovies}
        filterMovies={savedFilterMovies}
        resStatus={resStatus}
        location={location}
        onMovieLike={onMovieLike}
        isBlockingButton={isBlockingButton}
      />
    </section>
  );
}

export default SavedMovies;
