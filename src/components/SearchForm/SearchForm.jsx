function SearchForm() {
  return (
    <form className="search-form">
      <input className="search-form__input" type="text" name="search" placeholder="Фильм" />
      <button className="search-form__submit" type="submit">
        Найти
      </button>
      <label htmlFor="search-film" className="search-form__label">
        <span className="search-form__checkbox-text">Короткометражки</span>
        <input required id="search-film" className="search-form__checkbox" type="checkbox" />
      </label>
    </form>
  );
}

export default SearchForm;