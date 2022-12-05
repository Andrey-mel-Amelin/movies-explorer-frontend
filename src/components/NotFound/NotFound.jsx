import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__back" to={navigate(-1)}>
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
