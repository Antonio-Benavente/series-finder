import { useSearchParams } from 'react-router';
import { useTranslation } from '../../i18n/useTranslation.js';
import { Pagination } from '../shared/Pagination.jsx';
import { PageInfo } from '../shared/PageInfo.jsx';
import { Filters } from '../SeriesPage/Filters.jsx';
import { CatalogListing } from './CatalogListing.jsx';
import { useCatalogSearch } from '../../hooks/useCatalogSearch.js';
import styles from '../css/SeriesSection.module.css';
import { LoadingPage } from '../../Pages/LoadingPage.jsx';

export function CatalogSection({ type = 'tv', title = 'Series', itemTypeLabel }) {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const genreQuery = searchParams.get('genre') || '';
    const { t } = useTranslation();

    const {
        currentItems,
        currentPage,
        totalPages,
        totalItems,
        hasSearched,
        isSearching,
        goToNextPage,
        goToPreviousPage,
        goToPage
    } = useCatalogSearch(type);

    const pageTitle = hasSearched && searchQuery
        ? `${title} que contienen en el titulo "${searchQuery}"`
        : hasSearched && genreQuery
            ? `${title} con los generos: ${genreQuery.split(',').join(' & ')}`
            : title === 'Series' ? t('catalog.allSeries') : t('catalog.allMovies');

    if (isSearching) {
        return <LoadingPage message={searchQuery || genreQuery ? t('filters.searchButton') : `${t('loading.loading')} ${title.toLowerCase()}`} />;
    }

    return (
        <div className={styles.series}>
            <div className={styles.container}>
                <h2 className={styles.subtitle}>{pageTitle}</h2>
                <Filters />

                {currentItems.length === 0 ? (
                    <div className={styles.noResults}>
                        <h3>{t('catalog.noResults')}</h3>
                    </div>
                ) : (
                    <>
                        <CatalogListing items={currentItems} type={type} />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onNextPage={goToNextPage}
                            onPreviousPage={goToPreviousPage}
                            onGoToPage={goToPage}
                            itemType={itemTypeLabel || title.toLowerCase()}
                        />

                        <PageInfo
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            itemType={itemTypeLabel || title.toLowerCase()}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
