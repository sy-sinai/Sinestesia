// Formatea fecha a DD/MM/YYYY
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

// Calcula el promedio de ratings
export const calculateAverage = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

// Filtra items por año
export const filterByYear = (items, year) => {
  if (!year) return items;
  return items.filter(item => {
    const itemYear = item.releaseYear || item.year;
    return itemYear.toString().includes(year.toString());
  });
};

// Ordena items para nominaciones (rating + cantidad de reseñas)
export const sortForNominations = (items) => {
  return items.sort((a, b) => {
    const ratingDiff = (b.averageRating || 0) - (a.averageRating || 0);
    if (ratingDiff !== 0) return ratingDiff;
    return (b.totalRatings || 0) - (a.totalRatings || 0);
  });
};