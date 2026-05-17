export const API_BASE = 'https://api.themoviedb.org/3';
export const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  poster: 'w500',
  profile: 'w185',
  backdrop: 'w1280'
};

export const POSTER_SRCSET = ['w185', 'w342', 'w500'];
export const PROFILE_SRCSET = ['w92', 'w185'];

export const TV_GENRE_MAP = {
  'Drama': 18,
  'Comedia': 35,
  'Action & Adventure': 10759,
  'Suspense': 53,
  'Sci-Fi & Fantasy': 10765,
  'Terror': 27,
  'Romance': 10749,
  'Crimen': 80,
  'Animación': 16,
  'Documental': 99,
  'War & Politics': 10768,
  'Música': 10402,
  'Misterio': 9648,
  'Familia': 10751,
  'Kids': 10762,
  'Western': 37,
  'Reality': 10764,
  'Soap': 10766,
  'News': 10763,
  'Talk': 10767
};

export const MOVIE_GENRE_MAP = {
  'Drama': 18,
  'Comedia': 35,
  'Acción': 28,
  'Suspense': 53,
  'Ciencia ficción': 878,
  'Terror': 27,
  'Romance': 10749,
  'Crimen': 80,
  'Aventura': 12,
  'Fantasía': 14,
  'Animación': 16,
  'Documental': 99,
  'Bélica': 10752,
  'Música': 10402,
  'Misterio': 9648,
  'Familia': 10751,
  'Western': 37,
  'Historia': 36,
  'Película de TV': 10770
};

export const COUNTRY_LANGUAGE_MAP = {
    ES: 'es-ES',
    MX: 'es-MX',
    AR: 'es-MX',
    CO: 'es-MX',
    CL: 'es-MX',
    PE: 'es-MX',
    EC: 'es-MX',
    UY: 'es-MX',
    BO: 'es-MX',
    PY: 'es-MX',
    PA: 'es-MX',
    CR: 'es-MX',
    GT: 'es-MX',
    DO: 'es-MX',
    US: 'en-US',
    BR: 'pt-BR',
    GB: 'en-GB'
};

export const getLanguage = (country) => {
    return COUNTRY_LANGUAGE_MAP[country] || 'es-ES';
};

export const DEFAULT_LANGUAGE = 'es-ES';
export const DEFAULT_COUNTRY = 'PE';
export const DEFAULT_POPULAR_PAGES = 5;
export const DEFAULT_SEARCH_PAGES = 5;

export const COUNTRY_OPTIONS = {
    AR: 'Argentina',
    BO: 'Bolivia',
    BR: 'Brasil',
    CL: 'Chile',
    CO: 'Colombia',
    CR: 'Costa Rica',
    EC: 'Ecuador',
    ES: 'España',
    US: 'Estados Unidos',
    GT: 'Guatemala',
    MX: 'México',
    PA: 'Panamá',
    PY: 'Paraguay',
    PE: 'Perú',
    GB: 'Reino Unido',
    DO: 'Rep. Dominicana',
    UY: 'Uruguay'
};