import { useTranslation } from '../../i18n/useTranslation.js';
import styles from '../css/Filters.module.css';

export function GenreSelector({ isOpen, availableGenres, selectedGenres, onGenreClick, onClearAll, onApply }) {
    const { t } = useTranslation();
    if (!isOpen) return null;

    return (
        <div className={styles.genreDropdownPanel}>
            <div className={styles.genreGrid}>
                {availableGenres.map(genre => (
                    <button
                        key={genre}
                        type="button"
                        className={`${styles.genreButton} ${selectedGenres.includes(genre) ? styles.genreButtonActive : ''}`}
                        onClick={e => onGenreClick(e, genre)}
                    >{genre}</button>
                ))}
            </div>
            <div className={styles.genreActions}>
                <button type="button" className={styles.clearAllButton} onClick={onClearAll}>
                    {t('filters.clearAll')}
                </button>
                <button type="button" className={styles.applyButton} onClick={onApply}>
                    {t('filters.applyFilters')}
                </button>
            </div>
        </div>
    );
}
