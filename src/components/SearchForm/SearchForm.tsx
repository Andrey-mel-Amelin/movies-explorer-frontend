import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { SearchFormComponent } from '../../types/componentsTypes';

function SearchForm({
  isBlockingButton,
  formValues,
  location,
  checkboxFilter,
  onSearchSavedFilms,
  onSearchFilms,
}: SearchFormComponent) {
  const [isInvalid, setInvalid] = useState(false);
  const [searchValue, setSearchValue] = useState(location.pathname === '/movies' ? formValues!.value : '');
  const [searchCheckbox, setCheckbox] = useState(location.pathname === '/movies' ? formValues!.checkbox : false);

  useEffect(() => {
    if (location.pathname === '/movies') {
      setSearchValue(formValues!.value);
      setCheckbox(formValues!.checkbox);
    }
  }, [location, formValues]);

  function handleValue(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
    if (!searchValue) return;
    const checkboxValue = e.target.checked;
    setCheckbox(checkboxValue);
    checkboxFilter(searchValue, checkboxValue);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // учитывать пустую строку поиска только на вкладке фильмов
    if (searchValue === '' && location.pathname === '/movies') {
      setInvalid(true);
      return;
    }

    setInvalid(false);

    if (location.pathname === '/movies') {
      onSearchFilms!(searchValue, searchCheckbox);
    } else {
      onSearchSavedFilms!(searchValue, searchCheckbox);
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
      <button disabled={isBlockingButton} className="search-form__submit" type="submit">
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
