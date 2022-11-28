function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__info-items">
        <article className="about-project__info-item">
          <h3 className="about-project__title about-project__title_for_info">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </article>
        <article className="about-project__info-item">
          <h3 className="about-project__title about-project__title_for_info">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <article className="about-project__timeline-items">
        <div className="about-project__timeline-item about-project__timeline-item_for_backend">
          <span className="about-project__timeline about-project__timeline_for_backend">1 неделя</span>
          <span className="about-project__text about-project__text_type_grey">Back-end</span>
        </div>
        <div className="about-project__timeline-item about-project__timeline-item_for_frontend">
          <span className="about-project__timeline about-project__timeline_for_frontend">4 недели</span>
          <span className="about-project__text about-project__text_type_grey">Front-end</span>
        </div>
      </article>
    </section>
  );
}

export default AboutProject;
