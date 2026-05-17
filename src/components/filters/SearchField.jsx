import { useTranslation } from '../../i18n/useTranslation.js';
import styles from '../css/Filters.module.css';
import { SearchIcon } from '../../assets/icons/SearchIcon.jsx';

export function SearchField({ inputRef, placeholder, value, onChange, onClear, onSubmit }) {
    const { t } = useTranslation();
    return (
        <form onSubmit={onSubmit} className={styles.searchFormInline}>
            <div className={styles.searchWrapperInline}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder || t('filters.searchPlaceholder')}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && onSubmit(e)}
                    className={styles.searchInputInline}
                />
                {value && (
                    <button
                        type="button"
                        onClick={onClear}
                        className={styles.clearButtonInline}
                        aria-label={t('filters.clearSearch')}
                    >x</button>
                )}
                <button type="submit" className={styles.searchButtonInline} aria-label={t('filters.searchButton')}>
                    <SearchIcon size={22} />
                </button>
            </div>
        </form>
    );
}
