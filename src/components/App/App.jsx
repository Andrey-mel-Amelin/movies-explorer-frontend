import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';

function App() {
  const location = useLocation();
  const locationArr = location.pathname?.split('/') ?? [];

  return (
    <div className="app">
      <Header location={location} />
      <main className="content">
        <Routes location={location} key={locationArr[1]}>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" />
          <Route path="/profile" />
          <Route path="/signin" />
          <Route path="/signup" />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
