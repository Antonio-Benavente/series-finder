import { useState, useCallback } from 'react';
import { API_BASE, DEFAULT_SEARCH_PAGES } from '../config/api.js';
import { tmdbFetch } from '../services/tmdbApi.js';
import { transformShow, transformMovie } from '../utils/transformers.js';

export function useSearch(currentLanguage, genreNames) {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [media, setMedia] = useState([]);
  const [searching, setSearching] = useState(false);

  const searchShows = useCallback(async (query) => {
    if (!query?.trim()) return 'RESET';
    setSearching(true);
    try {
      const results = await Promise.all(
        Array.from({ length: DEFAULT_SEARCH_PAGES }, (_, i) =>
          tmdbFetch(`${API_BASE}/search/tv?language=${currentLanguage}&query=${encodeURIComponent(query)}&sort_by=popularity.desc&page=${i + 1}`, API_KEY)
        )
      );
      return results.flatMap(r => r.results || []).map(s => transformShow(s, genreNames));
    } catch {
      return [];
    } finally {
      setSearching(false);
    }
  }, [API_KEY, currentLanguage, genreNames]);

  const searchMovies = useCallback(async (query) => {
    if (!query?.trim()) return 'RESET';
    setSearching(true);
    try {
      const results = await Promise.all(
        Array.from({ length: DEFAULT_SEARCH_PAGES }, (_, i) =>
          tmdbFetch(`${API_BASE}/search/movie?language=${currentLanguage}&query=${encodeURIComponent(query)}&sort_by=popularity.desc&page=${i + 1}`, API_KEY)
        )
      );
      return results.flatMap(r => r.results || []).map(m => transformMovie(m, genreNames));
    } catch {
      return [];
    } finally {
      setSearching(false);
    }
  }, [API_KEY, currentLanguage, genreNames]);

  const searchMedia = useCallback(async (query) => {
    if (!query?.trim()) return [];
    setSearching(true);
    try {
      const [tvResults, movieResults] = await Promise.all([
        Promise.all(
          Array.from({ length: DEFAULT_SEARCH_PAGES }, (_, i) =>
            tmdbFetch(`${API_BASE}/search/tv?language=${currentLanguage}&query=${encodeURIComponent(query)}&page=${i + 1}`, API_KEY)
          )
        ),
        Promise.all(
          Array.from({ length: DEFAULT_SEARCH_PAGES }, (_, i) =>
            tmdbFetch(`${API_BASE}/search/movie?language=${currentLanguage}&query=${encodeURIComponent(query)}&page=${i + 1}`, API_KEY)
          )
        )
      ]);

      const tvShows = tvResults.flatMap(r => r.results || []).map(s => transformShow(s, genreNames));
      const movieList = movieResults.flatMap(r => r.results || []).map(m => transformMovie(m, genreNames));
      const combined = [...tvShows, ...movieList].sort(() => Math.random() - 0.5);

      setMedia(combined);
      return combined;
    } catch {
      setMedia([]);
      return [];
    } finally {
      setSearching(false);
    }
  }, [API_KEY, currentLanguage, genreNames]);

  const filterByGenre = useCallback((genres, shows) => {
    if (!genres.length) return shows;
    return shows.filter(show =>
      genres.every(g => show.genres.includes(g))
    );
  }, []);

  const filterMoviesByGenre = useCallback((genres, movies) => {
    if (!genres.length) return movies;
    return movies.filter(movie =>
      genres.every(g => movie.genres.includes(g))
    );
  }, []);

  return {
    media, setMedia,
    searching,
    searchShows,
    searchMovies,
    searchMedia,
    filterByGenre,
    filterMoviesByGenre
  };
}
