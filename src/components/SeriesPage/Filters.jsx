import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useTranslation } from '../../i18n/useTranslation.js';
import { useSeriesData } from '../../hooks/useSeriesData.js';
import { useUrlBuilder } from '../../hooks/useUrlBuilder.js';
import { FilterBar } from '../filters/FilterBar.jsx';

const FALLBACK_GENRES = [
    'Acción', 'Animación', 'Aventura', 'Comedia', 'Crimen',
    'Documental', 'Drama', 'Familia', 'Fantasía', 'Historia',
    'Misterio', 'Música', 'Romance', 'Ciencia ficción',
    'Suspense', 'Terror', 'War & Politics', 'Western', 'Kids',
    'Action & Adventure', 'Sci-Fi & Fantasy'
];

export function Filters() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { basePath, buildUrl } = useUrlBuilder();
    const { tvGenreNames, movieGenreNames } = useSeriesData();
    const { t } = useTranslation();

    const availableGenres = useMemo(() => {
        const isMoviePage = basePath === '/movies';
        const genreNames = isMoviePage ? movieGenreNames : tvGenreNames;
        const genres = Object.values(genreNames);
        if (genres.length > 0) return genres.sort();
        return FALLBACK_GENRES;
    }, [basePath, tvGenreNames, movieGenreNames]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);

    const inputRef = useRef(null);
    const currentGenres = useMemo(() =>
        searchParams.get('genre')?.split(',').filter(Boolean) || [],
        [searchParams]
    );
    const currentSearch = useMemo(() =>
        searchParams.get('search') || '',
        [searchParams]
    );

    useEffect(() => {
        if (!isSelecting) setSearchInput(currentSearch);
    }, [currentSearch, isSelecting]);

    useEffect(() => {
        if (isSelecting) return;
        const needsSync = selectedGenres.length !== currentGenres.length ||
            !selectedGenres.every(g => currentGenres.includes(g));
        if (needsSync) setSelectedGenres(currentGenres);
    }, [currentGenres, isSelecting, selectedGenres]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleGenreClick = useCallback((e, genre) => {
        e?.preventDefault();
        e?.stopPropagation();
        setIsSelecting(true);
        setSelectedGenres(prev => {
            const isSelected = prev.includes(genre);
            return isSelected
                ? prev.filter(g => g !== genre)
                : [...prev, genre];
        });
    }, []);

    const handleApplyFilters = useCallback((e) => {
        e?.preventDefault();
        e?.stopPropagation();
        navigate(buildUrl(searchInput, selectedGenres));
        setIsSelecting(false);
    }, [navigate, buildUrl, searchInput, selectedGenres]);

    const handleClearAll = useCallback((e) => {
        e?.preventDefault();
        e?.stopPropagation();
        navigate(basePath);
        setSelectedGenres([]);
        setSearchInput('');
        setIsSelecting(false);
    }, [navigate, basePath]);

    const handleSearchSubmit = useCallback((e) => {
        e?.preventDefault();
        navigate(buildUrl(searchInput, selectedGenres));
    }, [navigate, buildUrl, searchInput, selectedGenres]);

    const handleClearSearch = useCallback(() => {
        setSearchInput('');
        navigate(buildUrl('', selectedGenres));
    }, [navigate, buildUrl, selectedGenres]);

    const placeholder = t('filters.searchPlaceholder');
    const activeCount = selectedGenres.length + (currentSearch ? 1 : 0);

    return (
        <FilterBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            selectedGenres={selectedGenres}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            currentSearch={currentSearch}
            placeholder={placeholder}
            activeCount={activeCount}
            inputRef={inputRef}
            availableGenres={availableGenres}
            handleSearchSubmit={handleSearchSubmit}
            handleClearSearch={handleClearSearch}
            handleGenreClick={handleGenreClick}
            handleClearAll={handleClearAll}
            handleApplyFilters={handleApplyFilters}
        />
    );
}
