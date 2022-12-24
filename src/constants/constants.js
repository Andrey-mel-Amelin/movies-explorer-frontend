export const allowedPath = ['/', '/movies', '/saved-movies', '/signup', '/signin', '/profile']; // разрешённые url
export const notFooterPaths = ['/', '/movies', '/saved-movies']; // url где не нужно использовать футер
export const authPath = ['/signin', '/signup']; // url для регистрации/логина
export const valueLocal = localStorage.getItem('search-value'); // получить строку поиска из локального хранилища
export const checkboxLocal = localStorage.getItem('search-checkbox'); // получить состояние чебокса из локального хранилища 
export const duration = 40; // верхний порог длительности короткометражек