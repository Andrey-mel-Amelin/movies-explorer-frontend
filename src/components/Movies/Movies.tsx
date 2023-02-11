import { MoviesComponent } from '../../types/componentsTypes';
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
}: MoviesComponent) {
  return (
    <section className="movies">
      <SearchForm
        isBlockingButton={isBlockingButton}
        formValues={formValues}
        location={location}
        checkboxFilter={checkboxFilter}
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
        savedMovies={savedMovies}
        filterMovies={filterMovies}
        resStatus={resStatus}
        isLoadingMovies={isLoadingMovies}
        location={location}
        onMovieLike={onMovieLike}
        onButtonMore={onButtonMore}
      />
    </section>
  );
}

export default Movies;
