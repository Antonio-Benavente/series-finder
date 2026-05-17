import React from 'react';
import { useTranslation } from '../../i18n/useTranslation.js';
import styles from '../../Pages/css/Serie.module.css';

export function SerieDetails({ network, schedule, language, runtime, productionCompanies, tagline, numberOfSeasons, numberOfEpisodes }) {
    const { t } = useTranslation();

    return (
        <div className={styles.details}>
            {tagline && (
                <p className={styles.tagline}>"{tagline}"</p>
            )}
            {network && (
                <div className={styles.detailItem}>
                    <strong>{t('details.details.network')}:</strong> {typeof network === 'string' ? network : network.name}
                </div>
            )}
            {numberOfSeasons && (
                <div className={styles.detailItem}>
                    <strong>{t('details.details.seasons')}:</strong> {numberOfSeasons}
                </div>
            )}
            {numberOfEpisodes && (
                <div className={styles.detailItem}>
                    <strong>{t('details.details.episodes')}:</strong> {numberOfEpisodes}
                </div>
            )}
            {runtime && (
                <div className={styles.detailItem}>
                    <strong>{t('details.details.runtime')}:</strong> {runtime} min
                </div>
            )}
            {schedule?.days?.length > 0 && (
                <div className={styles.detailItem}>
                    <strong>{t('details.details.days')}:</strong> {schedule.days.join(', ')}
                </div>
            )}
            {schedule?.time && (
                <div className={styles.detailItem}>
                    <strong>{t('details.details.schedule')}:</strong> {schedule.time}
                </div>
            )}
            {language && (
                <div className={styles.detailItem}>
                    <strong>{t('details.details.language')}:</strong> {language}
                </div>
            )}
            {productionCompanies && (
                <div className={styles.detailItem}>
                    <strong>{t('details.details.production')}:</strong> {productionCompanies}
                </div>
            )}
        </div>
    );
}
