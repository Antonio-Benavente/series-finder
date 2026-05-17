import React from 'react';
import styles from './css/Loading.module.css';

export function LoadingPage({ message = "Cargando..." }) {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loaderWave}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
