import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies({
  isBlockingButton,
  allMovieslist,
  showMovies,
  filterMovies,
  savedMovies,
  resStatus,
  isLoadingMovies,
  location,
  formValues,
  onSearchFilms,
  onMovieLike,
  onButtonMore,
  checkboxFilter,
}) {
  return (
    <section className="movies">
      <SearchForm
        isBlockingButton={isBlockingButton}
        checkboxFilter={checkboxFilter}
        formValues={formValues}
        location={location}
        onSearchFilms={onSearchFilms}
      />
      <p className="movies__error-message">
        {!allMovieslist.length
          ? 'После поиска здесь будет отображен список фильмов.'
          : !filterMovies.length && 'Ничего не найдено.'}
      </p>
      <MoviesCardList
        isBlockingButton={isBlockingButton}
        showMovies={showMovies}
        onButtonMore={onButtonMore}
        onMovieLike={onMovieLike}
        resStatus={resStatus}
        isLoadingMovies={isLoadingMovies}
        filterMovies={filterMovies}
        savedMovies={savedMovies}
        location={location}
      />
    </section>
  );
}

export default Movies;
