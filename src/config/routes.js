export const ROUTE_PATHS = ['/series', '/movies', '/general'];

export const getBasePath = (pathname) =>
  ROUTE_PATHS.find(p => pathname.startsWith(p)) || '/series';
