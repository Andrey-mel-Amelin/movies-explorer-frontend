function MoviesCard() {
  return (
    <>
      <article className="movies-card">
        <h3 className="movies-card__title">33 слова о дизайне</h3>
        <span className="movies-card__duration">1ч 42м</span>
        <div className="movies-card__like movies-card__like_active" />
        <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/1.png')} />
      </article>
      <article className="movies-card">
        <h3 className="movies-card__title">Киноальманах «100 лет дизайна»</h3>
        <span className="movies-card__duration">1ч 42м</span>
        <div className="movies-card__like movies-card__like_active" />
        <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/2.png')} />
      </article>
      <article className="movies-card">
        <h3 className="movies-card__title">В погоне за Бенкси</h3>
        <span className="movies-card__duration">1ч 42м</span>
        <div className="movies-card__like" />
        <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/3.png')} />
      </article>
      <article className="movies-card">
        <h3 className="movies-card__title">Баския: Взрыв реальности</h3>
        <span className="movies-card__duration">1ч 42м</span>
        <div className="movies-card__like" />
        <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/4.png')} />
      </article>
      <article className="movies-card">
        <h3 className="movies-card__title">Бег это свобода</h3>
        <span className="movies-card__duration">1ч 42м</span>
        <div className="movies-card__like movies-card__like_active" />
        <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/5.png')} />
      </article>
      <article className="movies-card">
        <h3 className="movies-card__title">Книготорговцы</h3>
        <span className="movies-card__duration">1ч 42м</span>
        <div className="movies-card__like" />
        <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/6.png')} />
      </article>
      <article className="movies-card">
        <h3 className="movies-card__title">Когда я думаю о Германии ночью</h3>
        <span className="movies-card__duration">1ч 42м</span>
        <div className="movies-card__like" />
        <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/7.png')} />
      </article>
    </>
  );
}

export default MoviesCard;
