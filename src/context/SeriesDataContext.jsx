import React, { createContext, useEffect, useState, useCallback, useContext, useMemo, useRef } from 'react';
import { DEFAULT_LANGUAGE } from '../config/api.js';
import { SettingsContext } from '../config/settings.js';
import { useGenreLoader } from '../hooks/useGenreLoader.js';
import { usePopularContent } from '../hooks/usePopularContent.js';
import { useSearch } from '../hooks/useSearch.js';
import { useTrending } from '../hooks/useTrending.js';

export const SeriesDataContext = createContext(null);

export function SeriesDataProvider({ children }) {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const settings = useContext(SettingsContext);
  const currentLanguage = settings?.language || DEFAULT_LANGUAGE;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevLanguageRef = useRef(currentLanguage);
  const fetchedRef = useRef(false);

  const {
    genreNames, setGenreNames,
    tvGenreNames, setTvGenreNames,
    movieGenreNames, setMovieGenreNames,
    loadGenres
  } = useGenreLoader();

  const {
    shows, setShows, filteredShows, setFilteredShows,
    movies, setMovies, filteredMovies, setFilteredMovies,
    popularTvLoading, popularTvLoaded, setPopularTvLoaded,
    popularMovieLoading, popularMovieLoaded, setPopularMovieLoaded,
    loadPopularTv, loadPopularMovie, resetPopularRefs
  } = usePopularContent(currentLanguage, tvGenreNames, movieGenreNames);

  const {
    media,
    searching,
    searchShows: rawSearchShows,
    searchMovies: rawSearchMovies,
    searchMedia: rawSearchMedia,
    filterByGenre: rawFilterByGenre,
    filterMoviesByGenre: rawFilterMoviesByGenre
  } = useSearch(currentLanguage, genreNames);

  const { getTopMediaToday, getTopMediaByGenre, getMediaById } = useTrending(currentLanguage, genreNames, tvGenreNames, movieGenreNames);

  useEffect(() => {
    const languageChanged = prevLanguageRef.current !== currentLanguage;
    prevLanguageRef.current = currentLanguage;

    if (!API_KEY) {
      setError("Servicio no disponible. Por favor intenta más tarde.");
      setLoading(false);
      return;
    }

    if (languageChanged) {
      resetPopularRefs();
      setPopularTvLoaded(false);
      setPopularMovieLoaded(false);
      setShows([]);
      setFilteredShows([]);
      setMovies([]);
      setFilteredMovies([]);
      setLoading(true);
    }

    if (!languageChanged && fetchedRef.current) return;

    let cancelled = false;

    const initData = async () => {
      try {
        const genres = await loadGenres(API_KEY, currentLanguage);

        if (cancelled) return;

        setGenreNames(genres.combined);
        setTvGenreNames(genres.tvGenres);
        setMovieGenreNames(genres.movieGenres);
        fetchedRef.current = true;
        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          console.error("Error loading genres:", err);
          setError("Error al cargar los datos. Por favor verifica tu conexión e intenta de nuevo.");
          setLoading(false);
        }
      }
    };

    initData();
    return () => { cancelled = true; };
  }, [API_KEY, loadGenres, currentLanguage, resetPopularRefs, setPopularTvLoaded, setPopularMovieLoaded, setShows, setFilteredShows, setMovies, setFilteredMovies, setGenreNames, setTvGenreNames, setMovieGenreNames]);

  const searchShows = useCallback(async (query) => {
    if (!query?.trim()) {
      setFilteredShows(shows);
      return;
    }
    const results = await rawSearchShows(query);
    if (results === 'RESET') {
      setFilteredShows(shows);
    } else {
      setFilteredShows(results);
    }
  }, [shows, rawSearchShows, setFilteredShows]);

  const searchMovies = useCallback(async (query) => {
    if (!query?.trim()) {
      setFilteredMovies(movies);
      return;
    }
    const results = await rawSearchMovies(query);
    if (results === 'RESET') {
      setFilteredMovies(movies);
    } else if (results) {
      setFilteredMovies(results);
    }
  }, [movies, rawSearchMovies, setFilteredMovies]);

  const searchMedia = useCallback(async (query) => {
    return rawSearchMedia(query);
  }, [rawSearchMedia]);

  const filterByGenre = useCallback((genres) => {
    setFilteredShows(rawFilterByGenre(genres, shows));
  }, [shows, rawFilterByGenre, setFilteredShows]);

  const filterMoviesByGenre = useCallback((genres) => {
    setFilteredMovies(rawFilterMoviesByGenre(genres, movies));
  }, [movies, rawFilterMoviesByGenre, setFilteredMovies]);

  const resetSearch = useCallback(() => setFilteredShows(shows), [shows, setFilteredShows]);
  const resetMoviesSearch = useCallback(() => setFilteredMovies(movies), [movies, setFilteredMovies]);

  const value = useMemo(() => ({
    shows,
    filteredShows,
    movies,
    filteredMovies,
    media,
    loading,
    popularTvLoading,
    popularTvLoaded,
    popularMovieLoading,
    popularMovieLoaded,
    error,
    searching,
    genreNames,
    tvGenreNames,
    movieGenreNames,
    searchShows,
    resetSearch,
    filterByGenre,
    searchMovies,
    searchMedia,
    resetMoviesSearch,
    filterMoviesByGenre,
    getMediaById,
    getTopMediaToday,
    getTopMediaByGenre,
    loadPopularTv,
    loadPopularMovie
  }), [shows, filteredShows, movies, filteredMovies, media, loading, popularTvLoading, popularTvLoaded, popularMovieLoading, popularMovieLoaded, error, searching, genreNames, tvGenreNames, movieGenreNames, searchShows, resetSearch, filterByGenre, searchMovies, searchMedia, resetMoviesSearch, filterMoviesByGenre, getMediaById, getTopMediaToday, getTopMediaByGenre, loadPopularTv, loadPopularMovie]);

  return (
    <SeriesDataContext.Provider value={value}>
      {children}
    </SeriesDataContext.Provider>
  );
}
