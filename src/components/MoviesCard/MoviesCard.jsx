function MoviesCard({ savedMovies, onMovieLike, isBlockingButton, movie, location }) {
  return (
    <article className="movies-card">
      <h3 className="movies-card__title">{movie.nameRU}</h3>
      <span className="movies-card__duration">
        {movie.duration >= 60
          ? `${Math.floor(movie.duration / 60)} ч ${movie.duration % 60 === 0 ? '' : (movie.duration % 60) + ' м'}`
          : `${movie.duration} м`}
      </span>
      <button
        disabled={isBlockingButton}
        onClick={() => onMovieLike(movie)}
        className={`movies-card__button  ${
          savedMovies.find((i) => i.movieId === movie.id)
            ? 'movies-card__button_active'
            : location.pathname === '/saved-movies'
            ? 'movies-card__button_type_delete'
            : ''
        }`}
      />
      <a className="movies-card__link" href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movies-card__image"
          alt={movie.nameRU}
          src={`${
            location.pathname === '/saved-movies' ? movie.image : `https://api.nomoreparties.co/${movie.image.url}`
          }`}
        />
      </a>
    </article>
  );
}

export default MoviesCard;
