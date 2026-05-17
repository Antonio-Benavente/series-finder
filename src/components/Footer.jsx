import { useTranslation } from '../i18n/useTranslation.js';
import styles from './css/Footer.module.css';
import { DeviceTvIcon } from '../assets/icons/DeviceTvIcon.jsx';

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.appSection}>
                        <div className={styles.logoContainer}>
                            <DeviceTvIcon size={32} />
                            <h3 className={styles.appName}>Series Finder</h3>
                        </div>
                        <p className={styles.appDescription}>
                            {t('footer.appDescription')}
                        </p>
                    </div>

                    <div className={styles.linksGrid}>
                        <div className={styles.linkColumn}>
                            <h4 className={styles.columnTitle}>{t('footer.explore')}</h4>
                            <ul className={styles.linkList}>
                                <li><a href="/">{t('footer.links.home')}</a></li>
                                <li><a href="/general">{t('footer.links.general')}</a></li>
                                <li><a href="/series">{t('footer.links.series')}</a></li>
                                <li><a href="/movies">{t('footer.links.movies')}</a></li>
                            </ul>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4 className={styles.columnTitle}>{t('footer.resources')}</h4>
                            <ul className={styles.linkList}>
                                <li>
                                    <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                                        {t('footer.links.tmdb')}
                                    </a>
                                </li>
                                <li>
                                    <a href="https://developer.themoviedb.org/docs" target="_blank" rel="noopener noreferrer">
                                        {t('footer.links.tmdb')} API
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4 className={styles.columnTitle}>{t('footer.legal')}</h4>
                            <ul className={styles.linkList}>
                                <li>
                                    <a href="https://www.themoviedb.org/terms-of-use" target="_blank" rel="noopener noreferrer">
                                        {t('footer.links.terms')}
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.themoviedb.org/privacy-policy" target="_blank" rel="noopener noreferrer">
                                        {t('footer.links.privacy')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.tmdbSection}>
                        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className={styles.tmdbLogo}>
                            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="TMDB" loading="lazy" width="150" height="50" />
                        </a>
                        <p className={styles.tmdbText}>
                            {t('footer.tmdb')}
                        </p>
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <p className={styles.copyright}>
                        © {currentYear} SERIES FINDER.
                    </p>
                </div>
            </div>
        </footer>
    );
}
