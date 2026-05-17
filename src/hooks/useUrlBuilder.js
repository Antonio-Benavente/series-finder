import { useMemo, useCallback } from 'react';
import { useLocation } from 'react-router';
import { getBasePath } from '../config/routes.js';

export function useUrlBuilder() {
    const location = useLocation();

    const basePath = useMemo(() => getBasePath(location.pathname), [location.pathname]);

    const buildUrl = useCallback((search, genres) => {
        const params = new URLSearchParams();
        if (search?.trim()) params.set('search', search.trim());
        if (genres?.length > 0) params.set('genre', genres.join(','));

        const url = params.toString() ? `${basePath}?${params.toString()}` : basePath;
        return url;
    }, [basePath]);

    return { basePath, buildUrl };
}
