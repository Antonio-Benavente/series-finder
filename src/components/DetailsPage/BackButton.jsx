import React from 'react';
import { useTranslation } from '../../i18n/useTranslation.js';
import styles from '../../Pages/css/Serie.module.css';
import { ArrowLeftIcon } from '../../assets/icons/ArrowLeftIcon.jsx';

export function BackButton({ onClick }) {
    const { t } = useTranslation();

    return (
        <button onClick={onClick} className={styles.backButton}>
            <ArrowLeftIcon />
            {t('details.backButton')}
        </button>
    );
}
