import { MainApiReq, Movie } from "../types/types";

export const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001/';

function request({ url, method = 'POST', data }: MainApiReq) {
  return fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    credentials: 'include',
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject({ error: `Ошибка: ${res.status}`, message: res });
    }
    return res.json();
  });
}

export const register = (name: string, email: string, password: number) => {
  return request({
    url: 'signup',
    data: { name, email, password },
  });
};

export const login = (email: string, password: number) => {
  return request({
    url: 'signin',
    data: { email, password },
  });
};

export const updateUser = (name: string, email: string) => {
  return request({
    url: 'users/me',
    method: 'PATCH',
    data: { name, email },
  });
};

export const logout = () => {
  return request({
    url: 'signout',
    method: 'DELETE',
  });
};

export const checkToken = () => {
  return request({
    url: 'users/me',
    method: 'GET',
  });
};

export const getMovies = () => {
  return request({
    url: 'movies',
    method: 'GET',
  });
};

const unsaveMovies = (id: number) => {
  return request({
    url: `movies/${id}`,
    method: 'DELETE',
  });
};

const saveMovie = (reqBody: Movie) => {
  return request({
    url: 'movies',
    data: {
      country: reqBody.country,
      director: reqBody.director,
      duration: reqBody.duration,
      year: reqBody.year,
      description: reqBody.description,
      image: typeof reqBody.image !== 'string' ? `https://api.nomoreparties.co/${reqBody.image.url}` : reqBody.image,
      thumbnail:
        typeof reqBody.image !== 'string'
          ? `https://api.nomoreparties.co/${reqBody.image.formats!.thumbnail.url}`
          : reqBody.thumbnail,
      trailerLink: reqBody.trailerLink,
      movieId: reqBody.id,
      nameRU: reqBody.nameRU,
      nameEN: reqBody.nameEN,
    },
  });
};

export const changeLikeMovieStatus = (reqBody: Movie, isLiked: Movie | undefined) => {
  return !isLiked ? saveMovie(reqBody) : unsaveMovies(reqBody._id!);
};
