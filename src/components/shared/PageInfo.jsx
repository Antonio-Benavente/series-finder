import { useTranslation } from '../../i18n/useTranslation.js';
import styles from "../css/SeriesSection.module.css";

export function PageInfo({ 
    currentPage, 
    totalPages, 
    totalItems,
    itemType = 'series' 
}) {
    const { t } = useTranslation();
    const labelMap = {
        'peliculas': t('catalog.movies'),
        'elementos': t('catalog.elements'),
        'películas': t('catalog.movies'),
        'series': t('catalog.series')
    };
    const itemLabel = labelMap[itemType] || t('catalog.series');
    
    return (
        <div className={styles.pageInfo}>
            {`${t('catalog.resultsFor')} ${itemType}: Pagina ${currentPage} de ${totalPages} (${totalItems} ${itemLabel})`}
        </div>
    );
}
