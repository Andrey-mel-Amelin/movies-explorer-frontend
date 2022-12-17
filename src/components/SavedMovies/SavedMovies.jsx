import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({
  isSavedSearch,
  savedFilterMovies,
  isSearchError,
  onGetMovie,
  findSavedMovie,
  onMovieLike,
  savedMovies,
  location,
}) {
  return (
    <section className="saved-movies">
      <SearchForm location={location} onGetMovie={onGetMovie} />
      <MoviesCardList
        isSavedSearch={isSavedSearch}
        savedFilterMovies={savedFilterMovies}
        isSearchError={isSearchError}
        findSavedMovie={findSavedMovie}
        savedMovies={savedMovies}
        onMovieLike={onMovieLike}
        location={location}
      />
    </section>
  );
}

export default SavedMovies;
