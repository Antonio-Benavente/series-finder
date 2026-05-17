import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import { useTranslation } from '../i18n/useTranslation.js';
import styles from './css/Home.module.css';
import { HeroSection } from '../components/HeroSection.jsx';
import { useSeriesData } from '../hooks/useSeriesData.js';
import notFoundImg from '../assets/not-found.webp';
import { ArrowRightIcon } from '../assets/icons/ArrowRightIcon.jsx';
import { ChevronLeftIcon } from '../assets/icons/ChevronLeftIcon.jsx';
import { ChevronRightIcon } from '../assets/icons/ChevronRightIcon.jsx';
import { BookIcon } from '../assets/icons/BookIcon.jsx';

export function HomePage() {
    const { getTopMediaToday } = useSeriesData();
    const [topShows, setTopShows] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const fetchedRef = useRef(false);

    useEffect(() => {
        let cancelled = false;

        const fetchTopShows = async () => {
            if (!fetchedRef.current) setLoading(true);

            try {
                const shows = await getTopMediaToday(10);
                if (!cancelled && shows && shows.length > 0) {
                    setTopShows(shows);
                }
            } catch (error) {
                if (!cancelled) console.error('Error loading top shows:', error);
            } finally {
                if (!cancelled) {
                    setLoading(false);
                    fetchedRef.current = true;
                }
            }
        };

        fetchTopShows();
        return () => { cancelled = true; };
    }, [getTopMediaToday]);

    useEffect(() => {
        if (topShows.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % topShows.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [topShows]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % topShows.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + topShows.length) % topShows.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const cleanSummary = (summary) => {
        if (!summary) return t('home.noDescription');
        return summary.replace(/<[^>]*>/g, '');
    };

    return (
        <div className={styles.homeContainer}>
            <section className={styles.fullscreenSection}>
                <div className={styles.sectionContent}>
                    <HeroSection
                        titulo1={t('home.hero1')}
                        titulo2={t('home.hero2')}
                    />
                </div>
            </section>

            <section className={`${styles.fullscreenSection} ${styles.carouselSection}`}>
                <div className={styles.sectionContent}>
                    <h2 className={styles.sectionTitle}>{t('home.trendingTitle')}</h2>

                    {loading ? (
                        <div className={styles.loadingContainer}>
                            <div className={styles.loadingSpinner}></div>
                            <div className={styles.loadingText}>{t('loading.loading')}</div>
                        </div>
                    ) : topShows.length > 0 ? (
                        <div className={styles.newCarousel}>
                            <div className={styles.featuredShow}>
                                {topShows[currentIndex] && (
                                    <>
                                        <div className={styles.featuredImage}>
                                            <img
                                                src={topShows[currentIndex].image?.medium || notFoundImg}
                                                srcSet={topShows[currentIndex].image?.srcset}
                                                sizes={topShows[currentIndex].image?.sizes}
                                                alt={topShows[currentIndex].name}
                                                fetchPriority="high"
                                                width="280"
                                                height="420"
                                            />
                                        </div>
                                        <div className={styles.featuredContent}>
                                            <div className={styles.featuredInfo}>
                                                <div className={styles.featuredHeader}>
                                                    <div className={styles.featuredRank}>#{currentIndex + 1}</div>
                                                </div>
                                                <div className={styles.mediaTypeBadge}>
                                                    {topShows[currentIndex].media_type === 'movie' ? t('home.movie') : t('home.series')}
                                                </div>
                                                <h3 className={styles.featuredTitle}>{topShows[currentIndex].name}</h3>
                                                <p className={styles.featuredDescription}>
                                                    {cleanSummary(topShows[currentIndex].summary)}
                                                </p>
                                            </div>
                                            <Link 
                                                to={`/media/${topShows[currentIndex].media_type}/${topShows[currentIndex].id}`} 
                                                className={styles.featuredButton}
                                            >
                                                {t('details.visitOfficial')}
                                                <ArrowRightIcon size={18} />
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className={styles.bottomControls}>
                                <div className={styles.carouselProgress}>
                                    {topShows.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`${styles.progressDot} ${index === currentIndex ? styles.active : ''}`}
                                            aria-label={`Ver ${index + 1}`}
                                        />
                                    ))}
                                </div>
                                <div className={styles.carouselControls}>
                                    <button 
                                        onClick={prevSlide} 
                                        className={styles.controlButton}
                                        aria-label={t('home.prev')}
                                    >
                                        <ChevronLeftIcon size={20} />
                                    </button>
                                    <button 
                                        onClick={nextSlide} 
                                        className={styles.controlButton}
                                        aria-label={t('home.next')}
                                    >
                                        <ChevronRightIcon size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.noShowsMessage}>
                            <BookIcon size={64} className={styles.noShowsIcon} />
                            <h3>{t('home.noShowsTitle')}</h3>
                            <p>{t('home.noShowsSubtitle')}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
