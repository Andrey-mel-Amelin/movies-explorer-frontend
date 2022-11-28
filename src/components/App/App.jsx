import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {
  const location = useLocation();
  const locationArr = location.pathname?.split('/') ?? [];

  return (
    <div className="app">
      <Header />
      <main className="content">
        <Routes location={location} key={locationArr[1]}>
          <Route path="/" element={<Main />}/>
          <Route />
          <Route />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
