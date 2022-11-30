import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ location }) {
  return (
    <header className="header">
      {location.pathname === '/' ? (
        <>
          <Link to="/" className="logo" />
          <div className="header__auth-container">
            <button className="header__button">Регистрация</button>
            <button className="header__button header__button_type_black">Войти</button>
          </div>
        </>
      ) : (
        <Navigation />
      )}
    </header>
  );
}

export default Header;
