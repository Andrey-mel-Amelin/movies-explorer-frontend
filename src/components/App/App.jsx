import { Route, Routes, useLocation } from 'react-router-dom';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import { useState } from 'react';

function App() {
  const location = useLocation();
  const allowedPath = ['/', '/movies', '/saved-movies', '/signup', '/signin', '/profile'];

  const [menuActivity, setMenuActivity] = useState(false);

  function handleMenuToggle() {
    setMenuActivity((active) => !active);
  }

  return (
    <>
      {allowedPath.includes(location.pathname) ? (
        <div className="app">
          <Header menuActivity={menuActivity} onMenuToggle={handleMenuToggle} location={location} />
          <main className="content">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/movies" element={<Movies location={location} />} />
              <Route path="/saved-movies" element={<SavedMovies location={location} />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer location={location} />
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default App;
