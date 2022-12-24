import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import * as mainApi from '../../utils/MainApi';
import { api } from '../../utils/MoviesApi';
import { authPath, valueLocal, checkboxLocal, allowedPath, duration } from '../../constants/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

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

function App() {
  const location = useLocation(); // доступ к url
  const history = useNavigate(); // доступ к перенаправлению по url

  const [currentUser, setCurrentUser] = useState({}); // данные пользователя
  const [loggedIn, setLoggedIn] = useState(false); // авторизованный ли пользователь

  const [allMovieslist, setAllMoviesList] = useState([]); // весь список фильмов с movieApi
  const [filterMovies, setFilterMovies] = useState([]); // отфильтрованный список фильмов в movies
  const [savedMovies, setSavedMovies] = useState([]); // список сохраненных фильмов
  const [savedFilterMovies, setSavedFilterMovies] = useState([]); // отфильтрованный список фильмов в saved-movies
  const [showMovies, setShowMovies] = useState([]); // список отображаемых фильмов в movieCardList

  const [isOpenAuthPopup, setIsOpenAuthPopup] = useState(false); // попап с ответом от сервера
  const [resMessage, setResMessage] = useState(''); // сообщение в попапе с ответом от сервера
  const [resStatus, setResStatus] = useState(true); // статус ответа от сервера
  const [isLoading, setIsLoading] = useState(false); // состояние загрузки с сервера

  const [menuActivity, setMenuActivity] = useState(false); // меню
  const [isSavedSearch, setIsSavedSearch] = useState(false); // поиск в saved-movies

  const [stepShowMovies, setStepShowMovies] = useState(7); // количество отображаемых фильмов

  const [formValues, setFormValues] = useState({
    value: '',
    checkbox: '',
  }); // значения инпутов из формы

  // проверяем токен при первом рендере приложения
  // проверка наличия фильмов в локальном хранилище и добавление в стейт
  useEffect(() => {
    if (localStorage.getItem(`movies`)) {
      setAllMoviesList(JSON.parse(localStorage.getItem(`movies`)));
    }

    if (authPath.includes(location.pathname)) return;

    // проверка токена, подстановка данных пользователя
    function getContent() {
      return mainApi
        .checkToken()
        .then((info) => {
          setLoggedIn(true);
          setCurrentUser(info);
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
          if (err.message.status === 401) {
            handleLogout();
          }
        });
    }
    getContent();
  }, []);

  // проверяем значения инпутов в локальном хранилище и подставляем в форму
  useEffect(() => {
    if (!localStorage.getItem('search-value') && !localStorage.getItem('search-checkbox')) return;
    if (location.pathname === '/saved-movies') return;
    setFormValues({
      value: JSON.parse(localStorage.getItem('search-value')),
      checkbox: JSON.parse(localStorage.getItem('search-checkbox')),
    });
  }, [location, filterMovies, savedFilterMovies]);

  // загружаем сохраненные фильмы пользователя с сервера
  useEffect(() => {
    if (authPath.includes(location.pathname)) return;
    if (loggedIn && !savedMovies.length) {
      mainApi
        .getMovies()
        .then((movies) => {
          setSavedMovies(movies.reverse());
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn, location]);

  // изменение количества отображаемых фильмов на странице в зависимости от экрана
  // удаление прослушивателя при переходе за пределы /movies
  useEffect(() => {
    if (location.pathname === '/movies') {
      window.addEventListener('resize', () => {
        setTimeout(() => {
          window.screen.width <= 768 ? setStepShowMovies(5) : setStepShowMovies(7);
        }, 3000);
      });
    } else {
      window.removeEventListener('resize', () => {});
    }
  }, [location.pathname]);

  // изменение отображаемого списка фильмов
  useEffect(() => {
    setShowMovies(
      location.pathname === '/movies'
        ? filterMovies.slice(0, stepShowMovies)
        : isSavedSearch
        ? savedFilterMovies
        : savedMovies
    );
  }, [filterMovies, savedMovies, isSavedSearch, savedFilterMovies, stepShowMovies, location.pathname]);

  // проверка наличия раннее введенных значений в форме поиска и подстановка в функцию для поиска
  useEffect(() => {
    if (allMovieslist.length && valueLocal && checkboxLocal) {
      handleSearchFilms(JSON.parse(valueLocal), JSON.parse(checkboxLocal));
    }
  }, [allMovieslist]);

  // регистрация
  function handleRegister(name, email, password) {
    return mainApi
      .register(name, email, password)
      .then((data) => {
        if (data) {
          // если есть ответ сразу входим
          handleLogin(email, password);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setIsOpenAuthPopup(true);
        setResStatus(false);
        setResMessage(
          err === 'Ошибка: 409' ? 'Пользователь с таким email уже существует.' : 'Произошла ошибка запроса.'
        );
      });
  }

  // авторизация
  function handleLogin(name, email, password) {
    return mainApi
      .login(name, email, password)
      .then((data) => {
        if (data) {
          // устанавливаем данные о пользователе
          setCurrentUser(data.userInfo);
          // переходим к фильмам
          history('/movies');
          setLoggedIn(true);
          setIsOpenAuthPopup(true);
          setResStatus(true);
          setResMessage(data.message);
        }
      })
      .catch((err) => {
        setIsOpenAuthPopup(true);
        setResStatus(false);
        setResMessage(err === 'Ошибка: 401' ? 'Неправильный почта или пароль.' : 'Произошла ошибка запроса.');
      });
  }

  // редактирование профиля
  function handleUpdateUser(name, email) {
    return mainApi
      .updateUser(name, email)
      .then((data) => {
        // устанавливаем новые данные о пользователе
        setCurrentUser(data.user);
        setIsOpenAuthPopup(true);
        setResStatus(true);
        setResMessage(data.message);
      })
      .catch((err) => {
        setIsOpenAuthPopup(true);
        setResStatus(false);
        setResMessage(err.message);
      });
  }

  // выход из аккаунта
  function handleLogout() {
    return mainApi
      .logout()
      .then((res) => {
        // чистим все стейты
        setLoggedIn(false);
        setCurrentUser({});
        setAllMoviesList([]);
        setFilterMovies([]);
        setSavedMovies([]);
        setSavedFilterMovies([]);
        setShowMovies([]);
        setFormValues({
          value: '',
          checkbox: '',
        });
        // очищаем локальное хранилище
        localStorage.clear();
        // переходим на главную
        history('/');
        setIsOpenAuthPopup(true);
        setResStatus(true);
        setResMessage(res.message);
      })
      .catch(() => {
        setIsOpenAuthPopup(true);
        setResStatus(false);
        setResMessage('Произошла ошибка запроса.');
      });
  }

  // фильтрация всех фильмов по значениям из формы
  // если списка всех фильмов еще нет, получение их из movieApi
  function handleSearchFilms(value, checkbox) {
    // устанавливаем значения в форму до получения даныых из локального хранилища
    setFormValues({
      value: value,
      checkbox: checkbox,
    });

    function filter(movieList) {
      // изменяем количество добавляемых карточек с фильмами в зависимости от ширины экрана
      window.screen.width <= 768 ? setStepShowMovies(5) : setStepShowMovies(7);
      setFilterMovies(
        movieList.filter((i) => {
          if (checkbox) {
            // фильтр для короткометражек
            return i.nameRU.toLowerCase().includes(value.toLowerCase()) && i.duration <= duration;
          } else {
            // фильтра для фильмов
            return i.nameRU.toLowerCase().includes(value.toLowerCase());
          }
        })
      );
    }

    if (!allMovieslist.length) {
      setIsLoading(true);
      api
        .getMovies()
        .then((movies) => {
          // сохраняем все фильмы в стейте и локальном хранилище
          setAllMoviesList(movies);
          localStorage.setItem('movies', JSON.stringify(movies));
          // фильтруем все фильмы
          filter(movies);

          setIsLoading(false);
          setResStatus(true);
        })
        .catch(() => {
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
    // устанавливаем значения в форму до получения даныых из локального хранилища
    setFormValues({
      value: value,
      checkbox: checkbox,
    });

    // когда становится истинно показываем отфильтрованные фильмы в сохраненных
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

  // добавить/убрать фильм(лайк)
  function handleMovieLike(movie) {
    // ищем фильм в сохраненных
    const savedMovie = savedMovies.find((i) => i.movieId === movie.id || movie.movieId);

    return mainApi
      .changeLikeMovieStatus(savedMovie && location.pathname === '/movies' ? savedMovie : movie, savedMovie)
      .then((reqMovie) => {
        if (!savedMovie) {
          // если не сохранен, добавить в сохраненные
          setSavedMovies([reqMovie, ...savedMovies]);
        } else if (location.pathname === '/movies') {
          // если сохранён и url совпадает то убрать лайк
          setSavedMovies((state) => state.filter((c) => c.movieId !== movie.id));
        } else {
          // если сохранен и url другой(/saved-movies) то удаляем фильм из сохраненных
          setSavedMovies((state) => state.filter((c) => c.movieId !== movie.movieId));
        }
      })
      .catch(() => {
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
    const step = window.screen.width <= 768 ? 5 : 7;
    setStepShowMovies(showMovies.length + step);
  }

  // ProtectedRoute
  function ProtectedRoute({ children, redirectTo }) {
    return authPath.includes(location.pathname) && !loggedIn ? ( // не вошёл -> показывать регистрацию/вход
      children
    ) : !allowedPath.includes(location.pathname) && loggedIn ? ( // вошёл -> не показывать notfound
      <Navigate to={redirectTo} />
    ) : !authPath.includes(location.pathname) && loggedIn ? ( // вошёл -> не показывать регистрацию/вход
      children
    ) : !allowedPath.includes(location.pathname) && !loggedIn ? ( // не вошёл -> показывать notfound
      children
    ) : (
      <Navigate to={redirectTo} />
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header loggedIn={loggedIn} menuActivity={menuActivity} onMenuToggle={handleMenuToggle} location={location} />
        <main className="content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute redirectTo="/">
                  <Movies
                    allMovieslist={allMovieslist}
                    showMovies={showMovies}
                    filterMovies={filterMovies}
                    savedMovies={savedMovies}
                    resStatus={resStatus}
                    isLoading={isLoading}
                    location={location}
                    formValues={formValues}
                    onSearchFilms={handleSearchFilms}
                    onMovieLike={handleMovieLike}
                    onButtonMore={handleButtonMore}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute redirectTo="/">
                  <SavedMovies
                    showMovies={showMovies}
                    savedMovies={savedMovies}
                    savedFilterMovies={savedFilterMovies}
                    resStatus={resStatus}
                    isSavedSearch={isSavedSearch}
                    location={location}
                    formValues={formValues}
                    onSearchSavedFilms={handleSearchSavedFilms}
                    onMovieLike={handleMovieLike}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute redirectTo="/">
                  <Profile onUpdateUser={handleUpdateUser} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute redirectTo="/">
                  <Register resStatusOk={resStatus} onRegister={handleRegister} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <ProtectedRoute redirectTo="/">
                  <Login resStatusOk={resStatus} onLogin={handleLogin} />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute redirectTo="/">
                  <NotFound getBack={() => history(-1)} />
                </ProtectedRoute>
              }
            />
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
