import React from 'react';
import styles from '../../Pages/css/Serie.module.css';

export function SerieBanner({ imageUrl }) {
    return (
        <div 
            className={styles.banner}
            style={{ 
                backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' 
            }}
        >
            <div className={styles.bannerOverlay}></div>
        </div>
    );
}