import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router';
import { LoadingPage } from './LoadingPage.jsx';
import { useSeriesData } from '../hooks/useSeriesData.js';
import { useTranslation } from '../i18n/useTranslation.js';
import styles from './css/Serie.module.css';

import { BackButton } from '../components/DetailsPage/BackButton.jsx';
import { SerieBanner } from '../components/DetailsPage/SerieBanner.jsx';
import { SeriePoster } from '../components/DetailsPage/SeriePoster.jsx';
import { SerieMetadata } from '../components/DetailsPage/SerieMetadata.jsx';
import { SerieGenres } from '../components/DetailsPage/SerieGenres.jsx';
import { SerieDetails } from '../components/DetailsPage/SerieDetails.jsx';
import { SerieCast } from '../components/DetailsPage/SerieCast.jsx';
const SerieWatchProviders = lazy(() => import('../components/DetailsPage/SerieWatchProviders.jsx').then(m => ({ default: m.SerieWatchProviders })));

export function DetailsPage() {
    const { id, mediaType } = useParams();
    const contentType = mediaType || 'tv';
    const navigate = useNavigate();
    const { getMediaById } = useSeriesData();
    const { t } = useTranslation();
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (!show) return;
        document.title = `${show.name} | Series Finder`;
        return () => { document.title = 'Series Finder'; };
    }, [show]);

    useEffect(() => {
        if (!id) {
            setError(true);
            setLoading(false);
            return;
        }

        let cancelled = false;

        const fetchShow = async () => {
            setLoading(true);
            setError(false);

            try {
                const data = await getMediaById(id, contentType);
                if (cancelled) return;
                if (!data) {
                    setError(true);
                } else {
                    setShow(data);
                }
            } catch {
                if (!cancelled) setError(true);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchShow();
        return () => { cancelled = true; };
    }, [id, contentType, getMediaById]);

    if (loading) {
        return <LoadingPage message={t('loading.loading')} />;
    }

    if (error || !show) {
        return (
            <>
                <BackButton onClick={handleGoBack} />
                <div className={styles.errorContainer}>
                    <h2>{t('details.notFoundTitle')}</h2>
                    <p>{t('details.notFoundMessage')}</p>
                </div>
            </>
        );
    }

    const cleanSummary = show.summary
        ? show.summary.replace(/<[^>]*>/g, '')
        : t('details.noDescription');

    return (
        <>
            <BackButton onClick={handleGoBack} />

            <div className={styles.serieContainer}>
                <SerieBanner imageUrl={show.image?.original} />

                <div className={styles.content}>
                    <div className={styles.mainInfo}>
                        <SeriePoster
                            image={show.image}
                            name={show.name}
                        />

                        <div className={styles.info}>
                            <h1 className={styles.title}>{show.name}</h1>

                            <SerieMetadata
                                rating={show.rating?.average}
                                premiered={show.premiered}
                                status={show.status}
                            />

                            <SerieGenres genres={show.genres} />

                            <p className={styles.summary}>{cleanSummary}</p>

                            <SerieDetails
                                network={show.network}
                                schedule={show.schedule}
                                language={show.language}
                                runtime={show.runtime}
                                productionCompanies={show.production_companies}
                                tagline={show.tagline}
                                numberOfSeasons={show.number_of_seasons}
                                numberOfEpisodes={show.number_of_episodes}
                            />

                            {show.homepage && (
                                <a
                                    href={show.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.officialLink}
                                >
                                    {t('details.visitOfficial')}
                                </a>
                            )}

                            {show.status === 'Ended' && show.ended && (
                                <p className={styles.additionalInfo}>
                                    <strong>{t('details.ended')}:</strong> {show.ended}
                                </p>
                            )}
                        </div>
                    </div>

                    <SerieCast cast={show._embedded?.cast} />

                    <Suspense fallback={null}>
                        <SerieWatchProviders watchProvidersRaw={show.watch_providers} />
                    </Suspense>
                </div>
            </div>
        </>
    );
}
