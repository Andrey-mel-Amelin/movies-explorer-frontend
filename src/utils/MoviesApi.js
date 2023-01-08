class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _getFetch() {
    return fetch(this._baseUrl, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getMovies() {
    return this._getFetch();
  }
}

export const api = new Api('https://api.nomoreparties.co/beatfilm-movies', {
  'Content-Type': 'application/json',
});