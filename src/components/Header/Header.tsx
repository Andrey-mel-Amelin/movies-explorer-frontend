import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { authPath } from '../../constants/constants';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { HeaderComponent } from '../../types/componentsTypes';

function Header({ menuActivity, onMenuToggle, location }: HeaderComponent) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className={`header ${authPath.includes(location.pathname) ? 'header_for_auth' : ''}`}>
      <Link to="/" className="logo" />{' '}
      {location.pathname === '/signin' && <h2 className="header__title">Рады видеть!</h2>}
      {location.pathname === '/signup' && <h2 className="header__title">Добро пожаловать!</h2>}
      <>
        {!currentUser.name ? (
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
                <button onClick={onMenuToggle} className="header__menu-container">
                  <span className={`header__menu ${menuActivity ? 'header__menu_active' : ''}`} />
                </button>
                <Navigation onClick={onMenuToggle} location={location} menuActivity={menuActivity} />
              </>
            )}
          </>
        ) : (
          <>
            <Navigation onClick={onMenuToggle} location={location} menuActivity={menuActivity} />
            <div onClick={onMenuToggle} className="header__menu-container">
              <span className={`header__menu ${menuActivity ? 'header__menu_active' : ''}`} />
            </div>
          </>
        )}
      </>
    </header>
  );
}

export default Header;
