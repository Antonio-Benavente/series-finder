import React from 'react';
import { useTranslation } from '../../i18n/useTranslation.js';
import styles from '../../Pages/css/Serie.module.css';
import noImage from '../../assets/not-found.webp';

export function SerieCast({ cast }) {
    const { t } = useTranslation();

    if (!cast || cast.length === 0) return null;

    return (
        <div className={styles.castSection}>
            <h2 className={styles.sectionTitle}>{t('details.castTitle')}</h2>
            <div className={styles.castGrid}>
                {cast.slice(0, 8).map(actor => (
                    <div key={actor.person?.name || Math.random()} className={styles.castCard}>
                        {actor.person?.image?.medium ? (
                            <img
                                src={actor.person.image.medium}
                                srcSet={actor.person.image?.srcset}
                                sizes={actor.person.image?.sizes}
                                alt={actor.person.name}
                                className={styles.castImage}
                                loading="lazy"
                                width="185"
                                height="278"
                            />
                        ) : (
                            <div className={styles.noCastImage}>
                                <img src={noImage} alt='noImage' width="185" height="278"/>
                            </div>
                        )}
                        <div className={styles.castInfo}>
                            <p className={styles.actorName}>{actor.person?.name}</p>
                            <p className={styles.characterName}>{actor.character?.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
