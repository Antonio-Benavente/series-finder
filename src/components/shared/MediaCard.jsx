import { useTranslation } from '../../i18n/useTranslation.js';
import styles from '../css/SeriesListing.module.css';
import noSignalImg from '../../assets/not-found.webp';
import { sanitizeDescription } from '../../utils/sanitize.js';

export function MediaCard({ item, mediaTypeLabel, variant = 'catalog', showOverlay = true }) {
  const { t } = useTranslation();
  const imageSrc = item.image?.medium || noSignalImg;
  const description = sanitizeDescription(item.summary);

  return (
    <article data-id={item.id} className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={imageSrc}
          srcSet={item.image?.srcset}
          sizes={item.image?.sizes}
          alt={item.name}
          className={item.image ? styles.image : styles.noImageImg}
          loading="lazy"
          width="500"
          height="750"
        />
        {variant !== 'home' && (
          <span className={styles.mediaTypeTag}>
            {mediaTypeLabel || (item.media_type === 'movie' ? t('mediaType.movie') : t('mediaType.tv'))}
          </span>
        )}
        {showOverlay && (
          <div className={styles.overlay}>
            <h4 className={styles.overlayTitle}>
              {variant === 'general' ? 'Descripción:' : `${t('details.details.network')}:`}
            </h4>
            <p className={styles.description}>{description}</p>
          </div>
        )}
      </div>
      {variant === 'home' ? (
        <div className={styles.cardFooter}>
          <h3 className={styles.title}>{item.name}</h3>
          <div className={styles.cardTags}>
            {mediaTypeLabel && (
              <span className={styles.mediaTypeTag}>{mediaTypeLabel}</span>
            )}
          </div>
        </div>
      ) : (
        <h3 className={styles.title}>
          <span className={styles.titleInner}>{item.name}</span>
        </h3>
      )}
    </article>
  );
}
