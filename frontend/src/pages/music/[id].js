import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchItemById } from '../../lib/api';
import Layout from '../../components/Layout/Layout';
import ReviewModal from '../../components/ReviewModal';

export default function FoodDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      const loadFood = async () => {
        try {
          const data = await fetchItemById('food', id);
          setFood(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      loadFood();
    }
  }, [id]);

  if (loading) return <Layout>Loading...</Layout>;
  if (!food) return <Layout>Comida no encontrada</Layout>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img 
              src={food.imageUrl || '/placeholder.jpg'} 
              alt={food.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{food.name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-2">
                ★ {food.averageRating?.toFixed(1)}
              </span>
              <span>({food.totalRatings || 0} reseñas)</span>
            </div>
            <p className="text-gray-700 mb-4">{food.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">País de origen</h3>
                <p>{food.countryOfOrigin}</p>
              </div>
              <div>
                <h3 className="font-semibold">Ingredientes</h3>
                <p>{food.ingredients?.join(', ')}</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
        itemType="food"
        itemTitle={food.name}
      />
    </Layout>
  );
}