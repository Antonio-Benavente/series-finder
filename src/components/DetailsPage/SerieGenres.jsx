import React from 'react';
import styles from '../../Pages/css/Serie.module.css';

export function SerieGenres({ genres }) {
    if (!genres || genres.length === 0) return null;

    return (
        <div className={styles.genres}>
            {genres.map((genre, index) => (
                <span key={index} className={styles.genre}>
                    {genre}
                </span>
            ))}
        </div>
    );
}