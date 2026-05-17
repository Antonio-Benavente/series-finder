# Series Finder

Una aplicación web moderna para descubrir y explorar series de TV y películas, construida con **React 19** y potenciada por la API de **TMDB**.

![React](https://img.shields.io/badge/React-19.x-blue)
![React Router](https://img.shields.io/badge/React_Router-7.x-red)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF)
![Status](https://img.shields.io/badge/Status-Active-success)

## Características

- **Búsqueda Global** – Busca series y películas desde la barra de búsqueda en el header con redirección inteligente.
- **Filtros por Género** – Filtra contenido por género mediante un panel intuitivo con selección múltiple.
- **Series y Películas** – Catálogos separados para TV y cine, más una vista general combinada.
- **Top de Tendencia** – Carrusel interactivo en la página principal con las series/películas más populares del día.
- **Detalles Completos** – Información detallada: sinopsis, reparto, puntuación, géneros, temporadas, episodios, estado, etc.
- **Reparto** – Perfiles del elenco principal con foto, nombre y personaje.
- **Dónde Ver** – Sección de plataformas de streaming disponibles por país (suscripción, gratis, alquiler, compra).
- **Multilenguaje** – Soporte para español, inglés y portugués con cambio dinámico según el país seleccionado.
- **Paginación Inteligente** – Navegación suave a través del catálogo con scroll automático al inicio.
- **Parámetros en URL** – Búsquedas y filtros reflejados en la URL, haciéndolos compartibles.
- **Totalmente Responsive** – Diseño adaptativo optimizado para todos los tamaños de pantalla.
- **UI Moderna** – Interfaz limpia y minimalista con iconos SVG, tema oscuro y transiciones suaves.
- **Alto Rendimiento** – Lazy loading de páginas con `React.lazy()` y `Suspense`.

## Tecnologías

### Frontend
- **React 19** – UI basada en componentes con las últimas características.
- **React Router 7** – Enrutamiento dinámico con layout anidado y lazy loading.
- **JavaScript (ES6+)** – Sintaxis moderna y patrones actuales.
- **CSS Modules** – Estilos modulares con alcance por componente.
- **Custom Hooks** – Lógica reutilizable: `useCatalogSearch`, `usePagination`, `useUrlBuilder`, `useTranslation`.

### API
- **TMDB API v3** – Fuente de datos para series, películas, reparto, proveedores de streaming y más.
  - Endpoints: configuración, géneros, trending, search, discover, detalles con `append_to_response`.

### Herramientas
- **Vite 7** – Build tool y dev server ultrarrápido con HMR.
- **SWC** – Compilador Rust-based para transformaciones JSX/React Refresh.
- **ESLint** – Linting con configuración plana, plugins react-hooks y react-refresh.

### Internacionalización
- **i18n propio** – Sistema de traducciones casero con `useTranslation` hook y archivo central de traducciones (es, pt, en).
- **Países** – 18 países soportados con detección de idioma y formato regional (`es-ES`, `en-US`, `pt-BR`, etc.).

## Páginas / Rutas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | HomePage | Landing con hero search y carrusel de tendencias |
| `/series` | SeriesPage | Catálogo de series con búsqueda y filtros |
| `/movies` | MoviesPage | Catálogo de películas con búsqueda y filtros |
| `/general` | GeneralPage | Catálogo combinado de series + películas |
| `/series/:id` | DetailsPage | Detalles de una serie (temporadas, reparto, etc.) |
| `/media/:mediaType/:id` | DetailsPage | Detalles de cualquier contenido (tv o movie) |
| `*` | NotFoundPage | Página 404 |

## Estructura del Proyecto

```
src/
├── assets/icons/        # Iconos SVG como componentes React + banderas
├── components/
│   ├── catalog/         # CatalogSection, CatalogListing (compartido)
│   ├── DetailsPage/     # 8 subcomponentes (banner, poster, cast, etc.)
│   ├── filters/         # FilterBar, GenreSelector, SearchField
│   ├── GeneralPage/     # GeneralSection, GeneralListing, GeneralCard
│   ├── MoviesPage/      # MoviesSection, MoviesListing, MoviesCard
│   ├── SeriesPage/      # SeriesSection, SeriesListing, SeriesCard, Filters, Pagination, PageInfo
│   ├── css/             # CSS Modules de componentes
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── HeroSection.jsx
├── config/
│   ├── api.js           # Config TMDB, mapas de géneros, países, idiomas
│   └── settings.js      # SettingsContext
├── hooks/               # Custom hooks y context providers
├── i18n/                # Traducciones (es, pt, en) + useTranslation
├── Pages/
│   ├── css/             # CSS Modules de páginas
│   └── *.jsx            # 8 páginas (lazy-loaded)
└── utils/               # sanitize.js, transformers.js
```

## Instalación y Uso

```bash
# Clonar repositorio
git clone https://github.com/Antonio-Benavente/series-finder.git
cd series-finder

# Instalar dependencias
npm install

# Crear archivo .env con tu API Key de TMDB
# VITE_TMDB_API_KEY=tu_api_key_aqui

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Configuración

- **API Key:** Obtén una clave en https://www.themoviedb.org/settings/api y colócala en `.env` como `VITE_TMDB_API_KEY`.
- **Idioma/País:** Por defecto Perú (`PE`) con español. Cambiable desde el header.
- **Deploy:** `npm run build` genera la carpeta `dist/`. Auto-deploy a Netlify desde `main`.
- **SPA Redirect:** Configurado en `netlify.toml` (`/*` → `/index.html`, status 200).
