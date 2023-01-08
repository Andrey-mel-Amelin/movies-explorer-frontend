import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/validationForms';

function Login({ resStatus, onLogin }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    if (!isValid) return;

    onLogin(email, password);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="form">
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
        {resStatus === false && 'Произошла ошибка запроса авторизации.'}
      </span>
      <button className={`form__button ${!isValid ? 'form__button_type_error' : ''}`} disabled={!isValid} type="submit">
        Войти
      </button>
      <p className="form__text">
        Ещё не зарегистрированы?
        <Link className="form__link" to="/signup">
          Регистрация
        </Link>
      </p>
    </form>
  );
}

export default Login;
