import axios from 'axios';

const API_KEY = 'd06620573b2b0892138a24b415bd3fc5';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getMovies = async (page = 1, options = {}) => {
  const response = await tmdbApi.get('/movie/popular', {
    params: {
      page,
      ...options,
    },
  });
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const getGenres = async () => {
  const response = await tmdbApi.get('/genre/movie/list');
  return response.data.genres;
};

export const searchMovies = async (query, page = 1) => {
  const response = await tmdbApi.get('/search/movie', {
    params: { query, page },
  });
  return response.data;
};

export const getTrendingMovies = async () => {
  const response = await tmdbApi.get('/trending/movie/week');
  return response.data;
};

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const BACKDROP_SIZES = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
  original: 'original',
};

export const POSTER_SIZES = {
  tiny: 'w92',
  xSmall: 'w154',
  small: 'w185',
  medium: 'w342',
  large: 'w500',
  xLarge: 'w780',
  original: 'original',
};
