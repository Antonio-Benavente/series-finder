import { useState, useCallback, useRef } from 'react';
import { API_BASE, DEFAULT_POPULAR_PAGES } from '../config/api.js';
import { fetchMultiplePages } from '../services/tmdbApi.js';
import { transformShow, transformMovie } from '../utils/transformers.js';

export function usePopularContent(currentLanguage, tvGenreNames, movieGenreNames) {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [popularTvLoading, setPopularTvLoading] = useState(false);
  const [popularTvLoaded, setPopularTvLoaded] = useState(false);
  const [popularMovieLoading, setPopularMovieLoading] = useState(false);
  const [popularMovieLoaded, setPopularMovieLoaded] = useState(false);
  const popularTvLoadedRef = useRef(false);
  const popularMovieLoadedRef = useRef(false);

  const loadPopularTv = useCallback(async () => {
    if (popularTvLoadedRef.current) return;
    setPopularTvLoading(true);
    try {
      const tvData = await fetchMultiplePages(`${API_BASE}/tv/popular?language=${currentLanguage}`, DEFAULT_POPULAR_PAGES, API_KEY);
      const tvItems = tvData.map(s => transformShow(s, tvGenreNames));
      setShows(tvItems);
      setFilteredShows(tvItems);
      popularTvLoadedRef.current = true;
      setPopularTvLoaded(true);
    } catch {
      // silent
    } finally {
      setPopularTvLoading(false);
    }
  }, [API_KEY, currentLanguage, tvGenreNames]);

  const loadPopularMovie = useCallback(async () => {
    if (popularMovieLoadedRef.current) return;
    setPopularMovieLoading(true);
    try {
      const movieData = await fetchMultiplePages(`${API_BASE}/movie/popular?language=${currentLanguage}`, DEFAULT_POPULAR_PAGES, API_KEY);
      const movieItems = movieData.map(m => transformMovie(m, movieGenreNames));
      setMovies(movieItems);
      setFilteredMovies(movieItems);
      popularMovieLoadedRef.current = true;
      setPopularMovieLoaded(true);
    } catch {
      // silent
    } finally {
      setPopularMovieLoading(false);
    }
  }, [API_KEY, currentLanguage, movieGenreNames]);

  const resetPopularRefs = useCallback(() => {
    popularTvLoadedRef.current = false;
    popularMovieLoadedRef.current = false;
  }, []);

  return {
    shows, setShows, filteredShows, setFilteredShows,
    movies, setMovies, filteredMovies, setFilteredMovies,
    popularTvLoading,
    popularTvLoaded, setPopularTvLoaded,
    popularMovieLoading,
    popularMovieLoaded, setPopularMovieLoaded,
    loadPopularTv, loadPopularMovie, resetPopularRefs
  };
}
