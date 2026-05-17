export const sortByRating = (a, b) =>
  (b.rating?.average || 0) - (a.rating?.average || 0) || a.id - b.id;
