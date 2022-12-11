function MoviesCard({ location }) {
  return (
    <>
      {window.screen.width > 768 ? (
        location.pathname === '/movies' ? (
          <>
            <article className="movies-card">
              <h3 className="movies-card__title">33 слова о дизайне</h3>
              <span className="movies-card__duration">1ч 42м</span>
              <button className="movies-card__button movies-card__button_active" />
              <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/1.png')} />
            </article>
            <article className="movies-card">
              <h3 className="movies-card__title">Киноальманах «100 лет дизайна»</h3>
              <span className="movies-card__duration">1ч 42м</span>
              <button className="movies-card__button movies-card__button_active" />
              <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/2.png')} />
            </article>
            <article className="movies-card">
              <h3 className="movies-card__title">В погоне за Бенкси</h3>
              <span className="movies-card__duration">1ч 42м</span>
              <button className="movies-card__button" />
              <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/3.png')} />
            </article>
            <article className="movies-card">
              <h3 className="movies-card__title">Баския: Взрыв реальности</h3>
              <span className="movies-card__duration">1ч 42м</span>
              <button className="movies-card__button" />
              <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/4.png')} />
            </article>
            <article className="movies-card">
              <h3 className="movies-card__title">Бег это свобода</h3>
              <span className="movies-card__duration">1ч 42м</span>
              <button className="movies-card__button movies-card__button_active" />
              <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/5.png')} />
            </article>
            <article className="movies-card">
              <h3 className="movies-card__title">Книготорговцы</h3>
              <span className="movies-card__duration">1ч 42м</span>
              <button className="movies-card__button" />
              <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/6.png')} />
            </article>
            <article className="movies-card">
              <h3 className="movies-card__title">Когда я думаю о Германии ночью</h3>
              <span className="movies-card__duration">1ч 42м</span>
              <button className="movies-card__button" />
              <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/7.png')} />
            </article>
          </>
        ) : (
          location.pathname === '/saved-movies' && (
            <>
              <article className="movies-card">
                <h3 className="movies-card__title">33 слова о дизайне</h3>
                <span className="movies-card__duration">1ч 42м</span>
                <button className="movies-card__button movies-card__button_type_delete" />
                <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/1.png')} />
              </article>
              <article className="movies-card">
                <h3 className="movies-card__title">Киноальманах «100 лет дизайна»</h3>
                <span className="movies-card__duration">1ч 42м</span>
                <button className="movies-card__button movies-card__button_type_delete" />
                <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/2.png')} />
              </article>
              <article className="movies-card">
                <h3 className="movies-card__title">В погоне за Бенкси</h3>
                <span className="movies-card__duration">1ч 42м</span>
                <button className="movies-card__button movies-card__button_type_delete" />
                <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/3.png')} />
              </article>
            </>
          )
        )
      ) : location.pathname === '/movies' ? (
        <>
          <article className="movies-card">
            <h3 className="movies-card__title">33 слова о дизайне</h3>
            <span className="movies-card__duration">1ч 42м</span>
            <button className="movies-card__button movies-card__button_active" />
            <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/1.png')} />
          </article>
          <article className="movies-card">
            <h3 className="movies-card__title">Киноальманах «100 лет дизайна»</h3>
            <span className="movies-card__duration">1ч 42м</span>
            <button className="movies-card__button" />
            <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/2.png')} />
          </article>
          <article className="movies-card">
            <h3 className="movies-card__title">В погоне за Бенкси</h3>
            <span className="movies-card__duration">1ч 42м</span>
            <button className="movies-card__button movies-card__button_active" />
            <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/3.png')} />
          </article>
          <article className="movies-card">
            <h3 className="movies-card__title">Баския: Взрыв реальности</h3>
            <span className="movies-card__duration">1ч 42м</span>
            <button className="movies-card__button movies-card__button_active" />
            <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/4.png')} />
          </article>
          <article className="movies-card">
            <h3 className="movies-card__title">Бег это свобода</h3>
            <span className="movies-card__duration">1ч 42м</span>
            <button className="movies-card__button" />
            <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/5.png')} />
          </article>
        </>
      ) : (
        location.pathname === '/saved-movies' && (
          <>
            <article className="movies-card">
              <h3 className="movies-card__title">33 слова о дизайне</h3>
              <span className="movies-card__duration">1ч 42м</span>
              <button className="movies-card__button movies-card__button_type_delete" />
              <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/1.png')} />
            </article>
            <article className="movies-card">
              <h3 className="movies-card__title">Киноальманах «100 лет дизайна»</h3>
              <span className="movies-card__duration">1ч 42м</span>
              <button className="movies-card__button movies-card__button_type_delete" />
              <img className="movies-card__image" alt="33 слова о дизайне" src={require('../../images/2.png')} />
            </article>
          </>
        )
      )}
    </>
  );
}

export default MoviesCard;
