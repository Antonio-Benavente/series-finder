import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useSeriesData } from './useSeriesData.js';
import { usePagination } from './usePagination.js';
import { sortByRating } from '../utils/sort.js';

export function useCatalogSearch(mediaType = 'tv') {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const genreQuery = searchParams.get('genre') || '';

    const [hasSearched, setHasSearched] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [localData, setLocalData] = useState([]);
    const [paginationKey, setPaginationKey] = useState(0);

    const isTv = mediaType === 'tv';
    const { filteredShows, filteredMovies, loading, popularTvLoading, popularTvLoaded, popularMovieLoading, popularMovieLoaded, searchShows, searchMovies, filterByGenre, filterMoviesByGenre, resetSearch, resetMoviesSearch, getTopMediaByGenre, loadPopularTv, loadPopularMovie } = useSeriesData();

    const data = searchQuery
        ? [...(isTv ? filteredShows : filteredMovies)].sort(sortByRating)
        : (genreQuery ? localData : (isTv ? filteredShows : filteredMovies));

    const {
        currentPage,
        currentItems,
        totalPages,
        totalItems,
        goToNextPage,
        goToPreviousPage,
        goToPage
    } = usePagination(data, 20, paginationKey);

    const { searchFn, filterFn, resetFn } = useMemo(() => ({
        searchFn: isTv ? searchShows : searchMovies,
        filterFn: isTv ? filterByGenre : filterMoviesByGenre,
        resetFn: isTv ? resetSearch : resetMoviesSearch,
    }), [isTv, searchShows, searchMovies, filterByGenre, filterMoviesByGenre, resetSearch, resetMoviesSearch]);

    const mediaTypeApi = useMemo(() => isTv ? 'tv' : 'movie', [isTv]);

    useEffect(() => {
        if (loading) return;

        let cancelled = false;

        const performSearch = async () => {
            if (searchQuery) {
                setIsSearching(true);
                setHasSearched(true);
                await searchFn(searchQuery);
                if (!cancelled) {
                    setPaginationKey(prev => prev + 1);
                    setIsSearching(false);
                }
            }
            else if (genreQuery) {
                setIsSearching(true);
                setHasSearched(true);
                try {
                    const results = await getTopMediaByGenre(genreQuery, 100);
                    if (!cancelled) {
                        const filtered = results
                            .filter(r => r.media_type === mediaTypeApi)
                            .sort(sortByRating);
                        setLocalData(filtered);
                        setPaginationKey(prev => prev + 1);
                    }
                } finally {
                    if (!cancelled) setIsSearching(false);
                }
            }
            else {
                const loadFn = isTv ? loadPopularTv : loadPopularMovie;
                const loaded = isTv ? popularTvLoaded : popularMovieLoaded;
                if (!loaded) {
                    await loadFn();
                    if (cancelled) return;
                }
                resetFn();
                setLocalData([]);
                setHasSearched(false);
            }
        };

        performSearch();
        return () => { cancelled = true; };
    }, [searchQuery, genreQuery, loading, popularTvLoaded, popularMovieLoaded, searchFn, filterFn, resetFn, getTopMediaByGenre, mediaTypeApi, loadPopularTv, loadPopularMovie, isTv]);

    return {
        currentItems,
        currentPage,
        totalPages,
        totalItems,
        hasSearched,
        isSearching: loading || (isTv ? popularTvLoading : popularMovieLoading) || isSearching,
        searchQuery,
        genreQuery,
        goToNextPage,
        goToPreviousPage,
        goToPage
    };
}
