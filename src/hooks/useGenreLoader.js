import { useState, useCallback } from 'react';
import { API_BASE } from '../config/api.js';
import { tmdbFetch } from '../services/tmdbApi.js';

export function useGenreLoader() {
  const [genreNames, setGenreNames] = useState({});
  const [tvGenreNames, setTvGenreNames] = useState({});
  const [movieGenreNames, setMovieGenreNames] = useState({});

  const loadGenres = useCallback(async (apiKey, language) => {
    const [tvRes, movieRes] = await Promise.all([
      tmdbFetch(`${API_BASE}/genre/tv/list?language=${language}`, apiKey),
      tmdbFetch(`${API_BASE}/genre/movie/list?language=${language}`, apiKey)
    ]);
    const tvGenres = {};
    tvRes.genres?.forEach(g => tvGenres[g.id] = g.name);

    const movieGenres = {};
    movieRes.genres?.forEach(g => movieGenres[g.id] = g.name);

    const combined = { ...tvGenres, ...movieGenres };
    return { combined, tvGenres, movieGenres };
  }, []);

  return {
    genreNames, setGenreNames,
    tvGenreNames, setTvGenreNames,
    movieGenreNames, setMovieGenreNames,
    loadGenres
  };
}
