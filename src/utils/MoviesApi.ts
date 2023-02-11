class Api {
  constructor(public baseUrl: string, public headers: {}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponseData(res: Response) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _getFetch() {
    return fetch(this.baseUrl, {
      headers: this.headers,
    }).then((res) => this._getResponseData(res));
  }

  getMovies() {
    return this._getFetch();
  }
}

export const api = new Api('https://api.nomoreparties.co/beatfilm-movies', {
  'Content-Type': 'application/json',
});
