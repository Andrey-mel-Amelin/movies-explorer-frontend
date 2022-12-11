import MoviesCardList from '../MoviesCardList/MoviesCardList';
/* import Preloader from "../Preloader/Preloader"; реализовать когда будет подключен API*/
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({ location }) {
  return (
    <section className="saved-movies">
      <SearchForm />
      {/* <Preloader /> реализовать когда будет подключен API */}
      <MoviesCardList location={location} />
    </section>
  );
}

export default SavedMovies;
