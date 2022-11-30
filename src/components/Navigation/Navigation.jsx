import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <div className="navigation">
      <Link to="/" className="logo logo_type_navigation" />
      <nav className="navigation__links">
        <NavLink to="/movies" className="navigation__link">
          Фильмы
        </NavLink>
        <NavLink to="/saved-movies" className="navigation__link">
          Сохранённые фильмы
        </NavLink>
      </nav>
      <NavLink to="/profile" className="navigation__link navigation__link_type_profile">
        Аккаунт
        <div className="navigation__profile-logo" />
      </NavLink>
    </div>
  );
}

export default Navigation;
