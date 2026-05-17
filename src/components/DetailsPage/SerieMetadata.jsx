import React from 'react';
import styles from '../../Pages/css/Serie.module.css';

export function SerieMetadata({ rating, premiered, status }) {
    return (
        <div className={styles.metadata}>
            {rating && (
                <span className={styles.rating}>
                    ⭐ {rating}
                </span>
            )}
            {premiered && (
                <span className={styles.year}>
                    {new Date(premiered).getFullYear()}
                </span>
            )}
            {status && (
                <span className={styles.status}>
                    {status}
                </span>
            )}
        </div>
    );
}