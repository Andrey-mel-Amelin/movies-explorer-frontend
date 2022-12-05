import { Link } from "react-router-dom";

function Register() {
  return (
    <form className="form">
      <label className="form__label">
        Имя
        <input type="text" className="form__input" placeholder="Имя" />
      </label>
      <label className="form__label">
        E-mail
        <input type="text" className="form__input" placeholder="E-mail" />
      </label>
      <label className="form__label" placeholder="Пароль">
        Пароль
        <input type="password" className="form__input form__input_type_error" value="12345678912345" placeholder="Пароль" />
        <span className="form__text-error">Что-то пошло не так...</span>
      </label>
      <button className="form__button" type="submit">
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
