function Profile() {
  return (
    <section className="profile">
      <h3 className="profile__title">Привет, Андрей!</h3>
      <form className="profile__form">
        <label className="profile__label">
          Имя
          <input type="text" className="profile__input" value="Андрей" />
        </label>
        <label className="profile__label">
          E-mail
          <input type="text" className="profile__input" value="pochta@yandex.ru" />
        </label>
        <button type="submit" className="profile__button profile__button_type_submit">
          Редактировать
        </button>
      </form>
      <button className="profile__button">Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;
