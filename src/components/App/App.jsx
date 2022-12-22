import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import * as mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  const location = useLocation();
  const history = useNavigate();
  const allowedPath = ['/', '/movies', '/saved-movies', '/signup', '/signin', '/profile'];

  const [menuActivity, setMenuActivity] = useState(false);
  const [resStatusOk, setResStatusOk] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  // проверяем токен
  useEffect(() => {
    getContent();
  }, []);

  // загружаем сохраненные фильмы с сервера
  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi.getMovies().then((movies) => {
        setSavedMovies(movies)
      });
    }
  }, [loggedIn, currentUser]);

  useEffect(() => {
    if (('/saved-movies' || '/movies') !== location.pathname) {
      window.removeEventListener('resize', () => {});
    }
  }, [location]);

  // регистрация
  function handleRegister(name, email, password) {
    return mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password);
          setLoggedIn(true);
          setResStatusOk(true);
        }
      })
      .catch(() => {
        setResStatusOk(false);
      });
  }

  // авторизация
  function handleLogin(name, email, password) {
    return mainApi
      .login(name, email, password)
      .then((res) => {
        if (res) {
          history('/movies');
          setResStatusOk(true);
          setLoggedIn(true);
        }
      })
      .catch(() => {
        setResStatusOk(false);
      });
  }

  // редактирование профиля
  function handleUpdateUser(name, email) {
    return mainApi
      .updateUser(name, email)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // выход из аккаунта
  function handleLogout() {
    return mainApi
      .logout()
      .then(() => {
        setSavedMovies([]);
        localStorage.clear();
        setLoggedIn(false);
        history('/');
      })
      .catch((err) => console.log(err));
  }

  // проверка токена
  function getContent() {
    return mainApi
      .checkToken()
      .then((info) => {
        setLoggedIn(true);
        setCurrentUser(info);
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
  }

  // переключение кнопки меню
  function handleMenuToggle() {
    setMenuActivity((active) => !active);
  }

  // добавить/убрать фильм в сохраненные на сервер
  function handleMovieLike(movie) {
    const savedMovie = savedMovies.find((i) => i.movieId === movie.id || movie.movieId);

    return mainApi
      .changeLikeMovieStatus(savedMovie && location.pathname === '/movies' ? savedMovie : movie, savedMovie)
      .then((reqMovie) => {
        if (!savedMovie) {
          setSavedMovies([reqMovie, ...savedMovies]);
        } else if (location.pathname === '/movies') {
          setSavedMovies((state) => state.filter((c) => c.movieId !== movie.id));
        } else {
          setSavedMovies((state) => state.filter((c) => c.movieId !== movie.movieId));
        }
      });
  }

  // ProtectedRoute
  function ProtectedRoute({ children, redirectTo }) {
    return loggedIn ? children : <Navigate to={redirectTo} />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {allowedPath.includes(location.pathname) ? (
        <div className="app">
          <Header loggedIn={loggedIn} menuActivity={menuActivity} onMenuToggle={handleMenuToggle} location={location} />
          <main className="content">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute redirectTo="/">
                    <Movies onMovieLike={handleMovieLike} savedMovies={savedMovies} location={location} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute redirectTo="/">
                    <SavedMovies onMovieLike={handleMovieLike} savedMovies={savedMovies} location={location} />
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
              <Route path="/signup" element={<Register resStatusOk={resStatusOk} onRegister={handleRegister} />} />
              <Route path="/signin" element={<Login resStatusOk={resStatusOk} onLogin={handleLogin} />} />
            </Routes>
          </main>
          <Footer location={location} />
        </div>
      ) : (
        <NotFound />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
