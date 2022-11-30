import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="movies-card-list">
      <MoviesCard />
      <button className="movies-card-list__button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
