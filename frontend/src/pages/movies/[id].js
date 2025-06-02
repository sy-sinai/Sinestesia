import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchItemById } from '../../../lib/api';
import Layout from '../../../components/Layout/Layout';
import ReviewModal from '../../../components/ReviewModal';

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      const loadMovie = async () => {
        try {
          const data = await fetchItemById('movies', id);
          setMovie(data);
        } catch (error) {
          console.error('Error loading movie:', error);
        } finally {
          setLoading(false);
        }
      };
      loadMovie();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!movie) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold">Película no encontrada</h1>
          <p className="mt-4">La película que buscas no está disponible.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img 
              src={movie.imageUrl || '/placeholder.jpg'} 
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-2">
                ★ {movie.averageRating?.toFixed(1) || 'N/A'}
              </span>
              <span>({movie.totalRatings || 0} reseñas)</span>
            </div>
            <p className="text-gray-700 mb-4">{movie.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Año de lanzamiento</h3>
                <p>{movie.releaseYear}</p>
              </div>
              <div>
                <h3 className="font-semibold">Género</h3>
                <p>{movie.genre}</p>
              </div>
              <div>
                <h3 className="font-semibold">Director</h3>
                <p>{movie.director}</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Añadir Reseña
            </button>
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        itemId={id}
        itemType="movie"
        itemTitle={movie.title}
      />
    </Layout>
  );
}