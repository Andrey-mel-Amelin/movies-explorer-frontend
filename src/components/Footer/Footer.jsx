function Footer({ location }) {
  const notAllowedPaths = ['/', '/movies', '/saved-movies'].includes(location.pathname);

  return (
    <>
      {notAllowedPaths && (
        <footer className="footer">
          <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__container">
            <span className="footer__year">© 2022</span>
            <ul className="footer__list">
              <li>
                <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">
                  Яндекс Практикум
                </a>
              </li>
              <li>
                <a className="footer__link" href="https://github.com/" target="_blank" rel="noreferrer">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
