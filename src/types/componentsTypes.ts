import { Location } from 'react-router-dom';
import { FormValues, Movie } from './types';

type HeaderComponent = {
  menuActivity: boolean;
  location: Location;
  onMenuToggle: () => void;
};

type NavigationComponent = {
  menuActivity: boolean;
  location: Location;
  onClick: any
};

type MoviesComponent = {
  isBlockingButton: boolean;
  allMovieslist: Movie[];
  showMovies: Movie[];
  filterMovies: Movie[];
  savedMovies: Movie[];
  resStatus: boolean;
  isLoadingMovies: boolean;
  location: Location;
  formValues: FormValues;
  onSearchFilms: (value: string, checkbox: boolean) => void;
  checkboxFilter: (value: string, checkbox: boolean) => void;
  onMovieLike: (movie: Movie) => Promise<void>;
  onButtonMore: () => void;
};

type SavedMoviesComponent = {
  isBlockingButton: boolean;
  showMovies: Movie[];
  savedMovies: Movie[];
  savedFilterMovies: Movie[];
  resStatus: boolean;
  isSavedSearch: boolean;
  location: Location;
  onSearchSavedFilms: (value: string, checkbox: boolean) => void;
  checkboxFilter: (value: string, checkbox: boolean) => void;
  onMovieLike: (movie: Movie) => Promise<void>;
};

type SearchFormComponent = {
  isBlockingButton: boolean;
  formValues?: FormValues;
  location: Location;
  checkboxFilter: (value: string, checkbox: boolean) => void;
  onSearchFilms?: (value: string, checkbox: boolean) => void;
  onSearchSavedFilms?: (value: string, checkbox: boolean) => void;
};

type MoviesCardListComponent = {
  isBlockingButton: boolean;
  showMovies: Movie[];
  savedMovies: Movie[];
  filterMovies: Movie[];
  resStatus: boolean;
  isLoadingMovies?: boolean;
  location: Location;
  onMovieLike: (movie: Movie) => Promise<void>;
  onButtonMore?: () => void;
};

type ProfileComponent = {
  isBlockingButton: boolean;
  onUpdateUser: (name: string, email: string) => Promise<void>;
  onLogout: () => void;
};

type RegisterComponent = {
  isBlockingButton: boolean;
  resStatus: boolean;
  onRegister: (name: string, email: string, password: number) => Promise<void>;
};

type LoginComponent = {
  isBlockingButton: boolean;
  resStatus: boolean;
  onLogin: (email: string, password: number) => Promise<void>;
};

type NotFoundComponent = {
  goBack: () => void;
};

type InfoPopupComponent = {
  isOpen: boolean;
  resStatus: boolean;
  resMessage: string;
  onClose: () => void;
};

type FooterComponent = {
  location: Location;
};

type MoviesCardComponent = {
  savedMovies: Movie[];
  isBlockingButton: boolean;
  movie: Movie;
  location: Location;
  onMovieLike: (movie: Movie) => Promise<void>;
};

export type {
  HeaderComponent,
  NavigationComponent,
  MoviesComponent,
  SearchFormComponent,
  MoviesCardListComponent,
  MoviesCardComponent,
  SavedMoviesComponent,
  ProfileComponent,
  RegisterComponent,
  LoginComponent,
  NotFoundComponent,
  InfoPopupComponent,
  FooterComponent,
};
