import MoviesCardList from "../MoviesCardList/MoviesCardList";
/* import Preloader from "../Preloader/Preloader"; реализовать когда будет подключен API*/
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      {/* <Preloader /> реализовать когда будет подключен API */}
      <MoviesCardList />
    </section>
  );
}

export default Movies;