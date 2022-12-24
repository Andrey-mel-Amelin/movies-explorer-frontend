import { Link } from "react-router-dom";

function NotFound({ getBack }) {
  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__back" onClick={getBack}>
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
