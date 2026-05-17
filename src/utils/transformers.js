import { IMAGE_BASE, IMAGE_SIZES, POSTER_SRCSET, PROFILE_SRCSET } from '../config/api.js';

const buildImageUrl = (path, size) => {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
};

const buildSrcSet = (path, sizes) => {
  if (!path) return undefined;
  return sizes.map(size => `${IMAGE_BASE}/${size}${path} ${size.replace('w', '')}w`).join(', ');
};

const extractWatchProviders = (watchProvidersData) => {
  if (!watchProvidersData?.results) return null;
  return watchProvidersData.results;
};

const FIELD_MAP = {
  tv: {
    nameKey: 'name',
    dateKey: 'first_air_date',
    dateEndedKey: 'last_air_date',
    runtimeKey: 'episode_run_time',
  },
  movie: {
    nameKey: 'title',
    dateKey: 'release_date',
    runtimeKey: 'runtime',
  }
};

export const transformItem = (item, type, genreNames = {}) => {
  const fields = FIELD_MAP[type];
  const genreNamesArray = item.genre_ids?.map(id => genreNames[id]).filter(Boolean) || [];
  const genres = item.genres?.map(g => g.name) || genreNamesArray;

  return {
    id: item.id,
    name: item[fields.nameKey] || item[`original_${fields.nameKey}`],
    image: {
      medium: buildImageUrl(item.poster_path, IMAGE_SIZES.poster),
      original: buildImageUrl(item.backdrop_path, IMAGE_SIZES.backdrop),
      srcset: buildSrcSet(item.poster_path, POSTER_SRCSET),
      sizes: '(max-width: 480px) 185px, (max-width: 768px) 342px, 500px'
    },
    summary: item.overview || "Sin descripcion disponible",
    rating: { average: item.vote_average ? item.vote_average.toFixed(1) : null },
    genres,
    genre_ids: item.genre_ids || [],
    premiered: item[fields.dateKey],
    ended: fields.dateEndedKey ? item[fields.dateEndedKey] : undefined,
    status: item.status || 'Desconocido',
    language: item.original_language?.toUpperCase(),
    media_type: type,
    runtime: fields.runtimeKey ? item[fields.runtimeKey]?.[0] ?? item[fields.runtimeKey] : undefined,
    number_of_seasons: item.number_of_seasons,
    number_of_episodes: item.number_of_episodes,
    tagline: item.tagline,
    vote_count: item.vote_count,
    popularity: item.popularity,
    homepage: item.homepage,
    production_companies: item.production_companies?.map(c => c.name).join(', ') || null,
    _embedded: item.credits ? {
      cast: item.credits.cast?.slice(0, 10).map(person => ({
        person: {
          name: person.name,
          image: {
            medium: buildImageUrl(person.profile_path, IMAGE_SIZES.profile),
            srcset: buildSrcSet(person.profile_path, PROFILE_SRCSET),
            sizes: '150px'
          }
        },
        character: { name: person.character }
      }))
    } : null,
    watch_providers: extractWatchProviders(item['watch/providers'])
  };
};

export const transformShow = (show, genreNames = {}) =>
  transformItem(show, 'tv', genreNames);

export const transformMovie = (movie, genreNames = {}) =>
  transformItem(movie, 'movie', genreNames);

export const transformMediaItem = (item, genreNames = {}) =>
  transformItem(item, item.media_type === 'movie' ? 'movie' : 'tv', genreNames);
