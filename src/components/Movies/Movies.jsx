import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function Movies({
  isLiked,
  onMovieLike,
  isUploadError,
  isLoading,
  movies,
  savedMovies,
  onGetMovie,
  location,
}) {
  return (
    <section className="movies">
      <SearchForm location={location} onGetMovie={onGetMovie} />
      <MoviesCardList
        isLiked={isLiked}
        onMovieLike={onMovieLike}
        isUploadError={isUploadError}
        isLoading={isLoading}
        movies={movies}
        savedMovies={savedMovies}
        location={location}
      />
    </section>
  );
}

export default Movies;
