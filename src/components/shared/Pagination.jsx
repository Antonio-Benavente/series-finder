import React from "react";
import styles from "../css/SeriesSection.module.css";

export function Pagination({ 
    currentPage, 
    totalPages, 
    onNextPage, 
    onPreviousPage, 
    onGoToPage
}) {
    const getPageNumbers = () => {
        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    const pageNumbers = getPageNumbers();

    return (
        <div className={styles.pagination}>
            <button
                onClick={onPreviousPage}
                disabled={currentPage === 1}
                className={styles.paginationButton}
            >
                Anterior
            </button>

            <div className={styles.pageNumbers}>
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => onGoToPage(pageNumber)}
                        className={`${styles.pageNumber} ${currentPage === pageNumber ? styles.active : ''}`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>

            <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
            >
                Siguiente
            </button>
        </div>
    );
}
