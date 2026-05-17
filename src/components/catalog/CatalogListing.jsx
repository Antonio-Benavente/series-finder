import { MediaCard } from '../shared/MediaCard.jsx';
import styles from '../css/SeriesListing.module.css';
import { Link } from 'react-router';

const PATH_MAP = {
  tv: '/series',
  movie: '/media/movie'
};

export function CatalogListing({ items, type = 'tv', variant = 'catalog' }) {
  const buildPath = (item) => {
    if (type === 'general') {
      const itemType = item.media_type === 'movie' ? 'movie' : 'tv';
      return `/media/${itemType}/${item.id}`;
    }
    return `${PATH_MAP[type] || PATH_MAP.tv}/${item.id}`;
  };

  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <Link
          key={type === 'general' ? `general-${item.media_type}-${item.id}-${index}` : item.id}
          to={buildPath(item)}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MediaCard item={item} variant={variant} />
        </Link>
      ))}
    </div>
  );
}
