import { useTranslation } from '../../i18n/useTranslation.js';
import styles from '../css/Filters.module.css';
import { SearchField } from './SearchField.jsx';
import { GenreSelector } from './GenreSelector.jsx';
import { FilterIcon } from '../../assets/icons/FilterIcon.jsx';

export function FilterBar({
    searchInput,
    setSearchInput,
    selectedGenres,
    isDropdownOpen,
    setIsDropdownOpen,
    placeholder,
    activeCount,
    inputRef,
    availableGenres,
    handleSearchSubmit,
    handleClearSearch,
    handleGenreClick,
    handleClearAll,
    handleApplyFilters
}) {
    const { t } = useTranslation();
    return (
        <div className={styles.filtersContainer}>
            <div className={styles.filtersHeader}>
                <SearchField
                    inputRef={inputRef}
                    placeholder={placeholder}
                    value={searchInput}
                    onChange={setSearchInput}
                    onClear={handleClearSearch}
                    onSubmit={handleSearchSubmit}
                />

                <button onClick={() => setIsDropdownOpen(p => !p)} className={styles.toggleButton}>
                    <FilterIcon size={20} />
                    {t('filters.genres')}
                    {activeCount > 0 && (
                        <span className={styles.filterCount}>
                            {activeCount}
                        </span>
                    )}
                </button>
            </div>

            <GenreSelector
                isOpen={isDropdownOpen}
                availableGenres={availableGenres}
                selectedGenres={selectedGenres}
                onGenreClick={handleGenreClick}
                onClearAll={handleClearAll}
                onApply={handleApplyFilters}
            />
        </div>
    );
}
