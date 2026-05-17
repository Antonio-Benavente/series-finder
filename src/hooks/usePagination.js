import { useState, useMemo, useEffect } from "react";

export function usePagination(items = [], itemsPerPage = 20, resetKey = 0) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [resetKey, items]);

    const { currentItems, totalPages, totalItems } = useMemo(() => {
        if (!items || !Array.isArray(items) || items.length === 0) {
            return {
                currentItems: [],
                totalPages: 0,
                totalItems: 0
            };
        }

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const current = items.slice(indexOfFirstItem, indexOfLastItem);
        const total = Math.ceil(items.length / itemsPerPage);

        return {
            currentItems: current,
            totalPages: total,
            totalItems: items.length
        };
    }, [items, currentPage, itemsPerPage]);

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetPage = () => {
        setCurrentPage(1);
    };

    return {
        currentPage,
        currentItems,
        totalPages,
        totalItems,
        goToNextPage,
        goToPreviousPage,
        goToPage,
        resetPage
    };
}