import { NavLink } from 'react-router-dom';
import { authPath } from '../../constants/constants';
import { NavigationComponent } from '../../types/componentsTypes';

function Navigation({ location, menuActivity, onClick }: NavigationComponent) {
  return !authPath.includes(location.pathname) ? (
    <>
      <div
        onClick={() => {
          onClick();
        }}
        className={`navigation ${menuActivity ? 'navigation_active' : ''}`}
      >
        <nav
          onClick={(evt) => {
            evt.stopPropagation();
          }}
          className={`navigation__links ${menuActivity ? 'navigation__links_active' : ''}`}
        >
          {window.innerWidth > 1023 ? (
            <>
              <NavLink to="/movies" className="navigation__link">
                Фильмы
              </NavLink>
              <NavLink to="/saved-movies" className="navigation__link">
                Сохранённые фильмы
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className="navigation__link">
                Главная
                {location.pathname === '/' && <span className="navigation__underline" />}
              </NavLink>
              <NavLink to="/movies" className="navigation__link">
                Фильмы
                {location.pathname === '/movies' && <span className="navigation__underline" />}
              </NavLink>
              <NavLink to="/saved-movies" className="navigation__link">
                Сохранённые фильмы
                {location.pathname === '/saved-movies' && <span className="navigation__underline" />}
              </NavLink>
              <NavLink to="/profile" className="navigation__link navigation__link_type_profile">
                Аккаунт
                {location.pathname === '/profile' && <span className="navigation__underline" />}
                <div className="navigation__profile-logo" />
              </NavLink>
            </>
          )}
        </nav>
        {window.innerWidth > 1023 && (
          <NavLink to="/profile" className="navigation__link navigation__link_type_profile">
            Аккаунт
            <div className="navigation__profile-logo" />
          </NavLink>
        )}
      </div>
    </>
  ) : (
    <></>
  );
}

export default Navigation;
