import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies({
  allMovieslist,
  showMovies,
  filterMovies,
  savedMovies,
  resStatus,
  isLoading,
  location,
  formValues,
  onSearchFilms,
  onMovieLike,
  onButtonMore,
}) {
  return (
    <section className="movies">
      <SearchForm formValues={formValues} location={location} onSearchFilms={onSearchFilms} />
      {!allMovieslist.length ? '' : !filterMovies.length && <p className="movies__error-message">Ничего не найдено.</p>}
      <MoviesCardList
        showMovies={showMovies}
        onButtonMore={onButtonMore}
        onMovieLike={onMovieLike}
        resStatus={resStatus}
        isLoading={isLoading}
        filterMovies={filterMovies}
        savedMovies={savedMovies}
        location={location}
      />
    </section>
  );
}

export default Movies;
