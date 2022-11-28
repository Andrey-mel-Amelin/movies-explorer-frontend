import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      <div className="header__auth-container">
        <button className="header__button">Регистрация</button>
        <button className="header__button header__button_type_black">Войти</button>
      </div>
    </header>
  )
}

export default Header;