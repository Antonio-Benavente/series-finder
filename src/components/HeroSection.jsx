import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from '../i18n/useTranslation.js';
import styles from '../Pages/css/Home.module.css';
import { XIcon } from '../assets/icons/XIcon.jsx';
import { SearchIcon } from '../assets/icons/SearchIcon.jsx';

export function HeroSection({ titulo1, titulo2 }) {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/general?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <>
            <div className={styles.heroSection}>
                <h1 className={styles.title}>
                    {titulo1}{' '}
                    <span className={styles.highlight}>{titulo2}</span>
                </h1>

                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder={t('home.heroPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                        {searchQuery && (
                            <button type="button" onClick={() => setSearchQuery('')} className={styles.clearButton}>
                                <XIcon size={20} />
                            </button>
                        )}
                        <button type="submit" className={styles.searchButton}>
                            <SearchIcon size={22} />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
