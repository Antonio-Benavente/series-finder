import { useContext } from 'react';
import { SeriesDataContext, SeriesDataProvider } from '../context/SeriesDataContext.jsx';

export { SeriesDataProvider };

export const useSeriesData = () => {
  const context = useContext(SeriesDataContext);
  if (!context) {
    throw new Error('useSeriesData must be used within a SeriesDataProvider');
  }
  return context;
};