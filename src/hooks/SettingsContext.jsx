import { useState, useCallback, useMemo, useEffect } from 'react';
import { SettingsContext } from '../config/settings.js';
import { getLanguage, DEFAULT_COUNTRY, COUNTRY_OPTIONS } from '../config/api.js';

const STORAGE_KEY = 'seriesfinder_country';

function getBrowserCountry() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && COUNTRY_OPTIONS[saved]) return saved;
    } catch {}
    try {
        const region = new Intl.Locale(navigator.language).region;
        if (region && COUNTRY_OPTIONS[region]) return region;
    } catch {}
    return DEFAULT_COUNTRY;
}

export function SettingsProvider({ children }) {
    const [country, setCountry] = useState(getBrowserCountry);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, country);
        } catch {}
    }, [country]);

    const setCountryCode = useCallback((code) => {
        setCountry(code);
    }, []);

    const language = useMemo(() => getLanguage(country), [country]);

    const value = useMemo(() => ({ country, language, setCountryCode }), [country, language, setCountryCode]);

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}
