import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies({
  formValues,
  allMovieslist,
  showMovies,
  filterMovies,
  savedMovies,
  resStatus,
  isLoadingMovies,
  location,
  onSearchFilms,
  onMovieLike,
  onButtonMore,
  checkboxFilter,
}) {
  return (
    <section className="movies">
      <SearchForm
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
