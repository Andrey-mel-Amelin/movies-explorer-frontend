import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import * as mainApi from '../../utils/MainApi';
import { api } from '../../utils/MoviesApi';
import {
  authPath,
  valueLocal,
  checkboxLocal,
  duration,
  moviesLocal,
  valueShowMovieForDesktop,
  valueShowMovieForMobile,
  moviesPath,
} from '../../constants/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/validationForms';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import InfoPopup from '../InfoPopup/InfoPopup';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function App() {
  const location = useLocation(); // доступ к данным url
  const navigate = useNavigate(); // доступ к перемещениям по url

  const [currentUser, setCurrentUser] = useState({ _id: '', email: '', name: '' }); // данные пользователя
  const [loggedIn, setLoggedIn] = useState(true); // авторизованный ли пользователь

  const [allMovieslist, setAllMoviesList] = useState([]); // весь список фильмов с movieApi
  const [filterMovies, setFilterMovies] = useState([]); // отфильтрованный список фильмов в movies
  const [savedMovies, setSavedMovies] = useState([]); // список сохраненных фильмов
  const [savedFilterMovies, setSavedFilterMovies] = useState([]); // отфильтрованный список фильмов в saved-movies
  const [showMovies, setShowMovies] = useState([]); // список отображаемых фильмов в movieCardList

  const [isOpenAuthPopup, setIsOpenAuthPopup] = useState(false); // попап с ответом от сервера
  const [resMessage, setResMessage] = useState(''); // сообщение в попапе с ответом от сервера
  const [resStatus, setResStatus] = useState(true); // статус ответа от сервера
  const [isLoadingMovies, setIsLoadingMovies] = useState(false); // состояние загрузки с сервера фильмов
  const [isBlockingButton, setIsBlockingButton] = useState(false); // блокировка кнопок
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки с сервера

  const [menuActivity, setMenuActivity] = useState(false); // меню
  const [isSavedSearch, setIsSavedSearch] = useState(false); // поиск в saved-movies

  const [stepShowMovies, setStepShowMovies] = useState(valueShowMovieForDesktop); // количество отображаемых фильмов

  const [formValues, setFormValues] = useState({
    value: '',
    checkbox: '',
  }); // значения инпутов из формы
  const { resetForm } = useFormWithValidation();

  // проверяем токен при первом рендере приложения
  // проверка наличия фильмов в локальном хранилище и добавление в стейт
  useEffect(() => {
    if (moviesLocal) {
      setAllMoviesList(JSON.parse(moviesLocal));
    }

    // проверяем наличие значение для поиска в локальном хранилище и подставляем в форму
    if (valueLocal || checkboxLocal) {
      setFormValues({
        value: JSON.parse(valueLocal),
        checkbox: JSON.parse(checkboxLocal),
      });
    }

    // проверка токена, подстановка данных пользователя
    function getContent() {
      setIsLoading(true);
      return mainApi
        .checkToken()
        .then((data) => {
          setLoggedIn(true);
          setIsLoading(false);
          // если ответ удачен используем данные о пользователе в контексте
          setCurrentUser(data);
        })
        .catch((err) => {
          setLoggedIn(false);
          setIsLoading(false);
          setCurrentUser({ _id: '', email: '', name: '' });
          // при невалидном jwt происходит автоматический логаут
          if (err.message.status === 401) {
            handleLogout();
          }
        });
    }
    getContent();
  }, []);

  // если стейт со всеми фильмами не пуст, есть значения в локальном хранилище для поиска и url movies то
  // подставляем данные из локального хранилища в поиск и производим его
  useEffect(() => {
    if (formValues.value && allMovieslist.length && location.pathname === '/movies') {
      handleSearchFilms(formValues.value, formValues.checkbox);
    }
  }, [location, allMovieslist]);

  // загружаем сохраненные фильмы пользователя с сервера
  useEffect(() => {
    // если url совпадает с регистрацией/входом ничего не выполнять
    if (authPath.includes(location.pathname)) return;
    // елси пользователь залогинен и массив сохраненных фильмов пуст выполняет запрос к нашему API
    if (loggedIn && !savedMovies.length && moviesPath.includes(location.pathname)) {
      mainApi
        .getMovies()
        .then((movies) => {
          setSavedMovies(movies.reverse());
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, location, savedMovies.length]);

  // изменение количества отображаемых фильмов на странице в зависимости от экрана
  // удаление прослушивателя при переходе за пределы /movies
  useEffect(() => {
    if (location.pathname === '/movies') {
      window.addEventListener('resize', () => {
        setTimeout(() => {
          window.screen.width <= 768
            ? setStepShowMovies(valueShowMovieForMobile)
            : setStepShowMovies(valueShowMovieForDesktop);
        }, 3000);
      });
    } else {
      window.removeEventListener('resize', () => {});
    }
  }, [location.pathname]);

  // изменение отображаемого списка фильмов в зависимости от локации и поисков
  useEffect(() => {
    setShowMovies(
      location.pathname === '/movies'
        ? filterMovies.slice(0, stepShowMovies)
        : isSavedSearch
        ? savedFilterMovies
        : savedMovies
    );
  }, [filterMovies, savedMovies, isSavedSearch, savedFilterMovies, stepShowMovies, location.pathname]);

  // регистрация
  function handleRegister(name, email, password) {
    setIsBlockingButton(true); // отключаем кнопку отправки форму
    return mainApi
      .register(name, email, password)
      .then((data) => {
        setIsBlockingButton(false); // включаем кнопку отправки форму
        if (data) {
          // очищаем поля формы
          resetForm();
          // если есть ответ сразу входим
          handleLogin(email, password);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setIsBlockingButton(false); // включаем кнопку отправки форму
        setLoggedIn(false);
        setIsOpenAuthPopup(true);
        setResStatus(false);
        setResMessage(
          err.message.status === 409 ? 'Пользователь с таким email уже существует.' : 'Произошла ошибка запроса.'
        );
      });
  }

  // авторизация
  function handleLogin(email, password) {
    setIsBlockingButton(true); // отключаем кнопку отправки форму
    setLoggedIn(true);
    return mainApi
      .login(email, password)
      .then((data) => {
        if (data) {
          setIsBlockingButton(false); // включаем кнопку отправки форму
          resetForm(); // очищаем поля формы
          setCurrentUser(data.userInfo); // устанавливаем данные о пользователе
          setLoggedIn(true);
          setIsOpenAuthPopup(true);
          setResStatus(true);
          setResMessage(data.message);
          navigate('/movies'); // переходим к movies
        }
      })
      .catch((err) => {
        setIsBlockingButton(false); // включаем кнопку отправки форму
        setCurrentUser({ _id: '', email: '', name: '' }); // зануляем данные о пользователе
        setLoggedIn(false);
        setIsOpenAuthPopup(true);
        setResStatus(false);
        setResMessage(err.message.status === 401 ? 'Неправильные почта или пароль.' : 'Произошла ошибка запроса.');
      });
  }

  // редактирование профиля
  function handleUpdateUser(name, email) {
    setIsBlockingButton(true); // отключаем кнопку отправки форму
    return mainApi
      .updateUser(name, email)
      .then((data) => {
        setIsBlockingButton(false); // включаем кнопку отправки форму
        setCurrentUser(data.user); // устанавливаем новые данные о пользователе
        setIsOpenAuthPopup(true);
        setResStatus(true);
        setResMessage(data.message);
      })
      .catch((err) => {
        setIsBlockingButton(false); // включаем кнопку отправки форму
        setIsOpenAuthPopup(true);
        setResStatus(false);
        setResMessage(err.message);
      });
  }

  // выход из аккаунта
  function handleLogout() {
    setIsBlockingButton(true); // отключаем кнопку отправки форму
    return mainApi
      .logout()
      .then(() => {
        setIsBlockingButton(false); // включаем кнопку отправки форму
        // чистим все стейты
        setLoggedIn(false);
        setCurrentUser({ _id: '', email: '', name: '' });
        setAllMoviesList([]);
        setFilterMovies([]);
        setSavedMovies([]);
        setSavedFilterMovies([]);
        setShowMovies([]);
        setFormValues({
          value: '',
          checkbox: '',
        });
        localStorage.clear(); // очищаем локальное хранилище
      })
      .catch(() => {
        setIsBlockingButton(false); // включаем кнопку отправки форму
        setLoggedIn(false);
        setIsOpenAuthPopup(true);
        setResStatus(false);
        setResMessage('Произошла ошибка запроса.');
      });
  }

  // функция установки значений из формы в локальное хранилище
  function setItemLocalStorage(name, item) {
    if (item === null || item === undefined) return;
    localStorage.setItem(`search-${name}`, JSON.stringify(item));
  }

  // фильтрация всех фильмов по значениям из формы
  // если списка всех фильмов еще нет, получение их из movieApi
  function handleSearchFilms(value, checkbox) {
    // указываем что это не поиск на странице сохраненных фильмов
    setIsSavedSearch(false);

    setItemLocalStorage('value', value);
    setItemLocalStorage('checkbox', checkbox);

    if (!value) return;

    // устанавливаем значения в форму до получения даныых из локального хранилища
    setFormValues({
      value: value,
      checkbox: checkbox,
    });

    function filter(movieList) {
      // изменяем количество добавляемых карточек с фильмами в зависимости от ширины экрана
      window.screen.width <= 768
        ? setStepShowMovies(valueShowMovieForMobile)
        : setStepShowMovies(valueShowMovieForDesktop);

      setFilterMovies(
        movieList.filter((i) => {
          if (checkbox) {
            // фильтр для короткометражек
            return i.nameRU.toLowerCase().includes(value.toLowerCase()) && i.duration <= duration;
          } else {
            // фильтр для фильмов
            return i.nameRU.toLowerCase().includes(value.toLowerCase());
          }
        })
      );
    }

    if (!allMovieslist.length) {
      setIsBlockingButton(true); // отключаем кнопку отправки форму

      setIsLoadingMovies(true);
      api
        .getMovies()
        .then((movies) => {
          setIsBlockingButton(false); // включаем кнопку отправки форму
          setAllMoviesList(movies); // сохраняем все фильмы в стейте
          localStorage.setItem('movies', JSON.stringify(movies)); // сохраняем все фильмы в локальном хранилище
          filter(movies); // фильтруем все фильмы
          setIsLoadingMovies(false);
          setResStatus(true);
        })
        .catch(() => {
          setIsBlockingButton(false); // включаем кнопку отправки форму
          setResStatus(false);
          setIsOpenAuthPopup(true);
          setResMessage('Произошла ошибка запроса.');
        });
    } else {
      // фильтруем все фильмы
      filter(allMovieslist);
    }
  }

  // фильтрация сохраненных фильмов по значениям из формы
  function handleSearchSavedFilms(value, checkbox) {
    // указываем что это поиск на странице с сохраненными фильмами
    setIsSavedSearch(true);

    // массив отфильтрованных фильмов
    const savedSearch = savedMovies.filter((i) => i.nameRU.toLowerCase().includes(value.toLowerCase()));

    // массив отфильтрованных короткометражных фильмов
    const savedShortSearch = savedMovies.filter(
      (i) => i.nameRU.toLowerCase().includes(value.toLowerCase()) && i.duration <= duration
    );

    if (savedSearch || savedShortSearch) {
      // если нашло что то в фильмах
      if (checkbox && savedShortSearch) {
        // если выбраны короткометражные фильмы и массив есть
        setSavedFilterMovies([...savedShortSearch]);
      } else if (savedSearch) {
        // если есть массив с фильтрованными фильмами
        setSavedFilterMovies([...savedSearch]);
      }
    }
  }

  // функция живого чек-бокса
  function checkboxFilter(value, checkbox) {
    setItemLocalStorage('checkbox', checkbox);

    if (location.pathname === '/movies') {
      handleSearchFilms(value, checkbox);
    } else {
      handleSearchSavedFilms(value, checkbox);
    }
  }

  // добавить/убрать фильм(лайк)
  function handleMovieLike(movie) {
    // ищем фильм в массиве с сохраненными фильмами
    const savedMovie = savedMovies.find((i) => i.movieId === movie.id || movie.movieId);

    setIsBlockingButton(true); // отключаем кнопку лайка/удаления

    return mainApi
      .changeLikeMovieStatus(savedMovie && location.pathname === '/movies' ? savedMovie : movie, savedMovie)
      .then((reqMovie) => {
        setIsBlockingButton(false); // включаем кнопку лайка/удаления

        if (!savedMovie) {
          // если не сохранен, добавить в сохраненные
          setSavedMovies([reqMovie, ...savedMovies]);
        } else if (location.pathname === '/movies') {
          // если сохранён и находимся в movies то убрать лайк
          setSavedMovies((state) => state.filter((c) => c.movieId !== movie.id));
        } else {
          // если сохранен и находимся в saved-movies то удаляем фильм из сохраненных
          setSavedMovies((state) => state.filter((c) => c.movieId !== movie.movieId));
          setSavedFilterMovies((state) => state.filter((c) => c.movieId !== movie.movieId));
        }
      })
      .catch(() => {
        setIsBlockingButton(false); // включаем кнопку лайка/удаления
        setIsOpenAuthPopup(true);
        setResStatus(false);
        setResMessage('Произошла ошибка запроса.');
      });
  }

  // переключение кнопки меню
  function handleMenuToggle() {
    setMenuActivity((active) => !active);
  }

  // обработчик кнопки "Ещё"
  function handleButtonMore() {
    // в зависимости от ширины экрана прибавлять разное количество карточек с фильмами
    const step = window.screen.width <= 768 ? valueShowMovieForMobile : valueShowMovieForDesktop;
    // устанавливаем значение в стейт исходя из длинны массива показываемых фильмов плюс шаг
    setStepShowMovies(showMovies.length + step);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`app ${menuActivity ? 'app_none-scroll' : ''}`}>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <Header menuActivity={menuActivity} onMenuToggle={handleMenuToggle} location={location} />
            <main className="content">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route
                  path="/movies"
                  element={
                    loggedIn ? (
                      <Movies
                        isBlockingButton={isBlockingButton}
                        allMovieslist={allMovieslist}
                        showMovies={showMovies}
                        filterMovies={filterMovies}
                        savedMovies={savedMovies}
                        resStatus={resStatus}
                        isLoadingMovies={isLoadingMovies}
                        location={location}
                        formValues={formValues}
                        onSearchFilms={handleSearchFilms}
                        onMovieLike={handleMovieLike}
                        onButtonMore={handleButtonMore}
                        checkboxFilter={checkboxFilter}
                      />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/saved-movies"
                  element={
                    loggedIn ? (
                      <SavedMovies
                        isBlockingButton={isBlockingButton}
                        showMovies={showMovies}
                        savedMovies={savedMovies}
                        savedFilterMovies={savedFilterMovies}
                        resStatus={resStatus}
                        isSavedSearch={isSavedSearch}
                        location={location}
                        formValues={formValues}
                        onSearchSavedFilms={handleSearchSavedFilms}
                        onMovieLike={handleMovieLike}
                        checkboxFilter={checkboxFilter}
                      />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/profile"
                  element={
                    loggedIn ? (
                      <Profile
                        isBlockingButton={isBlockingButton}
                        onUpdateUser={handleUpdateUser}
                        onLogout={handleLogout}
                      />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/signup"
                  element={
                    !currentUser._id ? (
                      <Register
                        isBlockingButton={isBlockingButton}
                        resStatusOk={resStatus}
                        onRegister={handleRegister}
                      />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route
                  path="/signin"
                  element={
                    !currentUser._id ? (
                      <Login isBlockingButton={isBlockingButton} resStatusOk={resStatus} onLogin={handleLogin} />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route path="*" element={<NotFound goBack={() => navigate(-1)} />} />
              </Routes>
            </main>
            <InfoPopup
              isOpen={isOpenAuthPopup}
              onClose={() => {
                setIsOpenAuthPopup(false);
              }}
              resStatus={resStatus}
              resMessage={resMessage}
            />
            <Footer location={location} />
          </>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
