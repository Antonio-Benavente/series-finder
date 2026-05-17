import { useCallback } from 'react';
import { API_BASE, TV_GENRE_MAP, MOVIE_GENRE_MAP } from '../config/api.js';
import { tmdbFetch, fetchWithCredits } from '../services/tmdbApi.js';
import { transformShow, transformMovie, transformMediaItem } from '../utils/transformers.js';

export function useTrending(currentLanguage, genreNames, tvGenreNames, movieGenreNames) {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const getTopMediaToday = useCallback(async (limit = 10) => {
    if (!API_KEY) return [];
    const pages = Math.ceil(limit / 20);
    try {
      const results = await Promise.all(
        Array.from({ length: pages }, (_, i) =>
          tmdbFetch(`${API_BASE}/trending/all/day?language=${currentLanguage}&page=${i + 1}`, API_KEY)
        )
      );
      const items = results.flatMap(r => r.results || []).map(item => transformMediaItem(item, genreNames));
      return items.slice(0, limit);
    } catch {
      return [];
    }
  }, [API_KEY, currentLanguage, genreNames]);

  const getTopMediaByGenre = useCallback(async (genreNamesStr, limit = 9) => {
    const genres = genreNamesStr.split(',').map(g => g.trim()).filter(Boolean);
    if (!genres.length) return [];

    const tvGenreIds = genres.map(n => TV_GENRE_MAP[n]).filter(Boolean);
    const movieGenreIds = genres.map(n => MOVIE_GENRE_MAP[n]).filter(Boolean);

    if (!tvGenreIds.length && !movieGenreIds.length) return [];

    try {
      const requests = [];
      if (tvGenreIds.length) {
        requests.push(tmdbFetch(`${API_BASE}/discover/tv?language=${currentLanguage}&with_genres=${tvGenreIds.join(',')}&page=1`, API_KEY));
      }
      if (movieGenreIds.length) {
        requests.push(tmdbFetch(`${API_BASE}/discover/movie?language=${currentLanguage}&with_genres=${movieGenreIds.join(',')}&page=1`, API_KEY));
      }

      const results = await Promise.all(requests);
      const movieData = results.find(r => r.results?.[0]?.media_type === 'movie' || r.results?.[0]?.title);
      const tvData = results.find(r => r.results?.[0]?.name && !r.results?.[0]?.title);

      const movieList = movieData ? (movieData.results || []).slice(0, limit).map(m => transformMovie(m, movieGenreNames)) : [];
      const showList = tvData ? (tvData.results || []).slice(0, limit).map(s => transformShow(s, tvGenreNames)) : [];

      return [...movieList, ...showList].sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)).slice(0, limit);
    } catch {
      return [];
    }
  }, [API_KEY, currentLanguage, tvGenreNames, movieGenreNames]);

  const getMediaById = useCallback(async (id, mediaType = 'tv') => {
    try {
      const data = await fetchWithCredits(id, mediaType, API_KEY, currentLanguage);
      if (!data) return null;
      const transform = mediaType === 'movie' ? transformMovie : transformShow;
      return transform(data, genreNames);
    } catch {
      return null;
    }
  }, [API_KEY, currentLanguage, genreNames]);

  return { getTopMediaToday, getTopMediaByGenre, getMediaById };
}
