import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import * as mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/MoviesApi';
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

  const [isUploadError, setIsUploadError] = useState(false);
  const [menuActivity, setMenuActivity] = useState(false);
  const [resStatusOk, setResStatusOk] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedFilterMovies, setSavedFilterMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isSearchError, setSearchError] = useState(false);
  const [isSavedSearch, setIsSavedSearch] = useState(false);

  // проверяем токен / получаем сохраненые фильмы
  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    if (('/saved-movies' || '/movies') !== location.pathname) {
      window.removeEventListener('resize', () => {});
    }
  }, [location]);

  // проверяем что фильмы пришли в стейт, и сохраняем в локальное хранилище
  useEffect(() => {
    if (movies.length === 0) return;
    localStorage.setItem('search-movies', JSON.stringify(movies));
  }, [movies]);

  // при авторизации получаем список фильмо и сверяем токен
  useEffect(() => {
    if (!loggedIn) return;
    mainApi
      .getMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      });
    mainApi
      .checkToken()
      .then((info) => {
        setCurrentUser(info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

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
          history('/');
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
        setLoggedIn(false);
        history('/');
      })
      .catch((err) => console.log(err));
  }

  // проверка токена
  function getContent() {
    return mainApi
      .checkToken()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          if (!localStorage.getItem('search-movies')) return;
          setMovies(JSON.parse(localStorage.getItem('search-movies')));
        }
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

  // поиск фильмов по названию и продолжительности
  function handleGetMovie(value, isShort) {
    if (location.pathname === '/movies') {
      setIsSavedSearch(false);
      setIsLoading(true);
      api
        .getMovies()
        .then((movie) => {
          setIsLoading(false);
          setMovies(
            movie.filter((i) => {
              if (isShort) {
                return i.nameRU.toLowerCase().includes(value.toLowerCase()) && i.duration <= 40;
              } else {
                return i.nameRU.toLowerCase().includes(value.toLowerCase());
              }
            })
          );
        })
        .catch(() => {
          setIsUploadError(true);
        });
    } else {
      setIsSavedSearch(true);

      const savedSearch = savedMovies.find((i) => i.nameRU.toLowerCase().includes(value.toLowerCase()));
      const savedShortSearch = savedMovies.find(
        (i) => i.nameRU.toLowerCase().includes(value.toLowerCase()) && i.duration <= 40
      );

      if (!savedSearch) {
        setSearchError(true);
        setSavedFilterMovies([]);
      } else if (isShort && savedShortSearch) {
        setSearchError(false);
        setSavedFilterMovies([savedShortSearch]);
      } else {
        setSearchError(false);
        setSavedFilterMovies([]);
      }
    }
  }

  // добавить/убрать фильм в сохраненные на сервер
  function handleMovieLike(movie) {
    const savedMovie = savedMovies.find((i) => i.movieId === movie.id || movie.movieId);

    return mainApi
      .changeLikeMovieStatus(savedMovie && location.pathname === '/movies' ? savedMovie : movie, savedMovie)
      .then((newMovie) => {
        if (!savedMovie) {
          setSavedMovies([...savedMovies, newMovie]);
        } else if (location.pathname === '/movies') {
          setSavedMovies((state) => state.filter((c) => c.movieId !== movie.id));
        } else {
          setSavedMovies((state) => state.filter((c) => c.movieId !== movie.movieId));
        }
      })
      .catch((err) => {
        console.log(err);
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
                    <Movies
                      onMovieLike={handleMovieLike}
                      isUploadError={isUploadError}
                      isLoading={isLoading}
                      movies={movies}
                      savedMovies={savedMovies}
                      onGetMovie={handleGetMovie}
                      location={location}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute redirectTo="/">
                    <SavedMovies
                      isSavedSearch={isSavedSearch}
                      savedFilterMovies={savedFilterMovies}
                      movies={movies}
                      isSearchError={isSearchError}
                      onGetMovie={handleGetMovie}
                      onMovieLike={handleMovieLike}
                      savedMovies={savedMovies}
                      location={location}
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
