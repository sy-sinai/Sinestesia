import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserReviews } from '../../lib/api';
import Layout from '../../components/Layout/Layout';

export default function MyReviews() {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      const loadReviews = async () => {
        try {
          const data = await getUserReviews(session.accessToken);
          setReviews(data || []);
        } catch (error) {
          console.error('Error loading reviews:', error);
        } finally {
          setLoading(false);
        }
      };
      loadReviews();
    }
  }, [session]);

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
        <h1 className="text-3xl font-bold mb-8">Mis Reseñas</h1>
        
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No has creado ninguna reseña todavía.</p>
            <p className="mt-2">Visita cualquier película, música o comida para añadir tu primera reseña.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review._id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl">
                      {review.movie?.title || review.music?.name || review.food?.name}
                    </h3>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500 mr-2">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(review.createdAt).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}