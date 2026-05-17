import { useTranslation } from '../i18n/useTranslation.js';
import styles from './css/NotFound.module.css';

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>{t('notFound.title')}</h1>
        <p className={styles.description}>
          {t('notFound.message')}
        </p>
        
        <div className={styles.tvStatic}></div>
        
        <div className={styles.buttonGroup}>
          <a href="/" className={styles.primaryButton}>
            {t('notFound.backHome')}
          </a>
        </div>
      </div>
    </div>
  );
}
