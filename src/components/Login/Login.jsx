import { Link } from "react-router-dom";

function Login() {
  return (
    <form className="form">
      <label className="form__label">
        E-mail
        <input required type="text" className="form__input" placeholder="E-mail" />
      </label>
      <label className="form__label" placeholder="Пароль">
        Пароль
        <input required type="password" className="form__input" placeholder="Пароль" />
      </label>
      <button className="form__button form__button_for_login" type="submit">
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