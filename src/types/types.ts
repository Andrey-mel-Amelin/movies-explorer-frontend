type FormValues = {
  value: string;
  checkbox: boolean;
};

type FormValuesProfile = {
  name?: string;
  email?: string;
  password?: number;
};

type Movie = {
  _id?: number;
  id?: number;
  movieId?: number;
  nameRU: string;
  nameEN: string;
  description: string;
  country: string;
  director: string;
  duration: number;
  year: number;
  trailerLink: string;
  image: { url: string };
  thumbnail: string;
};

type ErrorsProfile = {
  name?: string;
  email?: string;
  password?: number;
};

export type { FormValues, FormValuesProfile, Movie, ErrorsProfile };
