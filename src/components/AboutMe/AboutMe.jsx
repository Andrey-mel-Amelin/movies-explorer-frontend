function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <h3 className="about-me__name">Андрей</h3>
        <p className="about-me__text about-me__text_for_description">Фронтенд-разработчик, 29 лет</p>
        <p className="about-me__text">
          Я родился в славном городе Северске. Катаюсь по командировкам 6 лет. Я люблю слушать музыку, смотреть кино.
          Недавно начал кодить. Горю желанием развиваться в направлении IT, с детства об этом мечтал. Стараюсь впитывать
          информацию со всевозможных источников, больший интерес вызывают вебинары и видео на ютубе с лайвкодингом, где
          можно подчеркнуть что нибудь новое и интересное.
        </p>
        <a className="about-me__link" href="https://github.com/Andrey-mel-Amelin" target="_blank" rel="noreferrer">
          Github
        </a>
        <div className="about-me__photo" />
      </div>
      <h4 className="about-me__portfolio-title">Портфолио</h4>
      <ul className="about-me__list">
        <li className="about-me__list-item">
          <a
            className="about-me__link about-me__link_for_list"
            href="https://andrey-mel-amelin.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
          <div className="about-me__arrow" />
        </li>
        <li className="about-me__list-item">
          <a
            className="about-me__link about-me__link_for_list"
            href="https://andrey-mel-amelin.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
          <div className="about-me__arrow" />
        </li>
        <li className="about-me__list-item">
          <a
            className="about-me__link about-me__link_for_list"
            href="https://github.com/Andrey-mel-Amelin"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
          <div className="about-me__arrow" />
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;
