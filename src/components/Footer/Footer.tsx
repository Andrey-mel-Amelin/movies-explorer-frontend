import { notFooterPaths } from "../../constants/constants";
import { FooterComponent } from "../../types/componentsTypes";

function Footer({ location }: FooterComponent) {
  return (
    <>
      {notFooterPaths.includes(location.pathname) && (
        <footer className="footer">
          <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__container">
            <span className="footer__year">Andrey Amelin © 2022</span>
            <ul className="footer__list">
              <li>
                <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">
                  Яндекс Практикум
                </a>
              </li>
              <li>
                <a className="footer__link" href="https://github.com/" target="_blank" rel="noreferrer">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
