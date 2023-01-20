import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/validationForms';

function Profile({ isBlockingButton, onUpdateUser, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email } = values;
    if (!isValid) return;
    onUpdateUser(name, email);
    resetForm();
  }

  const notValidToUpdate = !isValid || (currentUser.name === values.name && currentUser.email === values.email);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  return (
    <section className="profile">
      <h3 className="profile__title">{`Привет, ${currentUser.name}!`}</h3>
      <form onSubmit={handleSubmit} className="profile__form">
        <label className="profile__label">
          Имя
          <input
            minLength="2"
            onChange={handleChange}
            value={values.name || ''}
            name="name"
            required
            pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            type="text"
            className={`profile__input ${errors.name ? 'profile__input_type_error' : ''}`}
            placeholder="Имя"
          />
          <span className="profile__text-error">{errors.name || ''}</span>
        </label>
        <label className="profile__label">
          E-mail
          <input
            onChange={handleChange}
            value={values.email || ''}
            name="email"
            required
            type="email"
            className={`profile__input ${errors.email ? 'profile__input_type_error' : ''}`}
            placeholder="E-mail"
          />
          <span className="profile__text-error">{errors.email || ''}</span>
        </label>
        <button
          type="submit"
          className={`profile__button profile__button_type_submit ${
            notValidToUpdate ? 'profile__button_type_error' : ''
          }`}
          disabled={notValidToUpdate && isBlockingButton}
        >
          Редактировать
        </button>
      </form>
      <button disabled={isBlockingButton} onClick={onLogout} className="profile__button">
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
