import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/validationForms';

function Register({ resStatus, onRegister }) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = values;
    if (!isValid) return;
    onRegister(name, email, password);
    resetForm();
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="form__label">
        Имя
        <input
          minLength="2"
          onChange={handleChange}
          value={values.name || ''}
          name="name"
          required
          pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
          type="text"
          className={`form__input ${errors.name ? 'form__input_type_error' : ''}`}
          placeholder="Имя"
        />
        <span className="form__text-error">{errors.name || ''}</span>
      </label>
      <label className="form__label">
        E-mail
        <input
          onChange={handleChange}
          value={values.email || ''}
          name="email"
          required
          type="email"
          className={`form__input ${errors.email ? 'form__input_type_error' : ''}`}
          placeholder="E-mail"
        />
        <span className="form__text-error">{errors.email || ''}</span>
      </label>
      <label className="form__label" placeholder="Пароль">
        Пароль
        <input
          onChange={handleChange}
          value={values.password || ''}
          name="password"
          required
          minLength="6"
          type="password"
          className={`form__input ${errors.password ? 'form__input_type_error' : ''}`}
          placeholder="Пароль"
        />
        <span className="form__text-error">{errors.password || ''}</span>
      </label>
      <span className="form__text-error form__text-error_type_submit">
        {resStatus === false && 'Произошла ошибка запроса регистрации.'}
      </span>
      <button className={`form__button ${!isValid ? 'form__button_type_error' : ''}`} disabled={!isValid} type="submit">
        Зарегистрироваться
      </button>
      <p className="form__text">
        Уже зарегистрированы?
        <Link className="form__link" to="/signin">
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;
