import React, { useState, useRef } from 'react';
import { useTranslation } from '../../i18n/useTranslation.js';
import { useClickOutside } from '../../hooks/useClickOutside.js';
import { COUNTRY_OPTIONS } from '../../config/api.js';
import { Flag } from '../../assets/icons/banderas/index.js';
import styles from '../../Pages/css/Serie.module.css';

const categoryOrder = ['flatrate', 'free', 'ads', 'rent', 'buy'];

const categoryTranslationMap = {
    flatrate: 'watchProviders.streaming',
    free: 'watchProviders.free',
    ads: 'watchProviders.ads',
    rent: 'watchProviders.rent',
    buy: 'watchProviders.buy'
};

const categoryBadgeMap = {
    flatrate: 'badgeStreaming',
    free: 'badgeFree',
    ads: 'badgeAds',
    rent: 'badgeRent',
    buy: 'badgeBuy'
};

export function SerieWatchProviders({ watchProvidersRaw }) {
    const { t } = useTranslation();
    const [selectedRegion, setSelectedRegion] = useState('');
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useClickOutside(ref, () => setOpen(false));

    if (!watchProvidersRaw) return null;

    const availableRegions = Object.entries(watchProvidersRaw)
        .filter(([, data]) => categoryOrder.some(cat => data[cat]?.length > 0))
        .map(([code]) => code)
        .filter(code => COUNTRY_OPTIONS[code]);

    if (availableRegions.length === 0) return null;

    const region = availableRegions.includes(selectedRegion) ? selectedRegion : availableRegions[0];

    const countryData = watchProvidersRaw[region];
    const hasProviders = categoryOrder.some(cat => countryData[cat]?.length > 0);
    if (!hasProviders) return null;

    const sortedCategories = categoryOrder
        .filter(cat => countryData[cat]?.length > 0)
        .map(cat => ({ key: cat, providers: countryData[cat] }));

    const getRegionName = (code) => COUNTRY_OPTIONS[code] || code;

    return (
        <div className={styles.watchProvidersSection}>
            <div className={styles.watchProvidersHeader}>
                <h2 className={styles.watchProvidersTitle}>
                    {t('details.watchProviders.title')}
                </h2>
                <div className={styles.regionDropdownWrapper} ref={ref}>
                    <button
                        className={styles.regionDropdownTrigger}
                        onClick={() => setOpen((prev) => !prev)}
                        type="button"
                    >
                        <Flag country={region} size={20} className={styles.flagIcon} />
                        {getRegionName(region)}
                    </button>
                    {open && (
                        <div className={styles.regionDropdown}>
                            {availableRegions.map(code => (
                                <button
                                    key={code}
                                    className={`${styles.regionDropdownItem} ${code === region ? styles.regionDropdownItemActive : ''}`}
                                    onClick={() => { setSelectedRegion(code); setOpen(false); }}
                                    type="button"
                                >
                                    <Flag country={code} size={20} className={styles.flagIcon} />
                                    {getRegionName(code)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.providersLayout}>
                {sortedCategories.map(({ key, providers }) => (
                    <div key={key} className={styles.providerRow}>
                        <div className={styles.providerRowHeader}>
                            <span className={`${styles.providerBadge} ${styles[categoryBadgeMap[key]]}`}>
                                {t(`details.${categoryTranslationMap[key]}`)}
                            </span>
                            <div className={styles.badgeDivider}></div>
                        </div>
                        <div className={styles.providerRowCards}>
                            {providers.map(provider => (
                                <div key={provider.provider_id} className={styles.providerTile} title={provider.provider_name}>
                                    <div className={styles.providerLogoWrapper}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                                            alt={provider.provider_name}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextElementSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div className={styles.providerFallback}>
                                            {provider.provider_name.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    <span className={styles.providerLabel}>{provider.provider_name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
