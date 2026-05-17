import { useTranslation } from '../i18n/useTranslation.js';
import styles from './css/NotFound.module.css';

export function ApiErrorPage() {
  const { t } = useTranslation();
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <div className={styles.errorCode}>{t('error.code')}</div>
        <h1 className={styles.title}>{t('error.title')}</h1>
        <p className={styles.description}>
          {t('error.message')}
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
