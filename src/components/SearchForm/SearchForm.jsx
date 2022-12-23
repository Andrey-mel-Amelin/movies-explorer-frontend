import { useState } from 'react';

function SearchForm({ formValues, onSearchSavedFilms, location, onSearchFilms }) {
  const [isInvalid, setInvalid] = useState(false);
  const [searchValue, setSearchValue] = useState(formValues.value);
  const [searchCheckbox, setCheckbox] = useState(formValues.checkbox);

  function handleValue(e) {
    setSearchValue(e.target.value);
  }

  function handleCheckbox(e) {
    setCheckbox(e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // учитывать пустую строку поиска только на вкладке фильмов
    if (e.target[0].value === '' && location.pathname === '/movies') {
      setInvalid(true);
      return;
    }

    setInvalid(false);

    localStorage.setItem('search-value', JSON.stringify(searchValue));
    localStorage.setItem('search-checkbox', JSON.stringify(searchCheckbox));
    
    if (location.pathname === '/movies') {
      onSearchFilms(searchValue, searchCheckbox);
    } else {
      onSearchSavedFilms(searchValue, searchCheckbox);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        value={searchValue}
        onChange={handleValue}
        className="search-form__input"
        type="text"
        name="search"
        placeholder="Фильм"
      />
      <span className="search-form__error">{isInvalid && 'Нужно ввести ключевое слово'}</span>
      <button className="search-form__submit" type="submit">
        Найти
      </button>
      <label htmlFor="search-film" className="search-form__label">
        <span className="search-form__checkbox-text">Короткометражки</span>
        <input
          checked={searchCheckbox}
          onChange={handleCheckbox}
          id="search-film"
          className="search-form__checkbox"
          type="checkbox"
        />
      </label>
    </form>
  );
}

export default SearchForm;
