import { useMemo, useCallback } from 'react';
import { useSettings } from '../hooks/useSettings.js';
import { translations } from './translations.js';

export function useTranslation() {
    const { language } = useSettings();

    const lang = useMemo(() => {
        if (language.startsWith('pt')) return 'pt';
        if (language.startsWith('en')) return 'en';
        if (language === 'es-MX') return 'xl';
        if (language.startsWith('es')) return 'es';
        return 'es';
    }, [language]);

    const t = useCallback((key) => {
        const keys = key.split('.');
        let value = translations[lang];
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                return key;
            }
        }
        return typeof value === 'string' ? value : key;
    }, [lang]);

    return useMemo(() => ({ t, lang }), [t, lang]);
}
