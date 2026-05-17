import { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from '../../i18n/useTranslation.js';
import { CatalogListing } from "../catalog/CatalogListing.jsx";
import { Pagination } from "../shared/Pagination.jsx";
import { PageInfo } from "../shared/PageInfo.jsx";
import { Filters } from "../SeriesPage/Filters.jsx";
import { useSeriesData } from "../../hooks/useSeriesData.js";
import { usePagination } from "../../hooks/usePagination.js";
import { sortByRating } from "../../utils/sort.js";
import styles from "../css/SeriesSection.module.css";
import { LoadingPage } from "../../Pages/LoadingPage.jsx";

export function GeneralSection() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const genreQuery = searchParams.get('genre') || '';
    const [hasSearched, setHasSearched] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [loading, setLoading] = useState(true);
    const [media, setMedia] = useState([]);
    const [paginationKey, setPaginationKey] = useState(0);
    const { t } = useTranslation();

    const { getTopMediaToday, getTopMediaByGenre, searchMedia } = useSeriesData();
    const fetchedRef = useRef(false);
    const prevParamsRef = useRef({ searchQuery: '', genreQuery: '' });

    const sortedMedia = useMemo(() => {
        if (!media?.length) return media;
        return [...media].sort(sortByRating);
    }, [media]);

    const { currentPage, currentItems, totalPages, goToNextPage, goToPreviousPage, goToPage } = usePagination(sortedMedia, 20, paginationKey);

    useEffect(() => {
        let cancelled = false;

        const paramsChanged = prevParamsRef.current.searchQuery !== searchQuery || prevParamsRef.current.genreQuery !== genreQuery;
        prevParamsRef.current = { searchQuery, genreQuery };

        const showLocalLoading = !fetchedRef.current || paramsChanged;

        const performSearch = async () => {
            if (showLocalLoading) setLoading(true);

            if (searchQuery) {
                if (showLocalLoading) setIsSearching(true);
                setHasSearched(true);
                try {
                    const results = await searchMedia(searchQuery);
                    if (!cancelled) {
                        const sorted = [...results].sort(sortByRating);
                        setMedia(sorted);
                        setPaginationKey(prev => prev + 1);
                    }
                } catch (err) {
                    console.error('Error buscando general:', err);
                    if (!cancelled) setMedia([]);
                } finally {
                    if (!cancelled) {
                        setIsSearching(false);
                        setLoading(false);
                        fetchedRef.current = true;
                    }
                }
            } else if (genreQuery) {
                if (showLocalLoading) setIsSearching(true);
                setHasSearched(true);
                try {
                    const results = await getTopMediaByGenre(genreQuery, 100);
                    if (!cancelled) {
                        const sorted = [...results].sort(sortByRating);
                        setMedia(sorted);
                    }
                } catch (err) {
                    console.error('Error filtrando general por genero:', err);
                    if (!cancelled) setMedia([]);
                } finally {
                    if (!cancelled) {
                        setIsSearching(false);
                        setLoading(false);
                        fetchedRef.current = true;
                    }
                }
            } else {
                try {
                    const topMedia = await getTopMediaToday(100);
                    if (!cancelled) {
                        setMedia(topMedia);
                        setHasSearched(false);
                    }
                } catch (err) {
                    console.error('Error cargando general:', err);
                    if (!cancelled) setMedia([]);
                } finally {
                    if (!cancelled) {
                        setIsSearching(false);
                        setLoading(false);
                        fetchedRef.current = true;
                    }
                }
            }
        };

        performSearch();
        return () => { cancelled = true; };
    }, [searchQuery, genreQuery, getTopMediaToday, getTopMediaByGenre, searchMedia]);

    const title = hasSearched && searchQuery
        ? `Series o peliculas que contienen en el titulo "${searchQuery}"`
        : hasSearched && genreQuery
            ? `Series o peliculas con los generos: ${genreQuery.split(',').join(' & ')}`
            : t('catalog.allMixed');

    if (loading || isSearching) {
        return <LoadingPage message={isSearching ? t('filters.searchButton') : t('loading.loading')} />;
    }

    return (
        <div className={styles.series}>
            <div className={styles.container}>
                <h2 className={styles.subtitle}>{title}</h2>
                <Filters />

                {(media?.length || 0) === 0 ? (
                    <div className={styles.noResults}>
                        <h3>{t('catalog.noResults')}</h3>
                    </div>
                ) : (
                    <>
                        <CatalogListing items={currentItems} type="general" variant="general" />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onNextPage={goToNextPage}
                            onPreviousPage={goToPreviousPage}
                            onGoToPage={goToPage}
                            itemType={t('catalog.elements')}
                        />

                        <PageInfo
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={media?.length || 0}
                            itemType={t('catalog.elements')}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
