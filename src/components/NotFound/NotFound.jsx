import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function NotFound({ goBack }) {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      {!!currentUser._id ? (
        <Link className="not-found__back" onClick={goBack}>
          Назад
        </Link>
      ) : (
        <Link className="not-found__back" to='.'>
          Назад
        </Link>
      )}
    </section>
  );
}

export default NotFound;
