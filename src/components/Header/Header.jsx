import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, menuActivity, onMenuToggle, location }) {
  const authPath = ['/signup', '/signin'];

  return (
    <header className={`header ${!loggedIn || authPath.includes(location.pathname) ? 'header_for_auth' : ''}`}>
      <Link to="/" className="logo" />
      {location.pathname === '/signin' && <h2 className="header__title">Рады видеть!</h2>}
      {location.pathname === '/signup' && <h2 className="header__title">Добро пожаловать!</h2>}
      <>
        {!loggedIn ? (
          <>
            {!authPath.includes(location.pathname) && (
              <div className="header__auth-container">
                <Link to="/signup" className="header__link">
                  Регистрация
                </Link>
                <Link to="/signin" className="header__link header__link_type_black">
                  Войти
                </Link>
              </div>
            )}

            {menuActivity && (
              <>
                <div
                  onClick={onMenuToggle}
                  className={`header__menu-container ${menuActivity ? 'header__menu-container_type_mobile' : ''}`}
                >
                  <span className={`header__menu ${menuActivity ? 'header__menu_active' : ''}`} />
                </div>
                <Navigation location={location} menuActivity={menuActivity} />
              </>
            )}
          </>
        ) : (
          <>
            <Navigation location={location} menuActivity={menuActivity} />
            <div
              onClick={onMenuToggle}
              className={`header__menu-container ${menuActivity ? 'header__menu-container_type_mobile' : ''}`}
            >
              <span className={`header__menu ${menuActivity ? 'header__menu_active' : ''}`} />
            </div>
          </>
        )}
      </>
    </header>
  );
}

export default Header;
