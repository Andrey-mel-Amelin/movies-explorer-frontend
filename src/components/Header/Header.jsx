import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ menuActivity, onMenuToggle, location }) {
  const moviesPath = ['/profile', '/movies', '/saved-movies'];
  const authPath = ['/signup', '/signin'];

  return (
    <header className={`header ${authPath.includes(location.pathname) ? 'header_for_auth' : ''}`}>
      <Link to="/" className="logo" />

      {location.pathname === '/signin' && <h2 className="header__title">Рады видеть!</h2>}
      {location.pathname === '/signup' && <h2 className="header__title">Добро пожаловать!</h2>}

      {window.screen.width <= 768 ? (
        <>
          {moviesPath.includes(location.pathname) ? (
            <div
              onClick={onMenuToggle}
              className={`header__menu-container ${menuActivity ? 'header__menu-container_type_mobile' : ''}`}
            >
              <span className={`header__menu ${menuActivity ? 'header__menu_active' : ''}`} />
            </div>
          ) : location.pathname === '/' && menuActivity === true ? (
            <div onClick={onMenuToggle} className="header__menu-container header__menu-container_type_mobile">
              <span className={`header__menu ${menuActivity ? 'header__menu_active' : ''}`} />
            </div>
          ) : authPath.includes(location.pathname) ? (
            <></>
          ) : (
            <>
              <div className="header__auth-container">
                <Link to="/signup" className="header__link">
                  Регистрация
                </Link>
                <Link to="/signin" className="header__link header__link_type_black">
                  Войти
                </Link>
              </div>
            </>
          )}
          <Navigation location={location} menuActivity={menuActivity} />
        </>
      ) : location.pathname === '/' ? (
        <>
          <div className="header__auth-container">
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
            <Link to="/signin" className="header__link header__link_type_black">
              Войти
            </Link>
          </div>
        </>
      ) : moviesPath.includes(location.pathname) ? (
        <Navigation location={location} menuActivity={menuActivity} />
      ) : (
        ''
      )}
    </header>
  );
}

export default Header;
