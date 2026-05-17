import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { useSettings } from '../hooks/useSettings.js';
import { useTranslation } from '../i18n/useTranslation.js';
import { useClickOutside } from '../hooks/useClickOutside.js';
import styles from './css/Header.module.css';
import { DeviceTvIcon } from '../assets/icons/DeviceTvIcon.jsx';
import { MenuIcon } from '../assets/icons/MenuIcon.jsx';
import { XIcon } from '../assets/icons/XIcon.jsx';
import { Flag } from '../assets/icons/banderas/index.js';

const LANGUAGE_OPTIONS = [
  { lang: 'es', label: 'Español (ES)', flag: 'ES', country: 'ES' },
  { lang: 'xl', label: 'Español LATAM', flag: 'MX', country: 'MX' },
  { lang: 'en', label: 'English', flag: 'US', country: 'US' },
  { lang: 'pt', label: 'Português', flag: 'BR', country: 'BR' },
];

function getLanguageFromCountry(country) {
  if (['US', 'GB'].includes(country)) return 'en';
  if (country === 'BR') return 'pt';
  if (country === 'ES') return 'es';
  return 'xl';
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const countryRef = useRef(null);
  const location = useLocation();
  const { country, setCountryCode } = useSettings();
  const { t } = useTranslation();
  const currentLang = getLanguageFromCountry(country);
  const currentOption = LANGUAGE_OPTIONS.find(o => o.lang === currentLang);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  useClickOutside(countryRef, () => setOpen(false));

  useEffect(() => {
    if (!menuOpen) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={styles.headerShow}>
      <div className={styles.navShow}>
        <div className={styles.navContainer}>
          <Link to="/" className={styles.titleHeader}>
            <DeviceTvIcon size={32} />
            <h2>Series Finder</h2>
          </Link>

          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
          </button>

          {menuOpen && <div className={styles.backdrop} onClick={closeMenu} />}

          <nav className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
            <Link
              to="/"
              className={`${styles.navLink} ${isActive('/') ? styles.navLinkActive : ''}`}
              onClick={closeMenu}
            >
              {t('header.nav.home')}
            </Link>
            <Link
              to="/general"
              className={`${styles.navLink} ${isActive('/general') ? styles.navLinkActive : ''}`}
              onClick={closeMenu}
            >
              {t('header.nav.general')}
            </Link>
            <Link
              to="/movies"
              className={`${styles.navLink} ${isActive('/movies') ? styles.navLinkActive : ''}`}
              onClick={closeMenu}
            >
              {t('header.nav.movies')}
            </Link>
            <Link
              to="/series"
              className={`${styles.navLink} ${isActive('/series') ? styles.navLinkActive : ''}`}
              onClick={closeMenu}
            >
              {t('header.nav.series')}
            </Link>

            <div className={styles.countrySelectorWrapper} ref={countryRef}>
              <button
                className={styles.countrySelect}
                onClick={() => setOpen((prev) => !prev)}
                type="button"
              >
                <Flag country={currentOption.flag} size={20} className={styles.flagIcon} />
                {currentOption.label}
              </button>
              {open && (
                <div className={styles.dropdown}>
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.lang}
                      className={`${styles.dropdownItem} ${opt.lang === currentLang ? styles.dropdownItemActive : ''}`}
                      onClick={() => { setCountryCode(opt.country); setOpen(false); }}
                      type="button"
                    >
                      <Flag country={opt.flag} size={20} className={styles.flagIcon} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
