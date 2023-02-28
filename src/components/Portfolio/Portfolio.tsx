function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/Andrey-mel-Amelin/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <div className="portfolio__arrow" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/Andrey-mel-Amelin/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <div className="portfolio__arrow" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://github.com/Andrey-mel-Amelin/black-sharks-sushi"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <div className="portfolio__arrow" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
