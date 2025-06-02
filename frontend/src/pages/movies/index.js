import { useState, useEffect } from 'react';
import { getAllItems } from '../../lib/api';
import Card from '../../components/Card';
import Layout from '../../components/Layout/Layout';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterYear, setFilterYear] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getAllItems('movies');
        setMovies(data || []);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  const filteredMovies = filterYear 
    ? movies.filter(movie => movie.releaseYear.toString().includes(filterYear))
    : movies;

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Todas las Películas</h1>
          
          <div className="flex items-center">
            <label htmlFor="year-filter" className="mr-2">Filtrar por año:</label>
            <input
              id="year-filter"
              type="number"
              className="border p-2 rounded w-24"
              placeholder="Ej: 2020"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <Card key={movie._id} item={movie} type="movie" />
          ))}
        </div>
      </div>
    </Layout>
  );
}