function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link portfolio__link_for_list"
            href="https://andrey-mel-amelin.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
          <div className="portfolio__arrow" />
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link portfolio__link_for_list"
            href="https://andrey-mel-amelin.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
          <div className="portfolio__arrow" />
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link portfolio__link_for_list"
            href="https://github.com/Andrey-mel-Amelin/react-mesto-auth"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
          <div className="portfolio__arrow" />
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;