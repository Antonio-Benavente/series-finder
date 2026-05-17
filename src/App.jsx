import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { SeriesDataProvider } from './hooks/useSeriesData.js'
import { SettingsProvider } from './hooks/SettingsContext.jsx'
import { useSeriesData } from './hooks/useSeriesData.js'

const HomePage = lazy(() => import('./Pages/HomePage.jsx').then(module => ({ default: module.HomePage })))
const SeriesPage = lazy(() => import('./Pages/SeriesPage.jsx').then(module => ({ default: module.SeriesPage })))
const MoviesPage = lazy(() => import('./Pages/MoviesPage.jsx').then(module => ({ default: module.MoviesPage })))
const GeneralPage = lazy(() => import('./Pages/GeneralPage.jsx').then(module => ({ default: module.GeneralPage })))
const NotFoundPage = lazy(() => import('./Pages/NotFoundPage.jsx').then(module => ({ default: module.NotFoundPage })))
const LoadingPage = lazy(() => import('./Pages/LoadingPage.jsx').then(module => ({ default: module.LoadingPage })))
const DetailsPage = lazy(() => import('./Pages/DetailsPage.jsx').then(module => ({ default: module.DetailsPage })))
const ApiErrorPage = lazy(() => import('./Pages/ApiErrorPage.jsx').then(module => ({ default: module.ApiErrorPage })))

function AppContent() {
  const { error, loading } = useSeriesData();

  if (error) {
    return (
      <>
        <Header />
        <ApiErrorPage />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {loading && <LoadingPage />}
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/series' element={<SeriesPage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/general' element={<GeneralPage />} />
          <Route path='/series/:id' element={<DetailsPage />} />
          <Route path='/media/:mediaType/:id' element={<DetailsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <SeriesDataProvider>
          <AppContent />
        </SeriesDataProvider>
      </SettingsProvider>
    </BrowserRouter>
  )
}

export default App