import React from 'react';
import styles from '../../Pages/css/Serie.module.css';
import noSignalImg from '../../assets/not-found.webp';

export function SeriePoster({ image, name }) {
    const imageUrl = image?.medium || null;
    return (
        <div className={styles.posterWrapper}>
            {imageUrl ? (
                <img 
                    src={imageUrl} 
                    srcSet={image?.srcset}
                    sizes={image?.sizes}
                    alt={name}
                    className={styles.poster}
                    fetchPriority="high"
                    width="300"
                    height="450"
                />
            ) : (
                <div className={styles.noPoster}>
                    <img 
                        src={noSignalImg} 
                        alt="No signal available"
                        className={styles.noPoster}
                        width="300"
                        height="450"
                    />
                </div>
            )}
        </div>
    );
}
